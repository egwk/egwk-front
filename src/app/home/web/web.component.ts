import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SettingsService} from "../../services/settings.service";
import {AuthGuard} from "../../auth/auth.guard";

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {

  menuShown: boolean = false;
  year: number;
  @ViewChild('mobileMenu', {read: ElementRef}) mobileMenu: ElementRef;
  @ViewChild('searchInput', {read: ElementRef}) searchInput: ElementRef;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected authService: AuthService,
    protected authGuard: AuthGuard,
    protected settings: SettingsService,
  ) {
  }

  onClick(event) {
    if (!this.mobileMenu.nativeElement.contains(event.target)) {
      this.menuShown = false;
    }
  }

  hasPermission(route: string) {
    return this.authGuard.hasPermission(route);
  }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  login() {
    let lastUrl = this.router.url;
    this.settings.set('lastUrl', lastUrl);
    this.router.navigateByUrl("/auth/login");
  }

  logout() {
    if (!this.authGuard.hasPermission(this.router.url)) {
      this.router.navigateByUrl("/");
    }
    return this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn;
  }

  getLoginName(): string {
    return this.authService.auth.username;
  }

  search(query: string) {
    this.router.navigate(['/search'], {queryParams: {q: query}});
  }

  onKeydown($event) {
    if ($event.key === "Enter") {
      this.search(this.searchInput.nativeElement.value)
    }
  }

}
