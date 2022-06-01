import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  user$: Observable<User>;

  constructor(auth: AuthService) {
    this.user$ = auth.user$;
  }

  ngOnInit(): void {}
}
