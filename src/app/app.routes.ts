import {Routes} from "@angular/router";
import {SynchComponent} from "./synch/synch.component";
import {SearchComponent} from "./search/search.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SynchSelectComponent} from "./synch/select/synch-select.component";
import {HymnalsComponent} from "./hymnal/hymnals/hymnals.component";
import {HymnalComponent} from "./hymnal/hymnal.component";
import {HymnComponent} from "./hymnal/hymn/hymn.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {WritingsComponent} from "./read/writings/writings.component";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";

export const appRoutes: Routes = [
  //
  // Auth
  //
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'auth',
    children: [
      // {
      //   path: '',
      //   component: DashboardsComponent
      // },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'callback',
        component: AuthComponent
      },
    ]
  },
  //
  // Synch
  //
  {
    path: 'synch',
    component: SynchSelectComponent,
    data: {title: 'Synch Writings'}
  },
  {
    path: 'synch/:translation',
    component: SynchComponent,
    data: {title: 'Synch Writings'}
  },
  {
    path: 'synch/:translation/:page',
    component: SynchComponent,
    data: {title: 'Synch Writings'}
  },
  //
  // Hymnals
  //
  {
    path: 'hymnals',
    component: HymnalsComponent,
    data: {title: 'Hymnals'}
  },
  {
    path: 'hymnals/:language',
    component: HymnalsComponent,
    data: {title: 'Hymnals'}
  },
  {
    path: 'hymnals/languages',
    component: HymnalsComponent,
    data: {title: 'Hymnal languages'}
  },
  {
    path: 'hymnal/:hymnal',
    component: HymnalComponent,
    data: {title: 'Hymnal'}
  },
  {
    path: 'hymn/:hymnal/:no',
    component: HymnComponent,
    data: {title: 'Hymnal'}
  },
  //
  // Search
  //
  {
    path: 'search',
    component: SearchComponent,
    data: {title: 'Search in the Writings'}
  },
  {
    path: 'books',
    component: WritingsComponent,
    data: {title: 'Books are coming'}
  },
  {
    path: 'bible',
    component: SearchComponent,
    data: {title: 'Bibles are coming'}
  },
  {
    path: 'ssq',
    component: SearchComponent,
    data: {title: 'SSQ is coming'}
  },
  {
    path: 'home',
    component: DashboardComponent,
    data: {title: 'Home'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
