import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  constructor(private storage: AngularFireStorage) {}

  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  form: FormGroup = new FormGroup({
    title: this.title,
  });

  isDragover = false;
  isDropped = false;

  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait...Your clip is being uploaded';
  inSubmission = false;
  file: File | null = null;
  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) as File;
    if (!this.file || this.file.type != 'video/mp4') {
      alert('Please select a video file only');
      return;
    }

    this.form.setValue({
      title: this.file.name.replace(/\.[^/.]+$/, ''),
    });
    console.log(this.form.controls['title'].value);
    this.isDropped = true;

    //Upload and store file
    console.log(this.file);
  }

  uploadFile() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait... Your clip is being uploaded';
    this.inSubmission = true;

    const clipFilename = v4();
    const clipPath = `clips/${clipFilename}`;

    let uploadedFile = this.storage.upload(clipPath, this.file);
    this.showAlert = true;
    alert('File uploaded successfully');

    // uploadedFile.then((res) =>
    //   res.ref.getDownloadURL().then((url) => {
    //     console.log(url);
    //   })
    // );
  }
}
