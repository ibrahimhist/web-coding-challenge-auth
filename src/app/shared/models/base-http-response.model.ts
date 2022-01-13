import { ServiceResult } from './service-result.model';

export interface BaseHttpResponse<T> {
  serviceResult: ServiceResult<T>;
  // can be added more things
}
