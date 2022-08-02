import { Component, OnInit } from '@angular/core';
import { NgCloneDeepService } from 'ng-clone-deep';
import { Subscription } from 'rxjs';
import { IPerson } from '../shared/agenda-data.model';
import { AgendaDataSource } from '../shared/agenda-data.service';
import { AgendaFiltersService } from '../shared/agenda-filters.service';

@Component({
  templateUrl: './agenda.component.html',
  styles: [],
})
export class AgendaComponent implements OnInit {
  persons: IPerson[] = [];
  options = false;

  subscription: Subscription | undefined;
  searchTerm: string = '';
  foundedPersons: IPerson[] = [];
  sortedPersons: IPerson[] = [];
  sortingTerm: string = '';

  constructor(
    private agendaService: AgendaDataSource,
    private cloneDeep: NgCloneDeepService,
    private agendaFiltersService: AgendaFiltersService
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
    const result = this.agendaFiltersService.searchPersons(
      this.searchTerm,
      this.cloneDeep.clone(this.persons)
    );
    return result;
  }

  sortValue() {
    let resultSort: IPerson[] = [];
    let resultGroup: any;
    switch (this.sortingTerm) {
      case 'firstname':
        resultSort = this.agendaFiltersService.sortByFirstName(this.foundedPersons);
        resultGroup = this.agendaFiltersService.groupByFirstLetter(resultSort, 'firstname');
        break;
      case 'lastname':
        resultSort = this.agendaFiltersService.sortByLastName(this.foundedPersons);
        resultGroup = this.agendaFiltersService.groupByFirstLetter(resultSort, 'lastname');
        break;
      case 'age':
        resultSort = this.agendaFiltersService.sortByAge(this.foundedPersons);
        resultGroup = this.agendaFiltersService.groupByAge(resultSort);
        break;
      case 'date':
        resultSort = this.agendaFiltersService.sortByDate(this.foundedPersons);
        resultGroup = this.agendaFiltersService.groupByDate(resultSort)
        break;
      default:
        resultSort = this.foundedPersons;
        resultGroup = this.agendaFiltersService.groupByDefault(resultSort);
    }
    return resultSort;
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
