/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../datamodel/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public static EMPTY = new Object();

  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;

  constructor(private http: HttpClient) {
    let userStorage = localStorage.getItem('currentUser')
    if(userStorage!=null) {
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(userStorage));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject?.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { email, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            //
            if (user[0] && user[0].token
              ) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //
                localStorage.setItem('currentUser', JSON.stringify(user[0]));
                this.currentUserSubject = new BehaviorSubject<User | null>(user[0]);
                this.currentUser = this.currentUserSubject.asObservable();
                if(this.currentUserSubject!=null) {
                  this.currentUserSubject.next(user[0]);
                }
            }
            return user[0];
        }));
  }

  logout() {
     // remove user from local storage to log user out
     //
     if(this.currentUserSubject!=null) {
        // localStorage.clear();
        localStorage.removeItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(null);
     }
  }

}
