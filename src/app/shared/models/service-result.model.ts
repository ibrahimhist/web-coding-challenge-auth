export interface ServiceResult<T> {
  StatusCode: number;
  IsSuccess: boolean;
  ErrorMessage?: string | string[];
  Result: T;
  FileName?: string;
}
