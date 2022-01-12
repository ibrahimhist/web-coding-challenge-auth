import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newMenuList: any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.newMenuList = [
      {
        text: 'Dashboard',
        children: [{ icon: 'cat', text: 'Vote Cat', link: '/vote-cat' }],
      },
    ];
  }

  onClickMenu(item: any): void {
    if (item?.link) {
      this.router.navigate([item.link]);
    }
  }
}
