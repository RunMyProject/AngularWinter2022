/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from 'src/app/datamodel/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser!: User | null;
  currentUserSubscription!: Subscription;
  users: User[] = [];

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router
              ) {
                if(this.authenticationService.currentUser!=null)
                  this.currentUserSubscription = this.authenticationService
                  .currentUser.subscribe(user => {
                      this.currentUser = user;
                  });
               else {
                    // redirect to / if logout
                    //
                    this.router.navigate(['/']);
               }
              }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //
    if(this.currentUserSubscription!=null)
      this.currentUserSubscription.unsubscribe();
  }

  private deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    if(this.currentUser!=null)
     this.userService.getAll().pipe(first()).subscribe(users => {
         this.users = users;
     });
 }

}
