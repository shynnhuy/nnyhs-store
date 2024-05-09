export type TResponse<T> = {
  message: string;
  success: boolean;
  result: T;
  error: null;
  timestamps: Date;
  statusCode: number;
};

export type TError = {
  success: boolean;
  statusCode: number;
  timestamp: Date;
  path: string;
  message: string;
  errorResponse: {
    message: string;
    error: string;
    statusCode: number;
  };
};
