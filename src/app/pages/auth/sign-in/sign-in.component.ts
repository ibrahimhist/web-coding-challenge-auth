import { Component, OnInit } from '@angular/core';
import { ButtonType } from '@app/shared/enums/button-type.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  buttonType = ButtonType;

  constructor() {}

  ngOnInit(): void {}
}
