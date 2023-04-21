import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AngularFireAuth) {}

  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = "Please wait! You're being logged in";
  alertColor = 'blue';
  isProcessing = false;

  async loginUser() {
    this.showAlert = true;
    this.alertMsg = "Please wait! You're being logged in";
    this.alertColor = 'blue';
    this.isProcessing = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.log(error);
      this.showAlert = true;
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      this.isProcessing = false;
      return;
    }

    this.alertMsg = 'You are logged in';
    this.alertColor = 'green';
  }
}
