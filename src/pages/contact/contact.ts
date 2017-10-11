import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'; //https://stackoverflow.com/questions/43609853/angular-4-and-ionic-3-no-provider-for-http
 
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  data:any = {};
 
 constructor(public navCtrl: NavController, public http: Http) {
 this.data.username = '';
 this.data.response = '';
 
 this.http = http;
 }
 
 submit() {
    var link = 'http://192.168.99.102:3080/invites/get-api.php';
    var myData = JSON.stringify({username: this.data.username});
    
    this.http.post(link, myData)
    .subscribe(data => {
    this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
    }, error => {
    console.log("Oooops!");
    });
 }

}
