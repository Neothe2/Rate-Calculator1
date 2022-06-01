import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[];
  currentUser: User;

  constructor(public fs: RecordService, public auth: AuthService) {
    this.fs
      .getRecordList()
      .valueChanges()
      .subscribe((data) => (this.users = data));
    this.auth.user$.subscribe((data) => {
      this.currentUser = data;
    });
  }

  toggle(user: User) {
    if (user.roles.admin == false && this.currentUser.uid != user.uid) {
      this.fs.updateRecord(user.uid, {
        roles: { admin: true, normal: true },
      });
    } else if (user.roles.admin == true && this.currentUser.uid != user.uid) {
      this.fs.updateRecord(user.uid, { roles: { admin: false, normal: true } });
    } else {
      console.error('Cannot change the access-rights for current user');
    }
  }

  ngOnInit(): void {}
}
