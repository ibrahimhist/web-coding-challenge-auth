export interface ServiceResult<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessage?: string | string[];
  result: T;
  fileName?: string;
}
