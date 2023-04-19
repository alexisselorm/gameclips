import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  loginUser() {
    console.log(this.credentials);
  }
}
