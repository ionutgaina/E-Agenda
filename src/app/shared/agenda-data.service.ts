import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPerson } from './agenda-data.model';
@Injectable({
  providedIn: 'root',
})
export class AgendaDataSource {
  subject = new BehaviorSubject(PERSONS);

  constructor() {}

  getList() {
    return this.subject;
  }

  getPerson(id: number) {
    return PERSONS.filter((person) => person.id === id)[0];
  }

  createPerson(formValues: any) {
    const index = PERSONS.length - 1;
    let id = PERSONS[index].id + 1;
    formValues.id = id;

    PERSONS.push(formValues);
    this.subject.next(PERSONS);
    return id;
  }

  updatePerson(formValues: any) {
    let id = formValues.id;

    let index = PERSONS.findIndex((person) => person.id === id);
    PERSONS[index] = formValues;
    this.subject.next(PERSONS);
  }

  deletePerson(id: number) {
    let index = PERSONS.findIndex((person) => person.id === id);
    PERSONS.splice(index, 1);
    this.subject.next(PERSONS);
  }
}

const PERSONS: IPerson[] = [
  {
    id: 1,
    firstname: 'Gaina',
    lastname: 'Ionut',
    date: '2015-12-13',
    contacts: {
      number: '0751911116',
      type: 'Personal',
    },

    addresses: {
      location: {
        street: 'Str. Padurilor 12',
        city: 'Salcuta',
        country: 'Republica Moldova',
      },
      type: 'Acasă',
    },
    notes: '',
  },
  {
    id: 2,
    firstname: 'Ardei',
    lastname: 'AVasile',
    date: '2030-07-30',
    contacts: {
      number: '075532116',
      type: 'Personal',
    },

    addresses: {
      location: {
        street: 'Str. Padurilor 12',
        city: 'Salcuta',
        country: 'Republica Moldova',
      },
      type: 'Acasă',
    },
    notes: 'fdsaf',
  },
  {
    id: 3,
    firstname: 'Petrusca',
    lastname: 'Adrian',
    date: '',
    contacts: {
      number: '024341181',
      type: 'Acasă',
    },
    addresses: {
      location: {
        street: 'Str. Padurilor 12',
        city: 'Salcuța',
        country: 'Republica Moldova',
      },
      type: 'Acasă',
    },
    notes: 'fsafsfsaf',
  },
];
