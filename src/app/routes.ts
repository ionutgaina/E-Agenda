import { Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { ContactDetailsComponent } from './agenda/contact-details/contact-details.component';
import { ContactUpdateComponent } from './agenda/contact-update/contact-update.component';
import { CreateContactComponent } from './agenda/create-contact/create-contact.component';
import { Error404Component } from './errors/error404/error404.component';

export const appRoutes: Routes = [
  {
    path: 'agenda',
    component: AgendaComponent,
    children: [
      { path: 'new', component: CreateContactComponent },
      { path:':id/update', component: ContactUpdateComponent},
      { path: ':id', component: ContactDetailsComponent }

    ],
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
