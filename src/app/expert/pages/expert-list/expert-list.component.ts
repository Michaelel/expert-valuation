import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { Router } from '@angular/router';
import { ExpertService } from '../../expert.service';
import { defineState } from '../../../../environments/pure-functions';
import { UserService } from '../../../shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionnairePassComponent } from '../../../questionnaire-pass/questionnaire-pass.component';
import { ApiService } from '../../../shared/services/api.service';
import { filter, switchMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { QuestionnaireDialogComponent } from '../../../questionnaire-list/components/questionnaire-dialog/questionnaire-dialog.component';

@Component({
  selector: 'app-expert-list',
  templateUrl: './expert-list.component.html',
  styleUrls: ['./expert-list.component.sass']
})
export class ExpertListComponent implements OnInit {

  state = ComponentState.Loading;

  displayedColumns = ['id', 'name', 'email', 'phone', 'action'];

  constructor(
      public dataService: ExpertService,
      public userService: UserService,
      private router: Router,
      private dialog: MatDialog,
      private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getExpertList();
  }

  getExpertList = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getExpertList().subscribe(
        res => {
          this.state = defineState(res);
          this.dataService.expertList = res;
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  verifyUser(expertId: number): void {
    this.api.getQuestionnaireExpertResult(1, expertId).pipe(
        switchMap(res => this.dialog.open(
              QuestionnaireDialogComponent,
              {
                data: {
                  verificationMode: true,
                  expert: res.expertsResults[0],
                },
              },
            ).afterClosed(),
        ),
        filter(res => !!res),
        switchMap(res => this.api.passVerificationProcess(expertId, res.isVerified)),
    ).subscribe();
  }

  goExpert(expertId: number): void {
    this.router.navigate([`expert-list/expert/${expertId}`]);
  }

}
