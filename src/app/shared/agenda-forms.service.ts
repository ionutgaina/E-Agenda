import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IPerson } from './agenda-data.model';
import { AgendaFormattingService } from './agenda-formatting.service';

@Injectable({
  providedIn: 'root',
})
export class AgendaFormsService {
  constructor(
    private formBuilder: FormBuilder,
    private agendaFormatiing: AgendaFormattingService
  ) {}

  personForm(person: any) {
    return this.formBuilder.group({
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
      date: [this.agendaFormatiing.formatDate(person.date) || ''],
      contacts: this.formBuilder.group({
        number: [
          person.contacts?.number || '',
          [Validators.pattern('^[+ 0-9]{9,12}$')],
        ],
        type: [person.contacts?.type || ''],
      }),
      addresses: this.formBuilder.group({
        location: this.formBuilder.group({
          street: [
            person.addresses?.location?.street || '',
            [Validators.pattern("^[a-z .0-9A-Z'-]+$")],
          ],
          city: [
            person.addresses?.location?.city || '',
            [Validators.pattern('^[a-z A-Z-]+$')],
          ],
          country: [
            person.addresses?.location?.country || '',
            [Validators.pattern('^[a-z A-Z]+$')],
          ],
        }),
        type: [person.addresses?.type || ''],
      }),
      notes: [person.notes || ''],
    });
  }
}
