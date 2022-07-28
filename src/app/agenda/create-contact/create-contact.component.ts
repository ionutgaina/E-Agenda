import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaDataSource, IPerson } from 'src/app/shared';

@Component({
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent implements OnInit {
  personForm: any;

  constructor(
    private router: Router,
    private agendaService: AgendaDataSource,
    private formBuilder: FormBuilder
  ) {
    this.personForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      date: [''],
      contacts: this.formBuilder.group({
        number: [''],
        type: [''],
      }),
      addresses: this.formBuilder.group({
        location: this.formBuilder.group({
          street: [''],
          city: [''],
          country: [''],
        }),
        type: [''],
      }),
      notes: [''],
    });
  }

  get firstname() {
    return this.personForm.get('firstname');
  }

  get lastname() {
    return this.personForm.get('lastname');
  }

  get date() {
    return this.personForm.get('date');
  }

  get number() {
    return this.personForm.get('contacts').get('number');
  }

  get type() {
    return this.personForm.get('contacts').get('type');
  }

  get country() {
    return this.personForm.get('locations').get('country');
  }

  get street() {
    return this.personForm.get('contacts').get('street');
  }

  get city() {
    return this.personForm.get('contacts').get('city');
  }

  get notes() {
    return this.personForm.get('date');
  }

  ngOnInit(): void {}

  savePerson() {
    const formValues = this.personForm.value;
    this.agendaService.createPerson(formValues);
    this.router.navigate(['/agenda']);
  }
  cancel() {
    this.router.navigate(['/agenda']);
  }
}
