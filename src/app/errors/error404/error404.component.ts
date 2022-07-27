import { Component } from '@angular/core';

@Component({
  template: `<h1 class="errorMessage">
    404'd<br /><a [routerLink]="'/agenda'">Go Home</a>
  </h1>`,
  styles: [
    `
      .errorMessage {
        margin-top: 150px;
        font-size: 170px;
        text-align: center;
      }
      .errorMessage > a {
        text-decoration: none;
        color: black;
      }
      .errorMessage > a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class Error404Component {
  constructor() {}
}
