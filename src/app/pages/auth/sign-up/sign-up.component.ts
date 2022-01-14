import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonType } from '@app/shared/enums/button-type.enum';
import { AuthFormModel } from '@app/shared/models/auth-form.model';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.signOut();
  }

  onSubmitted(data: AuthFormModel): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (
      data &&
      data.email &&
      data.firstName &&
      data.lastName &&
      data.password &&
      data.confirmPassword
    )
      this.authService.signUp(data, returnUrl);
  }
}
