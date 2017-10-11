import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MailServiceProvider } from "../../providers/mail-service/mail-service";

/**
 * Generated class for the OtherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'otherpage'
  }
)
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {
  idplace = "";
  users: any[] = [];
  place: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public mailService: MailServiceProvider) {
  }

  ionViewDidLoad() {
    this.idplace = this.navParams.get('id');

    this.mailService.getUsers()
    .then(data => {
      this.users = data.results;
    })
    .catch(error =>{
      console.error(error);
    });

    this.mailService.getPlaceById(this.idplace)
    .then(data => {
      console.log("data: ",data);
      this.place = data;
    })
    .catch(error =>{
      console.error(error);
    })

  }

}
