import { ServiceResult } from './service-result.model';

export interface BaseHttpResponse<T> {
  ServiceResult: ServiceResult<T>;
  // can be added more things
}
