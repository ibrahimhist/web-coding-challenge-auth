import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { BaseHttpService } from './base-http.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

import { StorageKey } from '../enums/storage-key.enum';
import { StorageType } from '../enums/storage-type.enum';

import { environment } from '../../../environments/environment';
import { AuthFormModel } from '../models/auth-form.model';
import { BaseHttpResponse } from '../models/base-http-response.model';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    protected httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) {
    super(httpClient);
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  getisLoggedInAsObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getToken(): string | null {
    return this.storageService.getStorageItem(
      StorageKey.AccessToken,
      StorageType.LocalStorage
    );
  }

  storeToken(_id: string): void {
    this.storageService.store(
      StorageKey.AccessToken,
      _id,
      StorageType.LocalStorage
    );
  }

  isLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }

    return true;
  }

  signUp(data: AuthFormModel, returnUrl?: string) {
    this.httpPost<UserProfile>(environment.apiUrl + '/users', {
      ...data,
      password: btoa(data.password),
    }).subscribe((response: BaseHttpResponse<UserProfile>) => {
      if (response.serviceResult.isSuccess) {
        const result = response.serviceResult.result;
        this.storeToken(result._id);
        this.userService.setUser(result);
        this.isLoggedInSubject.next(true);
        this.router.navigate([returnUrl || '/']);
      }
    });
  }

  signIn(data: AuthFormModel, returnUrl?: string) {
    // no need api call
    this.storeToken('dummy_id');
    this.userService.setUser(data as any);
    this.isLoggedInSubject.next(true);
    this.router.navigate([returnUrl || '/']);
  }

  signOut(shouldNavigate?: boolean): void {
    this.storageService.clear(StorageKey.AccessToken, StorageType.LocalStorage);
    this.storageService.clear(StorageKey.UserProfile, StorageType.LocalStorage);
    this.userService.setUser(undefined);
    this.isLoggedInSubject.next(false);
    if (shouldNavigate) {
      this.router.navigate(['/sign-in']);
    }
  }
}

// this.router.navigate([returnUrl || '/']);
// this.isLoggedInSubject.next(true);
// console.log(environment.apiUrl);

// // this.httpPost();
