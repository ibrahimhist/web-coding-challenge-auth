import { Injectable, NgZone } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { StorageType } from '../enums/storage-type.enum';

import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
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

  isLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }

    return true;
  }

  login(returnUrl?: string) {
    this.router.navigate([returnUrl || '/']);
    this.isLoggedInSubject.next(true);
  }

  signOut(): void {}
}
