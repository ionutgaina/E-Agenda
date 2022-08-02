export interface IPerson {
  id: number;
  firstname: string;
  lastname: string;
  date: string;
  contacts: IContact[];
  addresses: IAddress[];
  notes: string;
}

export interface IContact {
  number: string;
  type: 'Personal' | 'Serviciu' | 'Acasă';
}

export interface IAddress {
  location: ILocation;
  type: 'Serviciu' | 'Acasă';
}

export interface ILocation {
  street: string;
  city: string;
  country: string;
}
