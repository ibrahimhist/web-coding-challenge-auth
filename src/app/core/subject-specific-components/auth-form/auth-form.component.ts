import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonType } from '@app/shared/enums/button-type.enum';
import { getPasswordStrengthValidator } from '@app/shared/validators/password-strength.validator';

type FomrSettings = {
  icon: string;
  header: string;
  buttonText: string;
  buttonIcon: string;
};

const types: { [key: string]: FomrSettings } = {
  'sign-up': {
    icon: 'user',
    header: 'Create Account',
    buttonText: 'Sign Up',
    buttonIcon: 'envelope',
  },
  'sign-in': {
    icon: 'envelope',
    header: 'Sign In to Your Account',
    buttonText: 'Sign In',
    buttonIcon: 'sign-in-alt',
  },
  update: {
    icon: 'user-edit',
    header: 'Update Your Account',
    buttonText: 'Update',
    buttonIcon: 'edit',
  },
};

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnChanges {
  @Input() authFormType: 'sign-in' | 'sign-up' | 'update';

  formSettings: FomrSettings;
  buttonType = ButtonType;
  authForm: FormGroup;
  submitted = false;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['authFormType'] &&
      this.authFormType &&
      types[this.authFormType]
    ) {
      this.formSettings = types[this.authFormType];

      if (this.authFormType === 'sign-in') {
        this.authForm = new FormGroup({
          email: new FormControl('', [Validators.email, Validators.required]),
          password: new FormControl('', [
            Validators.minLength(8),
            Validators.required,
          ]),
        });
      } else {
        this.authForm = new FormGroup(
          {
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
              Validators.minLength(8),
              Validators.required,
            ]),
          },
          getPasswordStrengthValidator()
        );
      }
    }
  }

  get firstName() {
    return this.authForm.get('firstName') as AbstractControl;
  }

  get lastName() {
    return this.authForm.get('lastName');
  }
  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password') as AbstractControl;
  }

  get passwordError() {
    let text;
    const errors = this.authForm.errors as ValidationErrors;
    if (errors['passwordContainsFirstName']) {
      text = 'Should not contain First Name';
    } else if (errors['passwordContainsLastName']) {
      text = 'Should not contain Last Name';
    } else if (errors['passwordLowerCase']) {
      text = 'Should have at least 1 lowercase';
    } else if (errors['passwordUpperCase']) {
      text = 'Should have at least 1 uppercase';
    }
    return text;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.authForm.valid) {
    }
    console.log(this.authForm);
  }

  onClickSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  onClickSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
