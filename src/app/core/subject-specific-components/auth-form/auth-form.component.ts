import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor() {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['authFormType'] &&
      this.authFormType &&
      types[this.authFormType]
    ) {
      this.formSettings = types[this.authFormType];
    }
  }

  onSubmit(): void {}
}
