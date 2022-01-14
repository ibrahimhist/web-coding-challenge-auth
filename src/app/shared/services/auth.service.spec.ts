import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { AuthFormModel } from '../models/auth-form.model';
import { UserProfile } from '../models/user-profile.model';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { MessageHandlingService } from './message-handling.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

describe('Auth Service', () => {
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let dummyDataSignUp: AuthFormModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        StorageService,
        UserService,
        MessageHandlingService,
        LoadingService,
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    dummyDataSignUp = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@gmail.com',
      password: '1234Passw0rd',
    };
  });

  it('should sign up when addUser called', () => {
    const response: UserProfile = {
      _id: '_id',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    authService.registerUser(dummyDataSignUp).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    httpTestingController.verify();
  });

  // there can be more test
});
