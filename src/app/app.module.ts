import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { GamesModule } from './games/games.module';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { NameFilterPipe } from './pipes/name-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    GamesModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
