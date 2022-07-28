import { Component, OnInit } from '@angular/core';
import { NgCloneDeepService } from 'ng-clone-deep';
import { Subscription } from 'rxjs';
import { AgendaDataSource, IPerson } from '../shared';

@Component({
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  persons: IPerson[] = [];

  subscription: Subscription | undefined;
  searchTerm: string = '';
  foundedPersons: IPerson[] = [];

  constructor(
    private agendaService: AgendaDataSource,
    private cloneDeep: NgCloneDeepService
  ) {}

  ngOnInit(): void {
    this.subscription = this.agendaService.getList().subscribe((data) => {
      this.persons = data;
      this.foundedPersons = this.searchPersons();
      console.log(this.foundedPersons);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  search(event: any) {
    this.searchTerm = event.target.value;
    this.foundedPersons = this.searchPersons();
  }

  searchPersons() {
    const result = this.agendaService.searchPersons(
      this.searchTerm,
      this.cloneDeep.clone(this.persons)
    );
    return result;
  }
}
