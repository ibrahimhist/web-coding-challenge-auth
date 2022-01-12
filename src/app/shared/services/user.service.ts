import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageKey } from '../enums/storage-key.enum';
import { StorageType } from '../enums/storage-type.enum';
import { UserProfile } from '../models/user-profile.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);

  constructor(private storageService: StorageService) {
    const userProfile = this.storageService.getStorageItem(
      StorageKey.UserProfile,
      StorageType.LocalStorage
    );
    if (userProfile) this.currentUserSubject.next(userProfile);
  }

  getCurrentUserAsObservable(): Observable<UserProfile | null> {
    return this.currentUserSubject.asObservable();
  }

  setUser(user?: UserProfile) {
    this.currentUserSubject.next(user as any);
    this.storageService.store(
      StorageKey.UserProfile,
      user,
      StorageType.LocalStorage
    );
  }
}
