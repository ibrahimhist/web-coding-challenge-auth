import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { StorageService } from './storage.service';
import { UserService } from './user.service';

import { StorageKey } from '../enums/storage-key.enum';
import { StorageType } from '../enums/storage-type.enum';

import { environment } from '../../../environments/environment';
import { AuthFormModel } from '../models/auth-form.model';
import { UserProfile } from '../models/user-profile.model';
import { MessageHandlingService } from './message-handling.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private messageHandlingService: MessageHandlingService,
    private loadingService: LoadingService
  ) {
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
    if (_id)
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
    if (!data) return;
    this.loadingService.showLoading();
    this.addUser(data).subscribe((response) => {
      if (response) {
        this.storeToken(response._id);
        this.userService.setUser(response);
        this.isLoggedInSubject.next(true);
        this.router.navigate([returnUrl || '/']);
        this.loadingService.hideLoading();
        this.messageHandlingService.showSuccessMessage(
          'Lets get fun!',
          'Welcome to Challenge App',
          true
        );
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

  addUser(data: AuthFormModel): Observable<UserProfile> {
    return this.http
      .post<UserProfile>(
        `${environment.apiUrl}/users`,
        { ...data, password: btoa(data.password) },
        this.httpOptions
      )
      .pipe(catchError(this.handleError<UserProfile>(`addUser`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageHandlingService.showErrorMessage(
        `${operation} failed: ${error.message}`
      );
      this.loadingService.hideLoading();
      return of(result as T);
    };
  }
}

//to-do:
// service and sign-up tests
// tslint fixes
