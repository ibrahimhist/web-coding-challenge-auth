import { Component, OnInit } from '@angular/core';
import { ButtonType } from '@app/shared/enums/button-type.enum';
import { BaseHttpResponse } from '@app/shared/models/base-http-response.model';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { OpenApiService } from '@app/shared/services/open-api.service';

@Component({
  selector: 'app-vote-cat',
  templateUrl: './vote-cat.component.html',
  styleUrls: ['./vote-cat.component.scss'],
})
export class VoteCatComponent {
  buttonType = ButtonType;
  catData: {
    id: string;
    url: string;
  };

  isDarkModeEnabled: boolean;

  constructor(
    private openApiService: OpenApiService,
    private messageHandlingService: MessageHandlingService
  ) {
    this.getRandomCat();
  }

  getRandomCat(): void {
    this.openApiService
      .getRandomCat<any>()
      .subscribe((baseHttpResponse: BaseHttpResponse<any[]>) => {
        const result = baseHttpResponse.ServiceResult.Result;
        this.catData = result[0];
      });
  }

  onClickedLike(): void {
    this.openApiService
      .likeCat<any>(this.catData.id)
      .subscribe((baseHttpResponse: BaseHttpResponse<any>) => {
        this.messageHandlingService.showSuccessMessage('', 'Thank you!');
        this.getRandomCat();
      });
  }
}
