import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonType } from '@app/shared/enums/button-type.enum';
import { AuthFormModel } from '@app/shared/models/auth-form.model';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  buttonType = ButtonType;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.signOut();
  }

  onSubmitted(data: AuthFormModel): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.signIn(data);
  }
}
