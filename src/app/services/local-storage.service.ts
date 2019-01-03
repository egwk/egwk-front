import {Injectable} from '@angular/core';
import {AppSettings} from "../app.settings";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  protected key(key: string): string {
    return AppSettings.APP_ID + '.' + key;
  }

  protected expiryKey(key: string): string {
    return AppSettings.APP_ID + '.' + key + ':expire';
  }

  set(key: string, value: any, replacer?: (key: string, value: any) => any, space?: string | number): void {
    localStorage.setItem(this.expiryKey(key), JSON.stringify(Date.now() + AppSettings.APP_DATA_EXPIRES));
    localStorage.setItem(this.key(key), JSON.stringify(value, replacer, space));
  }

  get(key: string, defaultValue = null, revive?): any {
    const expires = parseInt(localStorage.getItem(this.expiryKey(key)));
    if (Date.now() > expires) {
      return defaultValue;
    }
    const value = localStorage.getItem(this.key(key));
    if (value) {
      return JSON.parse(value, revive);
    } else {
      return defaultValue;
    }
  }
}
