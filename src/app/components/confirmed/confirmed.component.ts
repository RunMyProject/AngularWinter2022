/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit {

  email! : string
  password! : string

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    const password = this.route.snapshot.paramMap.get('password');
    this.email = email!=null ? email : ""
    this.password = password!=null ? password : ""
  }

}
