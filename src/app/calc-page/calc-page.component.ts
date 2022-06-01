import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-calc-page',
  templateUrl: './calc-page.component.html',
  styleUrls: ['./calc-page.component.css'],
})
export class CalcPageComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
