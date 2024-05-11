import { config } from "@/utils/config";
import axios, {
  Axios,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { TResponse } from "./api.type";

export const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export class APIService extends Axios {
  public static axios: AxiosInstance = api;

  public static getUri(config?: AxiosRequestConfig<any> | undefined): string {
    return this.axios.getUri(config);
  }

  public static request<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.request(config);
  }

  public static get<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.get(url, config);
  }

  public static delete<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.delete(url, config);
  }

  public static head<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.head(url, config);
  }

  public static options<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.options(url, config);
  }

  public static post<T = any, R = AxiosResponse<TResponse<T>, string>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.post(url, data, config);
  }

  public static put<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.put(url, data, config);
  }

  public static patch<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.patch(url, data, config);
  }
}

export default api;
