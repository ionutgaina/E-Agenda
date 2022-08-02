import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaFormattingService {

  constructor() { }
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
}
