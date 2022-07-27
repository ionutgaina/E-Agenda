import { Injectable } from '@angular/core';
import { IPerson } from './agenda-data.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaDataSource {
  constructor() {}

  getList() {}

  getPerson() {}

  createPerson() {}

  updatePerson() {}

  deletePerson() {}
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
    id: 1,
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
  }
];
