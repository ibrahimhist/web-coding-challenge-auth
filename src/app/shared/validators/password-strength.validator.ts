import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;

    const firstName = control.value.firstName.toLocaleLowerCase();
    const lastName = control.value.lastName.toLocaleLowerCase();

    if (!password || !confirmPassword) {
      return null;
    }

    const passwordMatch = password === confirmPassword;
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const notContainFirstName =
      !firstName || password.toLocaleLowerCase().indexOf(firstName) === -1;
    const notContainLastName =
      !lastName || password.toLocaleLowerCase().indexOf(lastName) === -1;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      notContainFirstName &&
      notContainLastName &&
      passwordMatch;

    return !passwordValid
      ? {
          passwordStrength: true,
          ...(!hasUpperCase && { passwordUpperCase: true }),
          ...(!hasLowerCase && { passwordLowerCase: true }),
          ...(!notContainFirstName && { passwordContainsFirstName: true }),
          ...(!notContainLastName && { passwordContainsLastName: true }),
          ...(!passwordMatch && { passwordMatch: true }),
        }
      : null;
  };
}
