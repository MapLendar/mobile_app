import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';


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

  event = {title: "", description: "", startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false , site: -2, owner_id: 0};
  minDate = new Date().toISOString();
  films: Observable<any>;
  user: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http) {

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let preselectedPlace = this.navParams.get('selectedSite')

    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.event.site = preselectedPlace;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  save() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    function find_site(cadena){
      let places = ["Leon de Greiff", "Virginia Gutierrrez", "Ciencias Humanas",
            "Biblioteca central", "Enfermería", "CyT", "Sociología", "Derecho",
          "Ingeniería","Medicina"];

      for ( let i = 0; i<places.length; i++){
        if (places[i] === cadena)
          return i+1;
      }

    }



    let postParams = {

       name: this.event.title,
       description:this.event.description,
       site_id: find_site(this.event.site),
       start_time: this.event.startTime,
       end_time: this.event.endTime,
      // owner_id: find_user(this.event.owner_id),
       created_at: new Date().toISOString(),
       updated_at: new Date().toISOString(),
    }

    console.log("site_id", postParams.site_id),
    this.http.post("http://localhost:8001/events", postParams, options)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });

    this.viewCtrl.dismiss(this.event);
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

}
