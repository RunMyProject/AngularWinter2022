/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { TestBed } from '@angular/core/testing';

import { MockdatahttpinterceptorService } from './mockdatahttpinterceptor.service';

describe('MockdatahttpinterceptorService', () => {
  let service: MockdatahttpinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockdatahttpinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
