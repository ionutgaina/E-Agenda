import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgendaDataSource, IPerson } from 'src/app/shared';
import Swal from 'sweetalert2';

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
  addressesList = ['Necunoscut', 'Serviciu', 'Acasă'];

  constructor(
    private agendaService: AgendaDataSource,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.person = this.agendaService.getPerson(id);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  formatDate(date: Date) {
    return this.agendaService.formatDate(date);
  }

  updateHandler() {
    if (this.person)
      this.router.navigate(['/agenda/' + this.person.id + '/update']);
  }
  removeContact(id: number) {
    Swal.fire({
      title: `Ești sigur că dorești să ștergi contactul ${this.person?.firstname} ${this.person?.lastname}`,
      showDenyButton: true,
      confirmButtonText: 'Da',
      confirmButtonColor: 'red',
      denyButtonText: 'Renunță',
      denyButtonColor: 'green',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService.deletePerson(id);
        this.router.navigate(['/agenda']);
      }
    });
  }
}
