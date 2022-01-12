import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HeaderParameter } from '../models/header-parameter.model';
import { HeaderName } from '../enums/header-name.enum';
import { BaseHttpResponse } from '../models/base-http-response.model';

@Injectable()
export class BaseHttpService {
  constructor(protected httpClient: HttpClient) {}

  protected httpGet<T>(
    requestUrl: string,
    headerParameters?: HeaderParameter[]
  ) {
    return this.httpClient
      .get(requestUrl, {
        headers: this.getHttpHeader(headerParameters),
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return this.wrapHttpResponse<T>(response);
        })
      );
  }

  protected httpGetFile<T>(
    requestUrl: string,
    headerParameters?: HeaderParameter[]
  ) {
    return this.httpClient
      .get(requestUrl, {
        headers: this.getHttpHeader(headerParameters, true),
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          return this.wrapHttpResponse<T>(response);
        })
      );
  }

  protected httpGetFileByPost<T>(
    requestUrl: string,
    data: any,
    headerParameters?: HeaderParameter[]
  ) {
    return this.httpClient
      .post(requestUrl, data, {
        headers: this.getHttpHeader(headerParameters, true),
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          return this.wrapHttpResponse<T>(response, true);
        })
      );
  }

  protected httpPostFile<T>(
    requestUrl: string,
    data: any,
    headerParameters?: HeaderParameter[]
  ) {
    return this.httpClient
      .post(requestUrl, data, {
        headers: this.getHttpHeader(headerParameters, true),
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          return this.wrapHttpResponse<T>(response);
        })
      );
  }

  protected httpPost<T>(
    requestUrl: string,
    data: any,
    headerParameters?: HeaderParameter[],
    isFileRelatedRequest?: boolean
  ) {
    return this.httpClient
      .post<T>(
        requestUrl,
        data ? (isFileRelatedRequest ? data : JSON.stringify(data)) : null,
        {
          headers: this.getHttpHeader(headerParameters, isFileRelatedRequest),
        }
      )
      .pipe(
        map((response) => {
          return this.wrapHttpResponse<T>(response);
        })
      );
  }

  protected getHttpHeader(
    headerParameters?: HeaderParameter[],
    isFileRelatedRequest?: boolean
  ): HttpHeaders {
    let newHeaders = new HttpHeaders();

    if (!isFileRelatedRequest) {
      newHeaders = newHeaders.append(
        HeaderName.ContentType,
        'application/json; charset=UTF-8'
      );
    }

    if (headerParameters) {
      headerParameters.forEach((headerParameter: HeaderParameter) => {
        newHeaders = newHeaders.append(
          headerParameter.Name,
          headerParameter.Value
        );
      });
    }

    return newHeaders;
  }

  private wrapHttpResponse<T>(
    response: any,
    isFileRelatedResponse?: boolean
  ): BaseHttpResponse<T> {
    // response
    // const responseBody = (response.body || response) as ServiceResult<T>;

    let filename;
    if (isFileRelatedResponse) {
      const disposition = response.headers.get('Content-Disposition');
      if (disposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
    }

    let result: T = response.body || (response as any);

    const baseHttpResponse: BaseHttpResponse<T> = {
      ServiceResult: {
        IsSuccess: true,
        Result: result,
        StatusCode: 200,
        FileName: filename,
      },
    };

    return baseHttpResponse;
  }
}
