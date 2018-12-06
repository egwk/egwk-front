import { environment } from '../environments/environment';

export class AppSettings {
  public static APP_TITLE = 'EGWK';
  public static APP_TITLE_SEPARATOR = ' | ';

  public static API_URL = environment.baseUrl;

  public static HYMNALS_API_URI = 'hymnals/';
  public static HYMNAL_API_URI = 'hymnal/';
  public static HYMN_API_URI = 'hymn/';

  public static HYMNALS_API_URL =  AppSettings.API_URL + AppSettings.HYMNALS_API_URI;
  public static HYMNAL_API_URL =  AppSettings.API_URL + AppSettings.HYMNAL_API_URI;
  public static HYMN_API_URL =  AppSettings.API_URL + AppSettings.HYMN_API_URI;

  public static SYNCH_API_URI = 'synch/';
  public static SYNCH_API_URL = AppSettings.API_URL + AppSettings.SYNCH_API_URI;

}
