/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
        // redirect to home if already logged in
        //
        if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]]
      });
  }

  // convenience getter for easy access to form fields
  //
  get f() {
      return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    //
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.registerForm.value['password'] =  this.generatePassword(8)

    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
              // this.alertService.success('Registrazione avvenuta con successo!', true);
              this.router.navigate(['/confirmed', {email: data.email, password: data.password}]);
          },
          error: (e) => {
            this.alertService.error(e)
            this.loading = false;
          }
        })
    }

    private generatePassword(passwordLength : number) {
      var numberChars = "0123456789";
      var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var lowerChars = "abcdefghijklmnopqrstuvwxyz";
      var allChars = numberChars + upperChars + lowerChars;
      var randPasswordArray = Array(passwordLength);
      randPasswordArray[0] = numberChars;
      randPasswordArray[1] = upperChars;
      randPasswordArray[2] = lowerChars;
      randPasswordArray = randPasswordArray.fill(allChars, 3);
      return this.shuffleArray(randPasswordArray
        .map(function(x) {
          return x[Math.floor(Math.random() * x.length)]
        })).join('');
    }

    private shuffleArray(array : string[]) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
}
