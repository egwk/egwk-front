import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // 1st Party
    // this.authService.login('user@mail.com', 'password');
    /*
    // 3rd Party
    this.route.queryParamMap.subscribe(params => {
      this.authService.withAuthCode(params.get('code'));
    });
    */
  }

}
