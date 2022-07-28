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
  sortedPersons: IPerson[] = [];
  sortingTerm: string = '';

  constructor(
    private agendaService: AgendaDataSource,
    private cloneDeep: NgCloneDeepService
  ) {}

  ngOnInit(): void {
    this.subscription = this.agendaService.getList().subscribe((data) => {
      this.persons = data;
      this.foundedPersons = this.searchPersons();
      this.sortedPersons = this.sortValue();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  searchPersons() {
    const result = this.agendaService.searchPersons(
      this.searchTerm,
      this.cloneDeep.clone(this.persons)
    );
    return result;
  }

  sortValue() {
    let result: IPerson[] = [];
    switch (this.sortingTerm) {
      case 'firstname':
        result = this.agendaService.sortByFirstName(this.foundedPersons);
        break;
      case 'lastname':
        result = this.agendaService.sortByLastName(this.foundedPersons);
        break;
      case 'age' || 'date':
        result = this.agendaService.sortByAge(this.foundedPersons);
        break;
      default:
        result = this.foundedPersons;
    }
    return result;
  }

  sortHandler(event: any) {
    this.sortingTerm = event.target.value;
    this.sortedPersons = this.sortValue();
  }

  search(event: any) {
    this.searchTerm = event.target.value;
    this.foundedPersons = this.searchPersons();
    this.sortedPersons = this.sortValue();
  }
}
