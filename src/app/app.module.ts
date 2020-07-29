import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Injectable, NgModule} from '@angular/core';
import * as Hammer from 'hammerjs';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {SynchComponent} from './synch/synch.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatIconModule,
  MatButtonModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatTabsModule,
  MatAutocompleteModule
} from '@angular/material';
import {SlugifyPipe} from "./pipes/slugify.pipe";
import {StripHtmlPipe} from './pipes/strip-html.pipe';
import {HighlightTextPipe} from './pipes/highlight-text.pipe';
import {ShowDelPipe} from './pipes/show-del.pipe';
import {ParagraphComponent} from './search/paragraph/paragraph.component';
import {ReadParagraphComponent} from './read/paragraph/paragraph.component';
import {ToolsComponent} from './search/tools/tools.component';
import {LoadingComponent} from './loading/loading.component';
import {SynchSelectComponent} from './synch/select/synch-select.component';
import {HymnalComponent} from './hymnal/hymnal.component';
import {HymnalsComponent} from './hymnal/hymnals/hymnals.component';
import {HymnComponent} from './hymnal/hymn/hymn.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WritingsComponent} from './read/writings/writings.component';
import {OthersComponent} from './read/others/others.component';
import {SsqComponent} from './ssq/ssq.component';
import {ProjectorComponent} from './projector/projector.component';
import {SettingsComponent} from './settings/settings.component';
import {BibleComponent} from './bible/bible.component';
import {DesktopComponent} from './home/desktop/desktop.component';
import {WebComponent} from './home/web/web.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {ButtonsComponent} from './dashboard/buttons/buttons.component';
import {NewsComponent} from './dashboard/news/news.component';
import {SdaComponent} from './icons/sda/sda.component';
import {IconComponent} from './icons/icon.component';
import {ReadComponent} from './read/read/read.component';
import {TocComponent} from './read/toc/toc.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {ChapterStepComponent} from './read/chapter-step/chapter-step.component';
import {CircularMenuComponent} from './circular-menu/circular-menu.component';
import {ParagraphPropertiesComponent} from './read/paragraph-properties/paragraph-properties.component';
import {CommentsComponent, CommentComponent} from './comments/comments.component';
import {CommentEditComponent} from './comments/comment-edit.component';
import {EditHymnalComponent} from './hymnal/edit-hymnal/edit-hymnal.component';
import {ItemComponent} from './circular-menu/item/item.component';
import {ToggleItemComponent} from './circular-menu/toggle-item/toggle-item.component';
import {BookmarkComponent} from './bookmark/bookmark.component';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {TokenInterceptor} from "./auth/token.interceptor";
import { EditHymnComponent } from './hymnal/edit-hymn/edit-hymn.component';

@Injectable({
  providedIn: 'root',
})
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let options = {};

    if (element.attributes['data-mc-options']) {
      try {
        let parseOptions = JSON.parse(element.attributes['data-mc-options'].nodeValue);
        options = parseOptions;
      } catch (err) {
        console.error('An error occurred when attempting to parse Hammer.js options: ', err);
      }
    }

    const mc = new Hammer(element, options);

    // keep default angular config
    mc.get('pinch').set({enable: true});
    mc.get('rotate').set({enable: true});

    // retain support for angular overrides object
    for (const eventName in this.overrides) {
      mc.get(eventName).set(this.overrides[eventName]);
    }

    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SynchComponent,
    SearchComponent,
    PageNotFoundComponent,
    SlugifyPipe,
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
    LoginComponent,
    ButtonsComponent,
    NewsComponent,
    SdaComponent,
    IconComponent,
    ReadComponent,
    TocComponent,
    BreadcrumbsComponent,
    ChapterStepComponent,
    ReadParagraphComponent,
    CircularMenuComponent,
    ParagraphPropertiesComponent,
    CommentsComponent,
    CommentComponent,
    CommentEditComponent,
    EditHymnalComponent,
    ItemComponent,
    ToggleItemComponent,
    BookmarkComponent,
    ToggleButtonComponent,
    EditHymnComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {
        // scrollPositionRestoration: 'enabled',
        // anchorScrolling: 'enabled',
        // scrollOffset: [0, 120] // [x, y]
        // enableTracing: true,  // <-- debugging purposes only
      }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    CdkTableModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule
  ],
  providers: [
    // {
    //   provide: HAMMER_GESTURE_CONFIG,
    //   useClass: MyHammerConfig
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ParagraphPropertiesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
