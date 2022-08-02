import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from 'src/app/shared/agenda-data.model';

@Component({
  selector: 'contact-thumbnail',
  templateUrl: './contact-thumbnail.component.html',
  styles: [],
})
export class ContactThumbnailComponent implements OnInit {
  @Input() person: IPerson | undefined;

  constructor() {}

  ngOnInit(): void {}
}
