import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_PHONE_NUMBER_PATTERN } from '../../environments/constants';
import { ProfileService } from './profile.service';
import { ComponentState } from '../shared/modules/component-state/component-state.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {

  state = ComponentState.Loading;

  profileForm = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [ Validators.required, Validators.pattern(DEFAULT_PHONE_NUMBER_PATTERN) ]],
  });

  constructor(
      private fb: FormBuilder,
      private dataService: ProfileService,
      private route: ActivatedRoute,
  ) {
    this.dataService.profileId = +this.route.snapshot.paramMap.get('profileId');
  }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  getProfileInfo = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getProfileInfo().subscribe(
        res => {
          this.state = ComponentState.Success;
          this.dataService.profileInfo = res;
          this.profileForm.patchValue(res);
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  editProfileInfo(): void {
    this.state = ComponentState.Loading;
    this.dataService.editProfileInfo({ ...this.profileForm.value, id: this.dataService.profileId }).subscribe(
        res => {
          this.state = ComponentState.Success;
          this.dataService.profileInfo = res;
          this.profileForm.patchValue(res);
          this.profileForm.markAsPristine();
        },
        e => {
          alert(e);
        },
    );
  }

  cancel(): void {
    this.profileForm.patchValue(this.dataService.profileInfo);
    this.profileForm.markAsPristine();
  }

}
