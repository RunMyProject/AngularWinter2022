/*
  *************************************
  * AngularWinter2022                 *
  * for Angular 13.1                  *
  * @Jan / 2022 - by Edoardo Sabatini *
  *************************************
*/
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { User } from 'src/app/datamodel/user/user';

// array in local storage for registered users
//
let users : User[] = [];

const mytoken = 'mock-jwt-token'

@Injectable({
  providedIn: 'root'
})
export class MockdatahttpinterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) {
      let usersStorage = localStorage.getItem('users')
      if(usersStorage!=null) {
        users = JSON.parse(usersStorage);
      }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const { url, method, headers, body } = request;

      // wrap in delayed observable to simulate server api call
      //
      // call materialize and dematerialize to ensure delay even
      // if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      // .pipe(mergeMap(handleRoute))
      //
      // call materialize and dematerialize to ensure delay even
      // if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      //

      // console.log('Loaded from json : ' + request.url);

      return handleRoute()
          .pipe(materialize())
          .pipe(delay(500))
          .pipe(dematerialize());

      // generate UID
      //
      function genId(): number {
            return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
      }

      function handleRoute() {

        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users/register') && method === 'POST':
                return register();
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            case url.match(/\/users\/\d+$/) && method === 'DELETE':
                return deleteUser();
            default:
                // pass through any requests not handled above
                //
                return next.handle(request);
        } // switch
      }

      // authenticate
      //
      function authenticate() {

        const { email, password } = body;
        const user = users.find(x => x.email === email && x.password === password);

        if (!user) return error('Email o password è incorretta!');

        let tmpUsers: User[] = [{
          id: user.id,
          email: user.email,
          password: user.password,
          token: mytoken
        }];

        return ok(tmpUsers)
      }

      // register
      //
      function register() {
        const user = body

        if (users.find(x => x.email === user.email)) {
            return error('Email "' + user.email + '" è stata memorizzata!')
        }

        user.id = genId();

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return okUser(user)
      }

      // retrieve users
      //
      function getUsers() {
          if (!isLoggedIn()) return unauthorized();
          return ok(users);
      }

      // delete an user
      //
      function deleteUser() {
          if (!isLoggedIn()) return unauthorized();

          users = users.filter(x => x.id !== idFromUrl());
          localStorage.setItem('users', JSON.stringify(users));
          return ok();
      }

        // ok status
        //
        function okUser(body?: User | undefined) {
          return of(new HttpResponse({ status: 200, body }))
        }

        // ok status
        //
        function ok(body?: User[] | undefined) {
          return of(new HttpResponse({ status: 200, body }))
        }

        // error status
        //
        function error(message: string) {
            return throwError({ error: { message } });
        }

        // unauthorized
        //
        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Non autorizzato!' } });
        }

        // isLoggedIn
        //
        function isLoggedIn() {
            return headers.get('Authorization') === 'Mytoken ' + mytoken;
        }

        // idFromUrl
        //
        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

  } // interceptor

} // class

export const mockdataBackendProvider = {

  // use mock data backend in place of Http service for backend-less development
  //
  provide: HTTP_INTERCEPTORS,
  useClass: MockdatahttpinterceptorService,
  multi: true
};
