import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageType } from '../enums/storage-type.enum';
import { StorageKey } from '../enums/storage-key.enum';
import { share } from 'rxjs/internal/operators/share';

@Injectable()
export class StorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string; value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  private getStorage(storageType?: StorageType): Storage {
    let storage: any;
    if (
      !storageType ||
      (storageType && storageType === StorageType.LocalStorage)
    ) {
      storage = localStorage;
    } else if (storageType && storageType === StorageType.SessionStorage) {
      storage = sessionStorage;
    }
    return storage;
  }

  public getAllStorageItems(storageType?: StorageType) {
    const storage: Storage = this.getStorage(storageType);
    if (storage) {
      const s = [];
      for (let i = 0; i < storage.length; i++) {
        let value = storage.getItem((storage as any).key(i));
        try {
          value = value ? JSON.parse(value) : null;
        } catch (error) {
          value = value || null;
        }

        s.push({
          key: storage.key(i),
          value,
        });
      }
      return s;
    } else {
      return null;
    }
  }

  public getStorageItem(
    storageKey: StorageKey,
    storageType?: StorageType
  ): string | null {
    const storage: Storage = this.getStorage(storageType);
    if (storage) {
      let value = storage.getItem(storageKey);
      try {
        value = value ? JSON.parse(value) : null;
      } catch (error) {
        return value || null;
      }
      return value;
    } else {
      return null;
    }
  }

  public store(key: StorageKey, data: any, storageType?: StorageType): void {
    const storage: Storage = this.getStorage(storageType);
    storage.setItem(key, JSON.stringify(data));
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key, value: data });
  }

  public clear(key: any, storageType?: StorageType) {
    const storage: Storage = this.getStorage(storageType);
    storage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key, value: null });
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v: any;
      try {
        v = JSON.parse(event.newValue as any);
      } catch (e) {
        v = event.newValue;
      }
      this.onSubject.next({ key: event.key as any, value: v });
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }

  ngOnDestroy() {
    this.stop();
  }
}
