import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  getusertoken: Observable<any>;
  user_inf: Observable<any>;
  baseUrl:string = 'http://localhost:3000/authenticate/'
  base2Url:string = 'http://localhost:3000/authorize/'
  base3Url:string = 'http://localhost:3000/users/'
  base4Url:string = ' http://localhost:3000/logout'


  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  getUserInf(){
    return this.http.get('http://localhost:3000/user_inf').map(res => res.json());
  }

  getTokenStorage(){
    return this.storage.get('jwtoken').then(val => {
      let autoken = val;
      console.log("autoken: ",autoken);
    });
  }
  createAuthorizationHeader(headers: Headers){
    return this.storage.get('jwtoken').then(val => {
        let autoken = val;
        console.log("autoken: ", autoken);
        headers.append('Authorization', autoken);
        console.log("headers post :", headers.toJSON());
      });
  }

  private(){

    let headers = new Headers();
    return this.createAuthorizationHeader(headers).then(() =>{
      console.log("Entrando a hacer el get");
      return this.http.get(this.base2Url,{headers: headers})
      .map(res => res.json()).toPromise();
    });

  }

  login(data){
  	return this.http.post(this.baseUrl, data)
  	.map((data)=>this.extractData(data));
  }

  Signup(data){
    return this.http.post(this.base3Url, data)
    .map(this.extractData2);
  }

  isLogged(){
  	return this.storage.get('jwtoken').then(val => {
      //console.log("value");
       console.log("Está logeado!!");
       let res = "verdadero mano";
       return res
      }).catch(err => {
        console.log(":O No está logeado!!");
        return false
    });

  }

  logout(){

   let headers = new Headers();

   return this.createAuthorizationHeader(headers).then(() =>{

    this.storage.get('jwtoken').then((val) => {
        console.log('El token es: ', val);
      });
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log("headers");
    console.log(headers);
    this.storage.remove('jwtoken');
    this.storage.get('jwtoken').then((val) => {
        console.log('El token removido es: ', val);
      });

    return this.http.get(this.base4Url,{
      headers: headers
    }).map(res => res.json());
    });



    //this.storage.remove('jwtoken');
    //window.localStorage.removeItem('auth_token');
    //return true;
  }

  refreshToken(newtoken){
    console.log("Newtoken = ",newtoken);
    this.storage.remove('jwtoken');
    this.storage.set('jwtoken', newtoken).then(() => {
        console.log('Fijado el token: ', newtoken);
    });
  }

  gettingData(res: Response){
    let body = res.json();
    console.log("body getting data: ",body);
    //window.localStorage.setItem('auth_token', body.auth_token);
     //this.storage.set('name', 'Max');
   return body || {};
 }

   extractData(res: Response){
  	let body = res.json();
  	console.log("body: ",body);
    //window.localStorage.setItem('auth_token', body.auth_token);
 	  //this.storage.set('name', 'Max');
    this.storage.set('jwtoken', body.token);
    this.storage.get('jwtoken').then((val) => {
        console.log('(Extractdata) El token es: ', val);
      });
   return body || {};

 }

  private extractData2(res: Response){
    let body = res.json();
    //window.localStorage.setItem('auth_token', body.auth_token);
   return body || {};

 }

}
