import { Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { ContactDetailsComponent } from './agenda/contact-details/contact-details.component';
import { CreateContactComponent } from './agenda/create-contact/create-contact.component';
import { Error404Component } from './errors/error404/error404.component';

export const appRoutes: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent,
    children: [
      { path: ':id', component: ContactDetailsComponent },
      { path: 'new', component: CreateContactComponent },
    ],
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
