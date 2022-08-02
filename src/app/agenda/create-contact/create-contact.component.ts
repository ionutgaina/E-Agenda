import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaDataSource } from 'src/app/shared/agenda-data.service';
import { AgendaFormsService } from 'src/app/shared/agenda-forms.service';
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
    private agendaFormsService: AgendaFormsService
  ) {
    this.personForm = this.agendaFormsService.personForm({});
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
