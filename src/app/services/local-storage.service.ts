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

  del(key: string): void {
    localStorage.removeItem(this.expiryKey(key));
    localStorage.removeItem(this.key(key));
  }

  set(key: string, value: any, expires = null): void {
    let _expires = expires ? expires : JSON.stringify(Date.now() + AppSettings.APP_DATA_EXPIRES);
    localStorage.setItem(this.expiryKey(key), _expires);
    localStorage.setItem(this.key(key), JSON.stringify(value));
  }

  get(key: string, defaultValue = null): any {
    const expires = parseInt(localStorage.getItem(this.expiryKey(key)));
    if (Date.now() > expires) {
      return defaultValue;
    }
    const value = localStorage.getItem(this.key(key));
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  }

  get inOneYear(){
    return Date.now() + 31536000000; // 365 * 24 * 60 * 60 * 1000 ms;
  }

  get inOneMonth(){
    return Date.now() + 2592000000; // 30 * 24 * 60 * 60 * 1000 ms;
  }

  get inOneDay(){
    return Date.now() + 86400000; // 24 * 60 * 60 * 1000 ms;
  }

  get inOneHour(){
    return Date.now() + 3600000; // 60 * 60 * 1000 ms;
  }
}
