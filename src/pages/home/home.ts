import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newtoken: any = "";

  constructor(public navCtrl: NavController, private authprovider: AuthProvider) {
    this.Authorize();
  }

Authorize(){
      this.authprovider.private().then(data => {
        console.log("data authorizw: ", data);
        this.newtoken = data;
        console.log("login successful");
        console.log("token: ", this.newtoken.newtoken);
        this.authprovider.refreshToken(this.newtoken.newtoken);
        return true;
        }).catch((err) => {
          console.log("Not authorized")
          return false;
        });
}

 logout(){
   this.authprovider.logout().then(data =>{
      console.log("fin de logout")
      console.log(data)
    });
   this.navCtrl.setRoot(LoginPage);
   }

}
