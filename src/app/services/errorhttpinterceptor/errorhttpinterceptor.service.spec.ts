/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { TestBed } from '@angular/core/testing';

import { ErrorhttpinterceptorService } from './errorhttpinterceptor.service';

describe('ErrorhttpinterceptorService', () => {
  let service: ErrorhttpinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorhttpinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
