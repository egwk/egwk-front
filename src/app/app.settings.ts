import { environment } from '../environments/environment';

export class AppSettings {
  public static APP_ID = 'egwk';
  public static APP_TITLE = 'EGWK';
  public static APP_TITLE_SEPARATOR = ' | ';
  public static APP_DATA_EXPIRES = 86400000; // 24 * 60 * 60 * 1000 ms;

  public static DEFAULT_SHOW_ORIGINAL = true;

  public static API_URL = environment.baseUrl;

  public static AS3RDP_CLIENT_ID = environment.clientId;
  public static AS3RDP_CLIENT_SECRET = environment.clientSecret;
  public static AS3RDP_CLIENT_REDIRECT_URI = environment.redirectUri;

  public static AUTH_3RDP_BASE_URL =  AppSettings.API_URL + 'oauth/';
  public static AUTH_3RDP_TOKEN_URL =  AppSettings.AUTH_3RDP_BASE_URL + 'token/';
  public static AUTH_3RDP_AUTHORIZE_URL =  AppSettings.AUTH_3RDP_BASE_URL + 'authorize/';
  public static AUTH_3RDP_AUTHORIZATION_FULL_URL =  `${AppSettings.AUTH_3RDP_AUTHORIZE_URL}?client_id=${AppSettings.AS3RDP_CLIENT_ID}&redirect_uri=${AppSettings.AS3RDP_CLIENT_REDIRECT_URI}&response_type=code&scope=*`;

  public static CLIENT_ID = environment.clientId;
  public static CLIENT_SECRET = environment.clientSecret;
  public static CLIENT_REDIRECT_URI = environment.redirectUri;

  public static AUTH_BASE_URL =  AppSettings.API_URL + 'oauth/';
  public static AUTH_TOKEN_URL =  AppSettings.AUTH_BASE_URL + 'token/';

  public static HYMNALS_API_URI = 'hymnals/';
  public static HYMNAL_API_URI = 'hymnal/';
  public static HYMN_API_URI = 'hymn/';

  public static HYMNALS_API_URL =  AppSettings.API_URL + AppSettings.HYMNALS_API_URI;
  public static HYMNAL_API_URL =  AppSettings.API_URL + AppSettings.HYMNAL_API_URI;
  public static HYMN_API_URL =  AppSettings.API_URL + AppSettings.HYMN_API_URI;

  public static SYNCH_API_URI = 'synch/';
  public static SYNCH_API_URL = AppSettings.API_URL + AppSettings.SYNCH_API_URI;

  public static READER_API_URI = 'reader/';
  public static READER_API_URL = AppSettings.API_URL + AppSettings.READER_API_URI;

  public static NEWS_API_URI = 'news/';
  public static NEWS_API_URL = AppSettings.API_URL + AppSettings.NEWS_API_URI;

}
