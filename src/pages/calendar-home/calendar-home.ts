import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
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

  user: Observable<any>;
  events: Observable<any>;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public authProvider: AuthProvider) {
        this.user = this.authProvider.getUserInf();
        this.user.map(res => res.json()).subscribe(data => {
          console.log('my data: ', data);
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

  onEventSelected(event, films) {

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    let place = event.site;


    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: '<b>From: </b>' + start + '<b><br>To:</b> ' + end +  '<b><br>Where: </b>' + place ,
      buttons: ['OK']
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
