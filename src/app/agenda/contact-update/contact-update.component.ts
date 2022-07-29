import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgendaDataSource, IPerson } from 'src/app/shared';
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
    private formBuilder: FormBuilder
  ) {
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


  ngOnInit(): void {
   this.subscription = this.route.params.subscribe((params) => {
      const id = +params['id'];
      console.log(id)
      this.person = this.agendaService.getPerson(id);
      this.personForm = this.formBuilder.group({
        firstname: [this.person.firstname, [Validators.pattern("^[a-zA-Z'-]+$"), Validators.maxLength(15), Validators.required]],
        lastname: [this.person.lastname, [Validators.pattern("^[a-zA-Z'-]+$"), Validators.maxLength(15), Validators.required]],
        date: [this.formatDate(this.person.date)],
        contacts: this.formBuilder.group({
          number: [this.person.contacts.number, [Validators.pattern("^[+ 0-9]{9,12}$")]],
          type: [this.person.contacts.type],
        }),
        addresses: this.formBuilder.group({
          location: this.formBuilder.group({
            street: [this.person.addresses.location.street, [Validators.pattern("^[a-z .0-9A-Z'-]+$")]],
            city: [this.person.addresses.location.city, [Validators.pattern("^[a-z A-Z-]+$")]],
            country: [this.person.addresses.location.country, [Validators.pattern("^[a-z A-Z]+$")]],
          }),
          type: [this.person.addresses.type],
        }),
        notes: [this.person.notes],
      });
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  formatDate(date: Date)
  {
    return this.agendaService.formatDate(date)
  }

  updatePerson() {
    const formValues = this.personForm.value;
    console.log(formValues);
    formValues.id = this.person?.id
    this.agendaService.updatePerson(formValues);
    Swal.fire({
      icon: 'success',
      title: 'Ai actualizat cu succes contactul',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
        this.router.navigate(['/agenda', this.person?.id]);
    })
  }
  cancelUpdate() {
    Swal.fire({
      title: 'Datele introduse nu vor fi modificate. Ești sigur că vrei să ieși?',
      showDenyButton: true,
      confirmButtonText: 'Da',
      confirmButtonColor: 'red',
      denyButtonText: 'Nu',
      denyButtonColor: 'green'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/agenda/' + this.person?.id]);
      }
    })
  }

}
