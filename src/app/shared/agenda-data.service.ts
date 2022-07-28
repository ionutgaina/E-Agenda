import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
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

  createPerson(formValues: IPerson) {}

  updatePerson() {}

  deletePerson(id: number) {
    let index = PERSONS.findIndex((person) => person.id === id);
    PERSONS.splice(index);
    this.subject.next(PERSONS);
  }

  // TO DO sortare ascendenta ( nume, prenume, varsta ,data nasterii)
  // Sortarea e grupata dupa prima litera , varsta , data nasterii
  // TO DO filtrare in timp real dupa nume, prenume

  searchPersons(searchTerm: string) {
    const term = searchTerm.toLocaleLowerCase();

    const copy_PERSONS = JSON.parse(JSON.stringify(PERSONS));
    console.log(term);
    const results = copy_PERSONS.filter((person: IPerson) => {
      return (
        person.firstname.toLocaleLowerCase().indexOf(term) > -1 ||
        person.lastname.toLocaleLowerCase().includes(term)
      );
    });
    console.log(results);
    return of(results);
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
    id: 2,
    firstname: 'Gaina2',
    lastname: 'Ionut2',
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
