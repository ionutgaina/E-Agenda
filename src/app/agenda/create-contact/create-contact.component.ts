import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaDataSource, IPerson } from 'src/app/shared';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent implements OnInit {
  personForm: any;
  contactsList = ['Personal', 'Serviciu', 'Acasă'];
  addressesList = ['Serviciu', 'Acasă'];

  constructor(
    private router: Router,
    private agendaService: AgendaDataSource,
    private formBuilder: FormBuilder
  ) {
    this.personForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.pattern("^[a-zA-Z'-]+$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      lastname: [
        '',
        [
          Validators.pattern("^[a-z'-]+$"),
          Validators.maxLength(15),
          Validators.required,
        ],
      ],
      date: [''],
      contacts: this.formBuilder.group({
        number: ['', [Validators.pattern('^[+ 0-9]{9,12}$')]],
        type: [''],
      }),
      addresses: this.formBuilder.group({
        location: this.formBuilder.group({
          street: ['', [Validators.pattern("^[a-zA-Z'-]+$")]],
          city: ['', [Validators.pattern('^[a-zA-Z-]+$')]],
          country: ['', [Validators.pattern('^[a-zA-Z]+$')]],
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

  get country() {
    return this.personForm.get('addresses').get('location').get('country');
  }
  get city() {
    return this.personForm.get('addresses').get('location').get('city');
  }
  get street() {
    return this.personForm.get('addresses').get('location').get('street');
  }

  ngOnInit(): void {}

  savePerson() {
    const formValues = this.personForm.value;

    let id = this.agendaService.createPerson(formValues);
    Swal.fire({
      icon: 'success',
      title: 'Ai creat cu succes contactul',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.router.navigate(['/agenda', id]);
    });
  }
  cancelCreate() {
    Swal.fire({
      title: 'Datele introduse nu vor fi salvate',
      showDenyButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: 'red',
      denyButtonText: 'Renunță',
      denyButtonColor: 'green',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/agenda']);
      }
    });
  }
}
