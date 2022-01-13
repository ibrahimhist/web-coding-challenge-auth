import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { HeaderParameter } from '../models/header-parameter.model';
import { HeaderName } from '../enums/header-name.enum';

@Injectable({
  providedIn: 'root',
})
export class OpenApiService extends BaseHttpService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getRandomCat<T>() {
    return this.httpGet<T>('https://api.thecatapi.com/v1/images/search');
  }

  likeCat<T>(imageId: string) {
    const header: HeaderParameter = {
      name: HeaderName.XApiKey,
      value: ' 6ee743d1-d3d9-4b7a-ae8d-3277890a690d',
    };

    const data = {
      image_id: imageId,
      value: 1,
      sub_id: 'cat-voter',
    };

    return this.httpPost<T>('https://api.thecatapi.com/v1/votes', data, [
      header,
    ]);
  }
}
