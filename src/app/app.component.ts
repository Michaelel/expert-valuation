import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'expert-valuation-ui';

  showHeader: boolean;

  constructor(private router: Router) {
    this.router.events.pipe(
        // untilDestroyed(this),
        // @ts-ignore
        filter(res => res.url),
        // @ts-ignore
    ).subscribe(res => this.showHeader = !res.url.includes('auth'));
  }

}
