import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactCreateGuard implements CanDeactivate<any> {
  canDeactivate(form: any): boolean {
    return true;
  }

}
