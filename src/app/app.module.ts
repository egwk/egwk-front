import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {SynchComponent} from './synch/synch.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { ShowDelPipe } from './pipes/show-del.pipe';
import { ParagraphComponent } from './search/paragraph/paragraph.component';
import { ToolsComponent } from './search/tools/tools.component';
import { LoadingComponent } from './loading/loading.component';
import { SynchSelectComponent } from './synch/select/synch-select.component';
import { HymnalComponent } from './hymnal/hymnal.component';
import { HymnalsComponent } from './hymnal/hymnals/hymnals.component';
import { HymnComponent } from './hymnal/hymn/hymn.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WritingsComponent } from './read/writings/writings.component';
import { OthersComponent } from './read/others/others.component';
import { SsqComponent } from './ssq/ssq.component';
import { ProjectorComponent } from './projector/projector.component';
import { SettingsComponent } from './settings/settings.component';
import { BibleComponent } from './bible/bible.component';
import { DesktopComponent } from './home/desktop/desktop.component';
import { WebComponent } from './home/web/web.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SynchComponent,
    SearchComponent,
    PageNotFoundComponent,
    StripHtmlPipe,
    HighlightTextPipe,
    ShowDelPipe,
    ParagraphComponent,
    ToolsComponent,
    LoadingComponent,
    SynchSelectComponent,
    HymnalComponent,
    HymnalsComponent,
    HymnComponent,
    DashboardComponent,
    WritingsComponent,
    OthersComponent,
    SsqComponent,
    ProjectorComponent,
    SettingsComponent,
    BibleComponent,
    DesktopComponent,
    WebComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
