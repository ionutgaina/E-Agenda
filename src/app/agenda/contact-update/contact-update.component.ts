import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPerson } from 'src/app/shared/agenda-data.model';
import { AgendaDataSource } from 'src/app/shared/agenda-data.service';
import { AgendaFormsService } from 'src/app/shared/agenda-forms.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './contact-update.component.html',
  styles: [],
})
export class ContactUpdateComponent implements OnInit {
  subscription: Subscription | undefined;
  personForm: any;
  person: IPerson | undefined;

  contactsList = ['Personal', 'Serviciu', 'Acasă'];
  addressesList = ['Serviciu', 'Acasă'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agendaService: AgendaDataSource,
    private agendaFormsService: AgendaFormsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.person = this.agendaService.getPerson(id);

      this.personForm = this.agendaFormsService.personForm(this.person);
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  updatePerson() {
    const formValues = this.personForm.value;
    formValues.id = this.person?.id;
    this.agendaService.updatePerson(formValues);

    Swal.fire({
      icon: 'success',
      title: 'Ai actualizat cu succes contactul',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.router.navigate(['/agenda', this.person?.id]);
    });
  }

  cancelUpdate() {
    Swal.fire({
      title:
        'Datele introduse nu vor fi modificate. Ești sigur că vrei să ieși?',
      showDenyButton: true,
      confirmButtonText: 'Da',
      confirmButtonColor: 'red',
      denyButtonText: 'Nu',
      denyButtonColor: 'green',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/agenda/' + this.person?.id]);
      }
    });
  }
}
