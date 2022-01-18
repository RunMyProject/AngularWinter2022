/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
