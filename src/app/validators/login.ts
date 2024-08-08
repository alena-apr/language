import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createLoginValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const isAdmin = /admin/.test(value);

    const loginValid = !isAdmin;
    return !loginValid ? { loginStrength: true } : null;
  };
}
