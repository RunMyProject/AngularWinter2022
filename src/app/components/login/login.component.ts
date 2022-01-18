/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variable - default false
  //
  show: boolean = false;

  loginForm: FormGroup | undefined;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
        // redirect to dashboard if already logged in
        //
        if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/dashboard']);
        }
  }

  ngOnInit(): void {

    // get query params after comfirmation of registration
    //
    const parEmail = this.route.snapshot.paramMap.get('email');
    const parPassword = this.route.snapshot.paramMap.get('password');

    this.loginForm = this.formBuilder.group({
      email: [parEmail, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: [parPassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]]
    });
  }

  // convenience getter for easy access to form fields
  //
  get f() {
    return this.loginForm?.controls;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    //
    if (this.loginForm?.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService
        .login(this.loginForm?.controls['email'].value,
                this.loginForm?.controls['password'].value)
        .pipe(first())
        .subscribe({
          error: (e) => {
            this.alertService.error(e)
            this.loading = false;
          },
          complete: () => {
            this.refresh()
//            this.router.navigateByUrl("/");
//            this.router.navigate(["/"])
           }
          }
        );
  }

  // click event function toggle
  //
  password() {
    this.show = !this.show;
  }

  refresh(): void {
    window.location.reload();
  }
}
