import { Component, OnInit } from '@angular/core';

import { NavigationMenu } from '@app/shared/models/navigation-menu.model';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navigationMenuList?: NavigationMenu[];
  logoUrl = '/';

  constructor(private authService: AuthService) {
    this.navigationMenuList = [
      { link: '/dashboard', text: 'Dashboard' },
      { link: '/vote-cat', text: 'Vote Cat' },
    ];
  }

  ngOnInit(): void {}

  navigateHome(): void {}

  onClickLogout(): void {
    this.authService.signOut();
  }
}
