import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})



export class EventModalPage {

  event = { name: "", description: "" , address: "", phone: "", start_time: new Date().toISOString(), end_time: new Date().toISOString(), lattitude: -1, longittude: -1, owner_id: -1,   allDay: false };
  minDate = new Date().toISOString();
  obs_event: Observable<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http, private authprovider: AuthProvider) {

    /*
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let preselectedname = moment(this.navParams.get('selectedName')).format();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    */

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.start_time = preselectedDate;
    this.event.end_time = preselectedDate;

    
    // this.authprovider.sufuncion().then(data => {
    //   this.mivariable = data;
    //   console.log("variable: ", this.mivariable);
    //   this.authprovider.refreshToken(this.mivariable.newtoken);
    //   return true;
    // })
    //.catch((err) => {
    //   console.log("Not authorized")
    //   return false;
      
    // });


    http.post('http://localhost:3006/', event);
    this.obs_event
    .map(res => res.json())
    .subscribe(data => {
      console.log('my data: ', data);
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
