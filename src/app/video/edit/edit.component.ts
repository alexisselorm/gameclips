import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  inSubmission: boolean = false;
  showAlert: boolean = false;
  alertColor = 'blue';
  alertMsg = 'Please wait...updating clip';

  constructor(
    private modalService: ModalService,
    private clipService: ClipService
  ) {}

  clipID = new FormControl('', { nonNullable: true });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  editForm: FormGroup = new FormGroup({
    title: this.title,
    id: this.clipID,
  });

  ngOnInit(): void {
    this.modalService.register('editClip');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('editClip');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return;
    }
    this.clipID.setValue(this.activeClip.docID!);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait...Updating clip';
    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = 'Error updating clip. Try again later';
      this.alertColor = 'red';
      return;
    }
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success';
  }
}
