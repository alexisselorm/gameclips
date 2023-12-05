import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  form: FormGroup = new FormGroup({
    thumbnail: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    title: new FormControl('', Validators.required),
  });

  isDragover = false;
  isDropped = false;
  file: File | null = null;
  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) as File;
    if (!this.file || this.file.type != 'video/mp4') {
      alert('Please select a video file only');
      return;
    }

    this.form.setValue({
      thumbnail: 'Something',
      title: this.file.name.replace(/\.[^/.]+$/, ''),
    });
    console.log(this.form.controls['title'].value);
    this.isDropped = true;

    //Upload and store file
    console.log(this.file);
  }

  uploadFile() {
    console.log('File Uploaded');
  }
}
