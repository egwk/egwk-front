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
import {TocComponent} from "./read/toc/toc.component";
import {ReadComponent} from "./read/read/read.component";
import {AuthGuard} from "./auth/auth.guard";
import {EditHymnalComponent} from "./hymnal/edit-hymnal/edit-hymnal.component";
import {BibleComponent} from "./bible/bible.component";
import {SsqComponent} from "./ssq/ssq.component";
import {EditHymnComponent} from "./hymnal/edit-hymn/edit-hymn.component";

export const appRoutes: Routes = [
  //
  // Auth
  //
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: AuthComponent
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
    data: {title: 'Synch Writings'},
    canActivate: [AuthGuard],
  },
  {
    path: 'synch/:translation',
    component: SynchComponent,
    data: {title: 'Synch Writings'},
    canActivate: [AuthGuard],
  },
  {
    path: 'synch/:translation/:page',
    component: SynchComponent,
    data: {title: 'Synch Writings'},
    canActivate: [AuthGuard],
    /*
    children: [
      {
        path: ':translation',
        component: SynchComponent,
        data: {title: 'Synch Writings'}
      },
      {
        path: ':translation/:page',
        component: SynchComponent,
        data: {title: 'Synch Writings'}
      },
    ]
    */
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
  {
    path: 'edit/hymn',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':hymnal',
        component: EditHymnComponent,
        data: {title: 'Edit Hymn'}
      },
      {
        path: ':hymnal/:no',
        component: EditHymnComponent,
        data: {title: 'Edit Hymn'}
      },
    ]

  },
  {
    path: 'edit/hymnal',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: EditHymnalComponent,
        data: {title: 'Edit Hymnal'}
      },
      {
        path: ':hymnal',
        component: EditHymnalComponent,
        data: {title: 'Edit Hymnal'}
      },
    ]

  },
  //
  // Search
  //
  {
    path: 'search',
    component: SearchComponent,
    data: {title: 'Search in the Writings'},
  },
  //
  {
    path: 'search/:page',
    component: SearchComponent,
    data: {title: 'Search in the Writings'},
  },
  //
  // Read testimonies
  //
  {
    path: 'books',
    component: WritingsComponent
  },
  {
    path: 'toc',
    children: [
      {path: ':bookCode', component: TocComponent},
      {path: ':bookCode/:lang', component: TocComponent},
      {path: ':bookCode/:lang/:publisher', component: TocComponent},
      {path: ':bookCode/:lang/:publisher/:year', component: TocComponent},
      {path: ':bookCode/:lang/:publisher/:year/:no', component: TocComponent},
    ]
  },
  {
    path: 'chapter',
    children: [
      {path: ':paraId', component: ReadComponent},
      {path: ':paraId/:lang', component: ReadComponent},
      {path: ':paraId/:lang/:publisher', component: ReadComponent},
      {path: ':paraId/:lang/:publisher/:year', component: ReadComponent},
      {path: ':paraId/:lang/:publisher/:year/:no', component: ReadComponent},
    ]
  },
  //
  // Bible
  //
  {
    path: 'bible',
    component: BibleComponent,
    data: {title: 'Bible'}
  },
  //
  // Sabbath School Quarterly
  //
  {
    path: 'ssq',
    component: SsqComponent,
    data: {title: 'Sabbath School Quarterly'}
  },
  //
  // Home
  //
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
