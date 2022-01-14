import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '@app/shared/services/auth.service';
import { MockAuthService } from '@app/shared/mocks/MockAuthService';
import { CoreModule } from '@app/core/core.module';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [CommonModule, RouterTestingModule, CoreModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: { returnUrl: '/' } },
          },
        },
      ],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire auth-service/signUp with data when onSubmitted', () => {
    // Arrange
    spyOn(authService, 'signUp');
    const data = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@gmail.com',
      password: '1234Passw0rd',
      confirmPassword: '1234Passw0rd',
    };
    // Act
    component.onSubmitted(data);

    //  Assertion
    expect(authService.signUp).toHaveBeenCalled();
  });

  it('should NOT fire auth-service/signUp with missing data when onSubmitted', () => {
    // Arrange
    spyOn(authService, 'signUp');
    const data = {
      lastName: 'lastName',
      email: 'test@gmail.com',
      password: '1234Passw0rd',
      confirmPassword: '1234Passw0rd',
    };
    // Act
    component.onSubmitted(data as any);

    //  Assertion
    expect(authService.signUp).not.toHaveBeenCalled();
  });

  it('should fire auth-service/signOut  when onInit', () => {
    // Arrange
    spyOn(authService, 'signOut');
    // Act
    component.ngOnInit();
    //  Assertion
    expect(authService.signOut).toHaveBeenCalled();
  });
});
