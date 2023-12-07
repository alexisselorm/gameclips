import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 } from 'uuid';
import { last, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService
  ) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
  }

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
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
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
    this.form.disable();
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait... Your clip is being uploaded';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFilename = v4();
    const clipPath = `clips/${clipFilename}.mp4`;

    let uploadedFile = this.storage.upload(clipPath, this.file);
    let clipRef = this.storage.ref(clipPath);
    this.showAlert = true;

    uploadedFile.percentageChanges().subscribe((progress) => {
      this.percentage = (progress as number) / 100;
    });

    uploadedFile
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: (url) => {
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value as string,
            fileName: `${clipFilename}.mp4`,
            url,
          };

          this.clipsService.createClip(clip);
          console.log(clip);
          this.alertColor = 'green';
          this.alertMsg = 'Successfully uploaded';
          this.showPercentage = false;
        },
        error: (error) => {
          this.form.enable();
          this.alertColor = 'red';
          this.alertMsg = 'Failed to upload';
          this.inSubmission = false;
          this.showPercentage = false;
          console.log(error);
        },
        complete: () => {},
      });
    // uploadedFile.then((res) =>
    //   res.ref.getDownloadURL().then((url) => {
    //     console.log(url);
    //   })
    // );
  }
}
