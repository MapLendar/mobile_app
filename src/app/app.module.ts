import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';

import { HttpModule } from '@angular/http';
//agregadas desps
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';

import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { OtherPage } from '../pages/other/other';

import { CalendarHomePage } from '../pages/calendar-home/calendar-home';

import { Geolocation } from '@ionic-native/geolocation';
import { MailServiceProvider } from '../providers/mail-service/mail-service';

import { NgCalendarModule } from 'ionic2-calendar';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    SignupPage,
    AboutPage,
    ContactPage,
    TabsPage,
    OtherPage,
    CalendarHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    SignupPage,
    AboutPage,
    ContactPage,
    OtherPage,
    TabsPage,
    CalendarHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MailServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
