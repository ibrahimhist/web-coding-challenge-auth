import { CommonModule } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '@app/core/core.module';
import { AuthFormComponent } from './auth-form.component';

const inputTesIds = [
  'auth-form-first-name',
  'auth-form-last-name',
  'auth-form-email',
  'auth-form-password',
  'auth-form-confirm-password',
];

const inputTesIdsForSignIn = ['auth-form-email', 'auth-form-password'];

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let router: Router;
  let fixture: ComponentFixture<AuthFormComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  const getElement = (elementId: string) =>
    fixture.debugElement.query(By.css(`[data-testid="${elementId}"]`));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [AuthFormComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    // Arrange
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display First Name, Last Name, Email, Password,Confirm Password when authFormType is sign-up', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();
    inputTesIds.forEach((inputId) => {
      const input = getElement(inputId);
      //  Assertion
      expect(input).toBeTruthy();
    });
  });

  it('should display First Name, Last Name, Email, Password,Confirm Password when authFormType is update', () => {
    // Arrange
    component.authFormType = 'update';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'update', true),
    });
    //  Act
    fixture.detectChanges();
    inputTesIds.forEach((inputId) => {
      const input = getElement(inputId);
      //  Assertion
      expect(input).toBeTruthy();
    });
  });

  it('should display Email, Password and hide other inputs when authFormType is sign-in', () => {
    // Arrange
    component.authFormType = 'sign-in';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-in', true),
    });
    //  Act
    fixture.detectChanges();
    inputTesIdsForSignIn.forEach((inputId) => {
      const input = getElement(inputId);
      //  Assertion
      expect(input).toBeTruthy();
    });

    inputTesIds
      .filter((x) => !inputTesIdsForSignIn.includes(x))
      .forEach((inputId) => {
        const input = getElement(inputId);
        //  Assertion
        expect(input).not.toBeTruthy();
      });
  });

  it('should show all errors when clicked the sign-up button', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();
    component.onSubmit();
    fixture.detectChanges();

    inputTesIds.forEach((inputId) => {
      const error = getElement(inputId + '-error');
      //  Assertion
      expect(error).toBeTruthy();
    });
  });

  it('should show no error when form is valid', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    component.submitClicked = true;
    component.authForm.setValue({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@gmail.com',
      password: '1234Passw0rd',
      confirmPassword: '1234Passw0rd',
    });
    fixture.detectChanges();

    //  Assertion
    [...inputTesIds, 'auth-form'].forEach((inputId) => {
      const error = getElement(inputId + '-error');
      expect(error).not.toBeTruthy();
    });
  });

  it('shoud fire submitted event when form is valid and clicked sign-up', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });

    spyOn(component.submitted, 'emit');
    component.authForm.setValue({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@gmail.com',
      password: '1234Passw0rd',
      confirmPassword: '1234Passw0rd',
    });

    // Act
    component.onSubmit();

    // Assertion
    expect(component.submitted.emit).toHaveBeenCalled();
  });

  it('shoud NOT fire submitted event when form is invalid and clicked sign-up', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });

    spyOn(component.submitted, 'emit');
    component.authForm.setValue({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@gmail.com',
      password: '1234Passw0rd',
      confirmPassword: '1234Passw0rd22222',
    });

    // Act
    component.onSubmit();

    // Assertion
    expect(component.submitted.emit).not.toHaveBeenCalled();
  });

  it('should show sign-in helper button when authFormType is sign-up ', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });

    //  Act
    fixture.detectChanges();
    const btn = getElement('auth-form-helper-button-sign-in');

    //  Assertion
    expect(btn).toBeTruthy();
  });

  it('should navigate /sign-in when sign-in button clicked', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    const navigateSpy = spyOn(router, 'navigate');
    component.onClickSignIn();

    //  Assertion
    expect(navigateSpy).toHaveBeenCalledWith(['/sign-in']);
  });

  it('First Name field validity', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();
    let firstName = component.authForm.controls['firstName'];
    //  Assertion
    expect(firstName.valid).toBeFalsy();

    //  Act
    firstName.setValue('');
    //  Assertion
    expect(firstName.hasError('required')).toBeTruthy();
  });

  it('Last Name field validity', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();
    let lastName = component.authForm.controls['lastName'];
    //  Assertion
    expect(lastName.valid).toBeFalsy();

    //  Act
    lastName.setValue('');
    //  Assertion
    expect(lastName.hasError('required')).toBeTruthy();
  });

  it('Email field validity', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();
    let email = component.authForm.controls['email'];
    //  Assertion
    expect(email.valid).toBeFalsy();

    //  Act
    email.setValue('');
    //  Assertion
    expect(email.hasError('required')).toBeTruthy();

    //  Act
    email.setValue('dumy@@gmail.com');
    //  Assertion
    expect(email.hasError('email')).toBeTruthy();
  });

  it('Password field  default validity', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();

    let password = component.authForm.controls['password'];
    //  Assertion
    expect(password.valid).toBeFalsy();

    // required
    //  Act
    password.setValue('');
    //  Assertion
    expect(password.hasError('required')).toBeTruthy();

    // min-length
    //  Act
    password.setValue('12345');
    //  Assertion
    expect(password.hasError('minlength')).toBeTruthy();
  });

  it('Password Strength validty', () => {
    // Arrange
    component.authFormType = 'sign-up';
    component.ngOnChanges({
      authFormType: new SimpleChange(null, 'sign-up', true),
    });
    //  Act
    fixture.detectChanges();

    let password = component.authForm.controls['password'];
    let confirmPassword = component.authForm.controls['confirmPassword'];
    let firstName = component.authForm.controls['firstName'];
    let lastName = component.authForm.controls['lastName'];

    // Not Have Upper Case
    //  Act
    password.setValue('dummy');
    confirmPassword.setValue('dummy');
    //  Assertion
    expect(component.authForm.hasError('passwordUpperCase')).toBeTruthy();
    expect(component.authForm.hasError('passwordStrength')).toBeTruthy();

    // Not Have Lower Case
    //  Act
    password.setValue('DUMMY');
    confirmPassword.setValue('DUMMY');
    //  Assertion
    expect(component.authForm.hasError('passwordLowerCase')).toBeTruthy();
    expect(component.authForm.hasError('passwordStrength')).toBeTruthy();

    // Contains First Name
    //  Act
    firstName.setValue('first');
    password.setValue('first1234');
    confirmPassword.setValue('first1234');
    //  Assertion
    expect(
      component.authForm.hasError('passwordContainsFirstName')
    ).toBeTruthy();
    expect(component.authForm.hasError('passwordStrength')).toBeTruthy();

    // Contains Last Name
    //  Act
    lastName.setValue('last');
    password.setValue('last1234');
    confirmPassword.setValue('last1234');
    //  Assertion
    expect(
      component.authForm.hasError('passwordContainsLastName')
    ).toBeTruthy();
    expect(component.authForm.hasError('passwordStrength')).toBeTruthy();

    // Password Match
    //  Act
    password.setValue('123');
    confirmPassword.setValue('456');
    //  Assertion
    expect(component.authForm.hasError('passwordMatch')).toBeTruthy();
    expect(component.authForm.hasError('passwordStrength')).toBeTruthy();
  });

  // it('should show sign-up helper button when authFormType is sign-in ', () => {});

  // it('should NOT show  sign-in and sign-up helper button when authFormType is update ', () => {});

  // it('should navigate /sign-up when sign-up button clicked', () => {});

  // .... and so on ....
});
