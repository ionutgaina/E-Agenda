import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from 'src/app/shared';

@Component({
  selector: 'contact-thumbnail',
  templateUrl: './contact-thumbnail.component.html',
  styleUrls: ['./contact-thumbnail.component.css'],
})
export class ContactThumbnailComponent implements OnInit {
  @Input() person: IPerson | undefined;

  constructor() {}

  ngOnInit(): void {
  }

}
