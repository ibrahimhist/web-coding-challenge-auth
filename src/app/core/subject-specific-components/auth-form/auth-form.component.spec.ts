import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display First Name, Last Name, Email, Password when authFormType is sign-up', () => {});

  it('should display Email, Password when authFormType is sign-in', () => {});

  it('should NOT display First Name and Last Name when authFormType is sign-in', () => {});

  it('should show all errors when clicked the sign-up ', () => {});

  it('should show Required error when First Name being touched but not has value ', () => {});

  it('should show Required error when Last Name being touched but not has value ', () => {});

  it('should show Required error when Email being touched but not has value ', () => {});

  it('should show Invalid error when Email being not email format', () => {});

  it('should show Required error when Password being touched but not has value ', () => {});

  it('should show Should Have LowerCase error when Password does not have lowercase char', () => {});

  it('should show Should Have UppurCase error when Password does not have uppercase char', () => {});

  it('should show MinLength error when Password Length is lower than 8', () => {});

  it('should show PasswordContainsFirstName error when Password contains first name', () => {});

  it('should show PasswordContainsLastName error when Password contains last name', () => {});

  it('should show PasswodMatch error when Confirm Password did not match with Password', () => {});

  it('should show no error when Password is correct format and same with Confirm Password', () => {});

  it('should show no error when form is valid', () => {});

  it('shoud fire submitted event when form is valid and clicked sign-up', () => {});

  it('shoud NOT fire submitted event when form is invalid and clicked sign-up', () => {});

  it('should show sign-in helper button when authFormType is sign-up ', () => {});

  it('should show sign-up helper button when authFormType is sign-in ', () => {});

  it('should NOT show  sign-in and sign-up helper button when authFormType is update ', () => {});

  it('should navigate /sign-in when sign-in button clicked', () => {});

  it('should navigate /sign-up when sign-up button clicked', () => {});
});
