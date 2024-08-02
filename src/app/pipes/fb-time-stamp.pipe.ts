import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'fbTimeStamp',
})
export class FbTimeStampPipe implements PipeTransform {
  /**
   *
   */
  constructor(private datePipe: DatePipe) {}
  transform(value: firebase.firestore.FieldValue) {
    const date = (value as firebase.firestore.Timestamp).toDate();
    return this.datePipe.transform(date, 'mediumDate');
  }
}
