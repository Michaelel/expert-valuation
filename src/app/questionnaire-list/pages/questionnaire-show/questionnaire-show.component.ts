import { Component, OnInit } from '@angular/core';
import { ExpertInterface } from '../../../shared/interfaces/expert.interface';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { defineState } from '../../../../environments/pure-functions';
import { UserService } from '../../../shared/services/user.service';
import { QuestionnairePassService } from '../../../questionnaire-pass/questionnaire-pass.service';
import { QuestionnaireInterface } from '../../../shared/interfaces/questionnaire.interface';

@Component({
  selector: 'app-questionnaire-show',
  templateUrl: './questionnaire-show.component.html',
  styleUrls: ['./questionnaire-show.component.sass'],
})
export class QuestionnaireShowComponent implements OnInit {

  state = ComponentState.Loading;

  expert: ExpertInterface;

  questionnaire: QuestionnaireInterface;

  constructor(
      private userService: UserService,
      public passService: QuestionnairePassService,
  ) { }

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  getInitedExpert(): ExpertInterface {
    return {
      expertInfo: { id: this.userService.user.id },
      answers: this.questionnaire.questions.map(question => ({
        questionId: question.id,
        answerId: null,
      })),
    };
  }

  getQuestionnaire = (): void => {
    this.state = ComponentState.Loading;
    this.passService.getQuestionnaire().subscribe(
        res => {
          this.state = defineState(res.questions);
          this.questionnaire = res;
          this.expert = this.getInitedExpert();
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

}
