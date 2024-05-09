import axios, { InternalAxiosRequestConfig } from "axios";
import { JwtPayload, jwtDecode } from "./jwt.decode";
import ms from "ms";

export const STORAGE_KEY = "auth_tokens";

let expireFudge = 10;
let currentlyRequestingPromise: Promise<Token | undefined> | undefined =
  undefined;

export type Token = string;

export interface IAuthTokens {
  accessToken: Token;
  refreshToken: Token;
}

export type TokenRefreshRequest = (
  refreshToken: Token
) => Promise<Token | IAuthTokens>;

export interface IAuthTokenInterceptorConfig {
  header?: string;
  headerPrefix?: string;
  requestRefresh: TokenRefreshRequest;
  /**
   *
   *  Token leeway in seconds (or via [`ms`](https://github.com/vercel/ms))
   */
  tokenExpireFudge?: number | string;
}

/**
 * Sets the access and refresh tokens
 * @param {IAuthTokens} tokens - Access and Refresh tokens
 */
export const setAuthTokens = async (tokens: IAuthTokens): Promise<void> =>
  await localStorage?.set(STORAGE_KEY, JSON.stringify(tokens));

const getAuthTokens = async (): Promise<IAuthTokens | undefined> => {
  const rawTokens = localStorage.get(STORAGE_KEY);
  if (!rawTokens) return;

  try {
    // parse stored tokens JSON
    return JSON.parse(rawTokens);
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      error.message = `Failed to parse auth tokens: ${rawTokens}`;
      throw error;
    }
  }
};

export const getAccessToken = async (): Promise<Token | undefined> => {
  const tokens = await getAuthTokens();
  return tokens ? tokens.accessToken : undefined;
};

/**
 * Returns the stored refresh token
 * @returns Refresh token
 */
export const getRefreshToken = async (): Promise<Token | undefined> => {
  const tokens = await getAuthTokens();
  return tokens ? tokens.refreshToken : undefined;
};

/**
 * Gets the unix timestamp from an access token
 *
 * @param {Token} token - Access token
 * @returns Unix timestamp
 */
const getTimestampFromToken = (token: Token): number | undefined => {
  const decoded = jwtDecode<JwtPayload>(token);

  return decoded.exp;
};

/**
 * Returns the number of seconds before the access token expires or -1 if it already has
 *
 * @param {string} token - Access token
 * @returns {number} Number of seconds before the access token expires
 */
const getExpiresIn = (token: Token): number => {
  const expiration = getTimestampFromToken(token);

  if (!expiration) return -1;

  return expiration - Date.now() / 1000;
};

/**
 * Checks if the token is undefined, has expired or is about the expire
 *
 * @param {string} token - Access token
 * @returns Whether or not the token is undefined, has expired or is about the expire
 */
const isTokenExpired = (token: Token): boolean => {
  if (!token) return true;
  const expiresIn = getExpiresIn(token);
  return !expiresIn || expiresIn <= expireFudge;
};

/**
 * Sets the access token
 * @param {Token} token - Access token
 */
export const setAccessToken = async (token: Token): Promise<void> => {
  const tokens = await getAuthTokens();
  if (!tokens) {
    throw new Error(
      "Unable to update access token since there are no tokens currently stored"
    );
  }

  tokens.accessToken = token;
  await setAuthTokens(tokens);
};

/**
 * Refreshes the access token using the provided function
 * Note: NOT to be called externally.  Only accessible through an interceptor
 *
 * @param {requestRefresh} requestRefresh - Function that is used to get a new access token
 * @returns {string} - Fresh access token
 */
const refreshToken = async (
  requestRefresh: TokenRefreshRequest
): Promise<Token> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  try {
    // Refresh and store access token using the supplied refresh function
    const newTokens = await requestRefresh(refreshToken);
    if (typeof newTokens === "object" && newTokens?.accessToken) {
      await setAuthTokens(newTokens);
      return newTokens.accessToken;
    } else if (typeof newTokens === "string") {
      await setAccessToken(newTokens);
      return newTokens;
    }

    throw new Error(
      "requestRefresh must either return a string or an object with an accessToken"
    );
  } catch (error) {
    // Failed to refresh token
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 422) {
        // The refresh token is invalid so remove the stored tokens
        await localStorage.remove(STORAGE_KEY);
        throw new Error(
          `Got ${status} on token refresh; clearing both auth tokens`
        );
      }
    }

    // A different error, probably network error
    if (error instanceof Error) {
      throw new Error(`Failed to refresh auth token: ${error.message}`);
    } else {
      throw new Error("Failed to refresh auth token and failed to parse error");
    }
  }
};

export const refreshTokenIfNeeded = async (
  requestRefresh: TokenRefreshRequest
): Promise<Token | undefined> => {
  // use access token (if we have it)
  let accessToken = await getAccessToken();

  // check if access token is expired
  if (!accessToken || isTokenExpired(accessToken)) {
    // do refresh
    accessToken = await refreshToken(requestRefresh);
  }

  return accessToken;
};

/**
 * Function that returns an Axios Interceptor that:
 * - Applies that right auth header to requests
 * - Refreshes the access token when needed
 * - Puts subsequent requests in a queue and executes them in order after the access token has been refreshed.
 *
 * @param {IAuthTokenInterceptorConfig} config - Configuration for the interceptor
 * @returns {Promise} Promise that resolves in the supplied requestConfig
 */
export const authTokenInterceptor = ({
  header = "Authorization",
  headerPrefix = "Bearer ",
  requestRefresh,
  tokenExpireFudge = "10s",
}: IAuthTokenInterceptorConfig) => {
  expireFudge =
    ms(
      typeof tokenExpireFudge === "string"
        ? tokenExpireFudge
        : `${tokenExpireFudge}s`
    ) / 1000;

  return async (requestConfig: InternalAxiosRequestConfig<any>) => {
    if (!(await getRefreshToken())) return requestConfig;

    let accessToken = undefined;

    // Try to await a current request
    if (currentlyRequestingPromise)
      accessToken = await currentlyRequestingPromise;

    if (!accessToken) {
      try {
        // Sets the promise so everyone else will wait - then get the value
        currentlyRequestingPromise = refreshTokenIfNeeded(requestRefresh);
        accessToken = await currentlyRequestingPromise;

        // Reset the promise
        currentlyRequestingPromise = undefined;
      } catch (error: unknown) {
        // Reset the promise
        currentlyRequestingPromise = undefined;

        if (error instanceof Error) {
          throw new Error(
            `Unable to refresh access token for request due to token refresh error: ${error.message}`
          );
        }
      }
    }

    // add token to headers
    if (accessToken && requestConfig.headers) {
      requestConfig.headers[header] = `${headerPrefix}${accessToken}`;
    }

    return requestConfig;
  };
};
