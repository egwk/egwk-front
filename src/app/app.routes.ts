import {Routes} from "@angular/router";
import {SynchComponent} from "./synch/synch.component";
import {SearchComponent} from "./search/search.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const appRoutes: Routes = [
  {
    path: 'synch',
    component: SynchComponent,
    data: {title: 'Synch Writings'}
  },
  {
    path: 'synch/:code/:translation',
    component: SynchComponent,
    data: {title: 'Synch Writings'}
  },
  {
    path: 'synch/:code/:translation/:page',
    component: SynchComponent,
    data: {title: 'Synch Writings'}
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {title: 'Search in the Writings'}
  },
  {
    path: 'books',
    component: SearchComponent,
    data: {title: 'Books are coming'}
  },
  {
    path: 'bible',
    component: SearchComponent,
    data: {title: 'Bibles are coming'}
  },
  {
    path: 'hymnals',
    component: SearchComponent,
    data: {title: 'Hymnals are coming'}
  },
  {
    path: 'ssq',
    component: SearchComponent,
    data: {title: 'SSQ is coming'}
  },
  {
    path: 'home',
    component: SearchComponent,
    data: {title: 'Home'}
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
