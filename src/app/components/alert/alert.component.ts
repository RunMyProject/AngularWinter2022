/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
    .subscribe(message => {
        switch (message && message.type) {
            case 'success':
                message.cssClass = 'alert alert-success';
                break;
            case 'error':
                message.cssClass = 'alert alert-danger';
                break;
        }
        this.message = message;
    });
  }

  ngOnDestroy() {
    if(this.subscription!=undefined) this.subscription.unsubscribe();
  }
}
