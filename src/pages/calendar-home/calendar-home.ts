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
  event: any;

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

   edit_event(event) {
     let modal = this.modalCtrl.create('EditPage', { selectedTitle: event.title, selectedDay: event.selectedDay, selectedSite: event.selectedSite});

     modal.present();
     modal.onDidDismiss(data => {

       var index = this.eventSource.indexOf(event.title);
       let partialsource = this.eventSource;
       this.eventSource = [];

       if (index > -1) {
         partialsource.splice(index, 1);
         setTimeout(() => {
           this.eventSource = partialsource;
         });
       }


       if (data) {
         let eventData = data;

         eventData.startTime = new Date(data.startTime);
         eventData.endTime = new Date(data.endTime);
         eventData.selectedSite = data.selectedSite ;
         eventData.selectedTitle = data.selectedTitle ;

         let events = this.eventSource;
         events.push(eventData);
         this.eventSource = [];
         setTimeout(() => {
           this.eventSource = events;
         });
       }
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

  delete_event(event, ins){
    if (ins === 0){

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

        let headers = new Headers({ 'Content-Type': 'application/json',
                                         'Accept': 'q=0.8;application/json;q=0.9' });
        let options = new RequestOptions({ headers: headers });

        this.http.delete("http://192.168.99.100:3008/events?name="+ event.title, options)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
   }

    if (ins == 1){
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

    this.http.delete("http://192.168.99.100:3008/events?name="+ event.title, options)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });

    alert.present();
   }
 }

  onEventSelected(event) {

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    let place = event.site;


    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: '<b>From: </b>' + start + '<b><br>To:</b> ' + end +  '<b><br>Where: </b>' + place ,
      buttons: [{
        text: 'Edit event',
        handler: () => {
          console.log("antes  "+ this.eventSource);
          this.edit_event(event);

        }
      },
      {
        text: 'Delete event',
        handler: () => {
          console.log("antes  "+ this.eventSource);
          this.delete_event(event, 1);
        }
      },
      {
        text: 'Ok',
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
