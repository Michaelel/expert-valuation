import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { Router } from '@angular/router';
import { ExpertService } from '../../expert.service';
import { defineState } from '../../../../environments/pure-functions';

@Component({
  selector: 'app-expert-list',
  templateUrl: './expert-list.component.html',
  styleUrls: ['./expert-list.component.sass']
})
export class ExpertListComponent implements OnInit {

  state = ComponentState.Loading;

  displayedColumns = ['id', 'name', 'email', 'phone'];

  constructor(
      public dataService: ExpertService,
      private router: Router,
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

  goExpert(expertId: number): void {
    this.router.navigate([`expert-list/expert/${expertId}`]);
  }

}
