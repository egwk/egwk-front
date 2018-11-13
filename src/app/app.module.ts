import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {SynchComponent} from './synch/synch.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule, MatButtonModule, MatSliderModule, MatSlideToggleModule} from "@angular/material";
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { ShowDelPipe } from './pipes/show-del.pipe';
import { ParagraphComponent } from './search/paragraph/paragraph.component';
import { ToolsComponent } from './search/tools/tools.component';

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
    ToolsComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
