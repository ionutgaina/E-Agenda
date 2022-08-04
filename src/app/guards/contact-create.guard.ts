import { createPlatform, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { CreateContactComponent } from '../agenda/create-contact/create-contact.component';

@Injectable({
  providedIn: 'root',
})
export class ContactCreateGuard implements CanDeactivate<any> {
  canDeactivate(component: any): boolean {
    if (component.personForm.dirty && !component.isSubmit) {
      return confirm(
        'Datele introduse nu vor fi salvate. Esti sigur ca doresti sa iesi ?'
      );
    }
    return true;
  }
}
