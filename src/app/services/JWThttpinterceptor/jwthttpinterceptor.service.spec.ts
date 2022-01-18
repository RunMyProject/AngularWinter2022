/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { TestBed } from '@angular/core/testing';

import { JWThttpinterceptorService } from './jwthttpinterceptor.service';

describe('JWThttpinterceptorService', () => {
  let service: JWThttpinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWThttpinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
