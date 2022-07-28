import { Injectable } from '@angular/core';
import { NgCloneDeepService } from 'ng-clone-deep';
import { BehaviorSubject } from 'rxjs';
import { IPerson } from './agenda-data.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaDataSource {
  subject = new BehaviorSubject(PERSONS);

  constructor(private cloneDeep: NgCloneDeepService) {}

  getList() {
    return this.subject;
  }

  getPerson(id: number) {
    return PERSONS.filter((person) => person.id === id)[0];
  }

  createPerson(formValues:any) {}

  updatePerson() {}

  deletePerson(id: number) {
    let index = PERSONS.findIndex((person) => person.id === id);
    PERSONS.splice(index, 1);
    this.subject.next(PERSONS);
  }

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
      return a.date >= b.date ? 1 : -1;
    });
    return result;
  }
}



const PERSONS: IPerson[] = [
  {
    id: 1,
    firstname: 'Gaina',
    lastname: 'Ionut',
    date: new Date('5/30/2001'),
    contacts: [
      {
        number: '0751911116',
        type: 'Personal',
      },
      {
        number: '024341181',
        type: 'Acasă',
      },
    ],
    addresses: [
      {
        location: {
          street: 'Str. Pădurilor 12',
          city: 'Sălcuța',
          country: 'Republica Moldova',
        },
        type: 'Acasă',
      },
      {
        location: {
          street: 'Str. Independenței 290',
          city: 'București',
          country: 'România',
        },
        type: 'Serviciu',
      },
    ],
    notes: '',
  },
  {
    id: 3,
    firstname: 'Ardei',
    lastname: 'AVasile',
    date: new Date('5/32/2023'),
    contacts: [
      {
        number: '075532116',
        type: 'Personal',
      },
      {
        number: '024321331',
        type: 'Acasă',
      },
    ],
    addresses: [
      {
        location: {
          street: 'Str. Pădurilor 12',
          city: 'Sălcuța',
          country: 'Republica Moldova',
        },
        type: 'Acasă',
      },
      {
        location: {
          street: 'Str. Independenței 290',
          city: 'București',
          country: 'România',
        },
        type: 'Serviciu',
      },
    ],
    notes: '',
  },
  {
    id: 2,
    firstname: 'Petrusca',
    lastname: 'Adrian',
    date: new Date('5/30/2001'),
    contacts: [
      {
        number: '0751911116',
        type: 'Personal',
      },
      {
        number: '024341181',
        type: 'Acasă',
      },
    ],
    addresses: [
      {
        location: {
          street: 'Str. Pădurilor 12',
          city: 'Sălcuța',
          country: 'Republica Moldova',
        },
        type: 'Acasă',
      },
      {
        location: {
          street: 'Str. Independenței 290',
          city: 'București',
          country: 'România',
        },
        type: 'Serviciu',
      },
    ],
    notes: '',
  },
];
