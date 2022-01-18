/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './services/authentication/authentication.service';
import { User } from './datamodel/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularWinter2022';
  currentUser!: User | null;
  users: User[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) {
        if(this.authenticationService.currentUser!=null) {
          this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
        } else {
                this.deleteAllUsers();
                localStorage.clear();
        }
  }

  ngOnInit(): void {
    var mycountStorage = localStorage.getItem("mycount");
    var mycount = 0
    if(mycountStorage==null) {
      localStorage.setItem("mycount", mycount + "");
    } else {
             mycount=Number(mycountStorage)
             if(mycount>0) this.logout()
             mycount++
             localStorage.setItem("mycount", mycount + "");
    }
  }

  logout() {
    this.authenticationService.logout();
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      console.log("deleted id " + id)
    });
  }

  deleteAllUsers() {

    console.log("Refresh deleting all users")

    if(this.currentUser!=null)
     this.userService.getAll().pipe(first()).subscribe(users => {
         this.users = users;
     });

    for (let user of this.users) {
      this.deleteUser(user.id)
    }
  }

}
