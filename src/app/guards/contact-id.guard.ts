import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AgendaDataSource } from '../shared/agenda-data.service';

@Injectable({
  providedIn: 'root',
})
export class ContactIdGuard implements CanActivate {
  constructor(
    private agendaService: AgendaDataSource,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const eventExists = !!this.agendaService.getPerson(+route.params['id']);

    if (!eventExists) this.router.navigate(['/404']);

    return eventExists;
  }
}
