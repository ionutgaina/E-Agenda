import { Injectable } from '@angular/core';
import { NgCloneDeepService } from 'ng-clone-deep';
import { IPerson } from './agenda-data.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaFiltersService {
  constructor(private cloneDeep: NgCloneDeepService) {}
  searchPersons(searchTerm: string, persons: IPerson[]) {
    let result: IPerson[] = [];

    const copy_persons = this.cloneDeep.clone(persons);

    result = copy_persons.filter((person: IPerson) => {
      return (
        person.firstname.toLocaleLowerCase().includes(searchTerm) ||
        person.lastname.toLocaleLowerCase().includes(searchTerm)
      );
    });
    return result;
  }

  sortByFirstName(persons: IPerson[]) {
    let result: IPerson[] = this.cloneDeep.clone(persons);
    result.sort((a, b) => {
      return a.firstname >= b.firstname ? 1 : -1;
    });
    return result;
  }

  sortByLastName(persons: IPerson[]) {
    let result: IPerson[] = this.cloneDeep.clone(persons);
    result.sort((a, b) => {
      return a.lastname >= b.lastname ? 1 : -1;
    });
    return result;
  }

  sortByAge(persons: IPerson[]) {
    let result: IPerson[] = this.cloneDeep.clone(persons);
    result.sort((a, b) => {
      return a.date >= b.date ? -1 : 1;
    });
    return result;
  }
}
