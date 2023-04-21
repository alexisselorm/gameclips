import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
export class RegisterValidators {
  test = 5;
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get('password');
      const matchingControl = group.get('confirm_password');

      if (!control || !matchingControl) {
        return { controlNotFound: false };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      return error;
    };
  }
}
