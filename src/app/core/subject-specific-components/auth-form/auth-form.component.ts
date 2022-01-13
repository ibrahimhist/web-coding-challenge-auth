import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ButtonType } from '@app/shared/enums/button-type.enum';

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

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['authFormType'] &&
      this.authFormType &&
      types[this.authFormType]
    ) {
      this.formSettings = types[this.authFormType];
    }
  }
}
