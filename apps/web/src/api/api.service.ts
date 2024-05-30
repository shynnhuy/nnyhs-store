import { config } from "@/utils/config";
import axios, {
  Axios,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { TResponse } from "./api.type";

export const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const nextApi = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class BaseService extends Axios {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    super();
    this.axios = axios;
  }

  getUri(config?: AxiosRequestConfig<any> | undefined): string {
    return this.axios.getUri(config);
  }

  request<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.request(config);
  }

  get<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.get(url, config);
  }

  delete<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.delete(url, config);
  }

  head<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.head(url, config);
  }

  options<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.options(url, config);
  }

  post<T = any, R = AxiosResponse<TResponse<T>, string>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.post(url, data, config);
  }

  put<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.put(url, data, config);
  }

  patch<T = any, R = AxiosResponse<TResponse<T>, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.axios.patch(url, data, config);
  }
}

export const APIService = new BaseService(api);
export const NextService = nextApi;

export default api;
