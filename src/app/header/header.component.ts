import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {

  constructor(
      public userService: UserService,
      private router: Router,
      public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  redirectToProfile(): void {
    this.router.navigate([`profile/${this.userService.user?.id}`]);
  }

  goToTab(url: string): void {
    this.router.navigate([url]);
}
}
