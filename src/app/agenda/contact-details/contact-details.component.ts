import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgendaDataSource, IPerson } from 'src/app/shared';

@Component({
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  @Output() target  = new EventEmitter<number>();

  person: IPerson | undefined;
  subscription: Subscription | undefined;

  constructor(
    private agendaService: AgendaDataSource,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.person = this.agendaService.getPerson(id);
      this.target.emit(id);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
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
