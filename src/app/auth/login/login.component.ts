import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'egwk-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username;
  password;
  showSpinner = false;

  constructor(protected authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    return this.authService.login(this.username, this.password)
      .subscribe(response => {
        console.log(response);
      });
  }

}
