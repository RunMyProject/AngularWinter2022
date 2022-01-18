/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { TestBed } from '@angular/core/testing';

import { AuthcanactivateService } from './authcanactivate.service';

describe('AuthcanactivateService', () => {
  let service: AuthcanactivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthcanactivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
