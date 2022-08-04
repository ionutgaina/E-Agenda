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
      // Search by number phone
      for (let contact of person.contacts) {
        if (contact.number.includes(searchTerm)) {
          return true;
        }
      }
      // Search by firstname and lastname
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
      let date_a = new Date(a.date);
      let date_b = new Date(b.date);
      return date_a >= date_b ? -1 : 1;
    });
    return result;
  }

  sortByDate(persons: IPerson[]) {
    let result: IPerson[] = this.cloneDeep.clone(persons);
    result.sort((a, b) => {
      let date_a = new Date(a.date);
      let date_b = new Date(b.date);
      return date_a >= date_b ? 1 : -1;
    });
    return result;
  }

  groupByFirstLetter(persons: IPerson[], property: string) {
    let result: any = {};

    if (property !== 'firstname' && property !== 'lastname') return result;

    persons.forEach((person) => {
      const firstLetter = Array.from(person[property])[0];
      if (!result[firstLetter]) {
        result[firstLetter] = [];
      }
      result[firstLetter].push(person);
    });
    return result;
  }

  groupByAge(persons: IPerson[]) {
    let result: any = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    persons.forEach((person) => {
      let age: number;
      let ageGroup: string;
      let birthDate: Date;
      let birthYear: number;

      person.date
        ? ((birthDate = new Date(person.date)),
          (birthYear = birthDate.getFullYear()),
          (age = currentYear - birthYear))
        : (age = -1);

      age < 0
        ? (ageGroup = 'Necunoscut')
        : ((age = Math.floor(age / 10)),
          (ageGroup = `${age || ''}0-${age || ''}9`));

      if (!result[ageGroup]) {
        result[ageGroup] = [];
      }
      result[ageGroup].push(person);
    });

    return result;
  }

  groupByDate(persons: IPerson[]) {
    let result: any = {};
    const months = [
      'Necunoscut',
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie',
    ];

    for (let i = 0; i < months.length; i++) {
      persons.forEach((person) => {
        const birthDate = new Date(person.date);
        let birthMonth = birthDate.getMonth() + 1;

        !person.date ? (birthMonth = 0) : null;

        if (birthMonth === i) {
          let dateGroup = months[birthMonth];

          if (!result[dateGroup]) {
            result[dateGroup] = [];
          }
          result[dateGroup].push(person);
        }
      });
    }
    return result;
  }

  groupByDefault(persons: IPerson[]) {
    let result: any = {};

    persons.forEach((person) => {
      if (!result['']) {
        result[''] = [];
      }
      result[''].push(person);
    });
    return result;
  }
}
