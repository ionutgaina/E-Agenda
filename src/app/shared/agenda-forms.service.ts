import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AgendaFormsService {
  constructor(private formBuilder: FormBuilder) {}

  personForm(person: any) {
    let myForm: any = this.formBuilder.group({
      firstname: [
        person.firstname || '',
        [
          Validators.pattern("^[a-zA-Z'-]+$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      lastname: [
        person.lastname || '',
        [
          Validators.pattern("^[a-zA-Z'-]+$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      date: [person.date || ''],
      contacts: this.formBuilder.array([]),
      addresses: this.formBuilder.array([]),
      notes: [person.notes || ''],
    });

    for (let contact of person.contacts) {
      let contactForm = this.contactForm(contact.number, contact.type);
      myForm.controls['contacts'].push(contactForm);
    }

    for (let address of person.addresses) {
      let addressForm = this.addressForm(
        address.location?.street,
        address.location?.city,
        address.location?.country,
        address.type
      );
      myForm.controls['addresses'].push(addressForm);
    }
    return myForm;
  }

  addressForm(street: string, city: string, country: string, type: string) {
    return this.formBuilder.group({
      location: this.formBuilder.group({
        street: [street, [Validators.pattern("^[a-z .0-9A-Z'-]+$")]],
        city: [city, [Validators.pattern('^[a-z A-Z-]+$')]],
        country: [country, [Validators.pattern('^[a-z A-Z]+$')]],
      }),
      type: [type],
    });
  }

  contactForm(number: string, type: string) {
    return this.formBuilder.group({
      number: [number, [Validators.pattern('^[+ 0-9]+$')]],
      type: [type],
    });
  }
}
