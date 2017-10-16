import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions,  Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from '../../providers/auth/auth';


@Component({
  selector: 'calendar-home',
  templateUrl: 'calendar-home.html'
})
export class CalendarHomePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  selectedSite: string;
  newtoken: any  =  "";

  user: any;
  events: any;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public authProvider: AuthProvider, public http: Http) {
        /*this.Authorize();

        this.user = this.authProvider.getUserInf().then(data => {
              this.newtoken = data;
              this.authProvider.refreshToken(this.newtoken.newtoken);
              return true;
            }).catch((err) => {
              console.log("Not authorized")
              return false;
             });

        let owner_id = this.user.id;
        this.events = this.authProvider.getUserEvents(owner_id).then(data => {
              this.newtoken = data;
              this.authProvider.refreshToken(this.newtoken.newtoken);
              return true;
            }).catch((err) => {
              console.log("Not authorized")
              return false;
             });
        for(let ev of this.events){
          this.eventSource.push(ev);
        }

        */
   }

   Authorize(){
         this.authProvider.private().then(data => {
           console.log("data authorizw: ", data);
           this.newtoken = data;
           console.log("login successful");
           console.log("token: ", this.newtoken.newtoken);
           this.authProvider.refreshToken(this.newtoken.newtoken);
           return true;
           }).catch((err) => {
             console.log("Not authorized")
             return false;
           });
   }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay, selectedSite: this.selectedSite});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData.selectedSite = data.selectedSite ;

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  delete_event(event){

    let alert = this.alertCtrl.create({
      title: 'Delete: ' + event.title + '?',

      buttons: [{
        text: 'Yes, delete event!',
        handler: () => {

          var index = this.eventSource.indexOf(event);
          let partialsource = this.eventSource;
          this.eventSource = [];

          if (index > -1) {
            partialsource.splice(index, 1);
            setTimeout(() => {
              this.eventSource = partialsource;
            });
            console.log("Después", this.eventSource);
          }
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('ok');
        }
      }]
    })



    let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Accept': 'q=0.8;application/json;q=0.9' });
    let options = new RequestOptions({ headers: headers });

    this.http.delete("http://localhost:8001/events?="+ event.title, options)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });

    alert.present();


  }

  onEventSelected(event) {

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    let place = event.site;


    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: '<b>From: </b>' + start + '<b><br>To:</b> ' + end +  '<b><br>Where: </b>' + place ,
      buttons: [{
        text: 'Delete event',
        handler: () => {
          console.log("antes  "+ this.eventSource);
          this.delete_event(event);
        }
      },
      {
        text: 'OK',
        handler: () => {
          console.log('ok');
        }
      }]
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onSiteSelected(ev){
    this.selectedSite = ev.selectedSite;
  }


}
