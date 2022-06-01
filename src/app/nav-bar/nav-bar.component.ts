import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: User;
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit(): void {}

  toggle() {
    var element = document.getElementById('nav');
    element.classList.toggle('collapsible--expanded');
  }
}
