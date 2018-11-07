import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {SynchComponent} from './synch/synch.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule, MatButtonModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    SynchComponent,
    SearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
