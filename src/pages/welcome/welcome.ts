import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.storage.set('name', 'Max');
    //this.storage.set('jwtoken', JSON.stringify(body.token));

 	this.storage.get('name').then((val) => {
    	console.log('El token es: ', val);
  	});
  }

}
