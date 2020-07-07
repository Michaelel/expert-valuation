import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_PHONE_NUMBER_PATTERN } from '../../../../environments/constants';
import { RolesEnum } from '../../../shared/enums/roles.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {

  rolesEnum = RolesEnum;

  signupForm = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [ Validators.required, Validators.pattern(DEFAULT_PHONE_NUMBER_PATTERN) ]],
    password: [
       '',
       [
         Validators.required,
       ],
    ],
    passwordRepeat: [
       '',
       [
         Validators.required,
         this.validatorDifferentPasswords.bind(this),
       ],
    ],
    role: RolesEnum.User,
   });

  constructor(
      public authService: AuthService,
      private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  goToLogin(): void {
    this.authService.isLoginMode = true;
  }

  validatorDifferentPasswords(c: AbstractControl): { [error: string]: boolean } | null {
    if (!this.signupForm) {
      return null;
    }
    return this.passwordCtrl.value !== this.passwordRepeatCtrl.value ? {differentPasswords: true} : null;
  }

  get passwordCtrl(): AbstractControl {
    return this.signupForm.get('password');
  }

  get passwordRepeatCtrl(): AbstractControl {
    return this.signupForm.get('passwordRepeat');
  }

}
