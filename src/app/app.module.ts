import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgendaDataSource } from './shared/index';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AgendaDataSource
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
