import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationMenu } from '@app/shared/models/navigation-menu.model';
import { AuthService } from '@app/shared/services/auth.service';
import { UserService } from '@app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  navigationMenuList?: NavigationMenu[];
  logoUrl = '/';

  isLoggedInSubs: Subscription;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.navigationMenuList = [
      { link: '/dashboard', text: 'Dashboard' },
      { link: '/vote-cat', text: 'Vote Cat' },
    ];

    this.isLoggedInSubs = this.authService
      .getisLoggedInAsObservable()
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  onClickLogout(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubs) this.isLoggedInSubs.unsubscribe();
  }
}
