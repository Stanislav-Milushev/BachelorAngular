import {
    AbstractControl,
    ValidatorFn,
    FormControl,
    FormGroup
  } from '@angular/forms';
  
    export function MustMatch(password: string, confirmPassword: string): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: any } | null => {
          const passwordControl = formGroup.get(password);
          const confirmPasswordControl = formGroup.get(confirmPassword);
    
          if (!passwordControl || !confirmPasswordControl) {
            return null;
          }
    
          if (
            confirmPasswordControl.errors &&
            !confirmPasswordControl.errors.passwordMismatch
          ) {
            return null;
          }
    
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
          } else {
            confirmPasswordControl.setErrors(null);
            return null;
          }
        };
      }