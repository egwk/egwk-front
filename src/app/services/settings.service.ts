import {Injectable} from '@angular/core';
import {AuthModel, SettingsModel} from "../models/settingsModel";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  protected _settings = new SettingsModel();

  constructor(
    protected ls: LocalStorageService
  ) {
    this.settings; //get settings
  }

  set(key: string, value: any){
    let tmp = this.settings;
    tmp[key] = value;
    this.settings = tmp;
  }

  del(key: string){
    let tmp = this.settings;
    delete tmp[key];
    this.settings = tmp;
  }

  get(key: string): any  {
    let tmp = this.settings;
    return tmp[key];
  }

  set settings(settings: SettingsModel) {
    this.ls.set('settings', settings, this.ls.inOneYear);
    this._settings = settings;
  }

  get settings(): SettingsModel {
    let settings = this.ls.get('settings');
    if (settings) {
      this._settings = settings;
    }
    return this._settings;
  }


}
