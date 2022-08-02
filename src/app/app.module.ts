import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/error404/error404.component';
import { ContactThumbnailComponent } from './agenda/contact-thumbnail/contact-thumbnail.component';
import { ContactDetailsComponent } from './agenda/contact-details/contact-details.component';
import { CreateContactComponent } from './agenda/create-contact/create-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactUpdateComponent } from './agenda/contact-update/contact-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    Error404Component,
    ContactThumbnailComponent,
    ContactDetailsComponent,
    CreateContactComponent,
    ContactUpdateComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
