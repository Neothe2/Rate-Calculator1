import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import auth = firebase.auth;
import { RecordService } from '../record.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fs: RecordService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    ) as Observable<User>;
  }
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    let users: User[];
    this.fs
      .getRecordList()
      .valueChanges()
      .subscribe((data) => (users = data));
    console.log(users);

    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
  async updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    let data;
    if (user) {
      data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        roles: {
          normal: true,
          admin: true,
        },
      };
    } else {
      data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        roles: {
          normal: true,
          admin: false,
        },
      };
    }
    return userRef.set(data, { merge: true });
  }

  canAccessCalcPage(user: User) {
    const allowed = ['normal', 'admin'];
    return this.checkAuthorization(user, allowed);
  }
  canAccessAdminPage(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]) {
    if (!user) return false;
    else
      for (const role of allowedRoles) {
        if (user.roles[role]) return true;
      }
    return false;
  }
}
