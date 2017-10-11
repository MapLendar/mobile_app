import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private authprovider: AuthProvider,
  	public alertCrl: AlertController
  	) {}

  login (FormLogin){
  	this.authprovider.login(FormLogin.value).subscribe(data=>{
      console.log("data de login ts: ", data);
  		if(data){
  			this.navCtrl.setRoot(HomePage);

  		}else{
  			FormLogin.password = '';
  			let alert= this.alertCrl.create({
  			title: 'Fallo el login',
  			subTitle: data.message,
  			buttons: ['OK']
  		})
  		alert.present();
  	   }
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
