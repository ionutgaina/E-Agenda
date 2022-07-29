import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgendaDataSource, IPerson } from 'src/app/shared';

@Component({
  templateUrl: './contact-details.component.html',
  styles: [],
})
export class ContactDetailsComponent implements OnInit {
  person: IPerson | undefined;
  subscription: Subscription | undefined;
  isDisabled = true;

  personForm: any;
  contactsList = ['Necunoscut','Personal', 'Serviciu', 'Acasă'];
  addressesList = ['Necunoscut','Serviciu', 'Acasă'];

  constructor(
    private agendaService: AgendaDataSource,
    private route: ActivatedRoute,
    private router: Router,
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

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.person = this.agendaService.getPerson(id);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  updateState() {
    this.isDisabled = false;
  }

  updatePerson() {
    console.log(this.personForm.value);
  }

  cancelUpdate() {
    this.isDisabled = true;
  }

  includeContacts(contact: string)
  {
    return this.contactsList.includes(contact)
  }

  // formating data for input type="date"
  formatDate(date: Date) {
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    if (date)
      return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-');
    else return null;
  }

  removeContact(id: number) {
    if (
      confirm(
        `Ești sigur că dorești să ștergi contactul ${this.person?.firstname} ${this.person?.lastname}`
      )
    ) {
      this.agendaService.deletePerson(id);
      this.router.navigate(['/agenda']);
    }
  }
}
