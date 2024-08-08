import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const hasCorrectPattern = /.+@.+\..+/i.test(value);

    const emailValid = hasCorrectPattern;
    return !emailValid ? { emailStrength: true } : null;
  };
}
