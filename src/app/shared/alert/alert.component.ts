import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() colour: string = 'blue';

  get bgColor() {
    return `bg-${this.colour}-400`;
  }
}
