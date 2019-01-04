import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material";
import {SettingsService} from "../../services/settings.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'egwk-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error;
  username;
  password;
  showSpinner = false;
  protected auth;
  authRoute = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected authService: AuthService,
    protected settings: SettingsService,
    public snackBar: MatSnackBar,
  ) {
  }

  getCredentials() {
    if (this.authService.loggedIn) {
      this.auth = this.authService.auth;
      this.username = this.auth.username;
    }
  }

  getAuthRoute() {
    this.activatedRoute.url.subscribe(url => {
      this.authRoute = url.filter(item => item.path === 'login').length > 0;
    });
  }

  ngOnInit() {
    this.getCredentials();
    this.getAuthRoute();
  }

  showError(message, action: string) {
    console.log(this.error);
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  navigateToLastUrl() {
    let lastUrl = this.settings.get('lastUrl');
    if (lastUrl) {
      this.router.navigateByUrl(lastUrl);
      this.settings.del('lastUrl');
    }
  }

  isLoggedIn() {
    return this.authService.loggedIn;
  }

  logout() {
    this.authService.logout();
    this.navigateToLastUrl();
  }

  login() {
    return this.authService.login(this.username, this.password)
      .subscribe(response => {
          if (response.error !== undefined) {
            this.error = response.message;
            this.showError(this.error, 'OK');
          } else if (response.access_token) {
            this.authService.setAuth(response, this.username);
            this.error = undefined;
            this.navigateToLastUrl();
          }
        },
        error => {
          this.error = error.error.message;
          this.showError(this.error, 'OK');
        });
  }

}
