import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value.password;
    const firstName = control.value.firstName.toLocaleLowerCase();
    const lastName = control.value.lastName.toLocaleLowerCase();

    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const notContainFirstName =
      password.toLocaleLowerCase().indexOf(firstName) === -1;
    const notContainLastName =
      password.toLocaleLowerCase().indexOf(lastName) === -1;

    const passwordValid =
      hasUpperCase && hasLowerCase && notContainFirstName && notContainLastName;

    return !passwordValid
      ? {
          passwordStrength: true,
          ...(!hasUpperCase && { passwordUpperCase: true }),
          ...(!hasLowerCase && { passwordLowerCase: true }),
          ...(!notContainFirstName && { passwordContainsFirstName: true }),
          ...(!notContainLastName && { passwordContainsLastName: true }),
        }
      : null;
  };
}
