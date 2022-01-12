import { Injectable, NgZone } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKey } from '../enums/storage-key.enum';
import { StorageType } from '../enums/storage-type.enum';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private storageService: StorageService) {}

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
  }

  signOut(): void {}
}
