import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the MailServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MailServiceProvider {

  constructor(public http: Http) {
    console.log('Hello MailServiceProvider Provider');
  }

  getUsers() {
    return this.http.get('https://randomuser.me/api/?results=5')
    .map(res => res.json())
    .toPromise();
  }

  getPlaceById(id){
    return this.http.get('http://192.168.99.102:3080/invites/get-place.php?id='+id)
    .map(res => res.json())
    .toPromise();
  }

}
