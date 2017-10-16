import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import {CalendarHomePage} from '../calendar-home/calendar-home';


/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage{
  old: any ;
  event = { title: "", description: "", startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false , site: -1, owner_id: 0};
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http) {

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    let preselectedPlace = this.navParams.get('selectedSite')
    let preselectedTitle = this.navParams.get('selectedTitle')

    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.event.site = preselectedPlace;
    this.event.title = preselectedTitle;
    this.old = preselectedTitle;


    function site_find(preselectedPlace){
      let places = ["Leon de Greiff", "Virginia Gutierrrez", "Ciencias Humanas",
            "Biblioteca central", "Enfermería", "CyT", "Sociología", "Derecho",
          "Ingeniería","Medicina"];
      return "" + places[preselectedPlace -1];

    }



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModalPage');
  }

  save() {



          let headers = new Headers({ 'Content-Type': 'application/json',
                                           'Accept': 'q=0.8;application/json;q=0.9' });
          let options = new RequestOptions({ headers: headers });

          this.http.delete("http://localhost:8001/events?name="+ this.old, options)
          .subscribe(data => {
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });

    

    headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    options = new RequestOptions({ headers: headers });


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
