import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {SynchComponent} from './synch/synch.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSelectModule
} from "@angular/material";
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
    HymnComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
