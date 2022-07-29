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
  contactsList = ['Personal', 'Serviciu', 'Acasă'];
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

  formatDate(date: Date)
  {
    return this.agendaService.formatDate(date)
  }

  updateHandler()
  {
    if(this.person)
    this.router.navigate(['/agenda/'+ this.person.id +'/update'])
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
