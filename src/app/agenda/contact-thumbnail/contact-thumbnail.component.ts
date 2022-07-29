import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPerson } from 'src/app/shared';

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
