import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgendaDataSource, IPerson } from '../shared';

@Component({
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  persons: IPerson[] | undefined;
  subscription: Subscription | undefined;

  constructor(private agendaService: AgendaDataSource) {}

  ngOnInit(): void {
    this.subscription = this.agendaService
      .getList()
      .subscribe((persons) => (this.persons = persons));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
