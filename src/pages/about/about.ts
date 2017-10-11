import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NgZone } from '@angular/core';
import { OtherPage } from '../other/other';
import { MailServiceProvider } from "../../providers/mail-service/mail-service";
import { Storage } from '@ionic/storage';


declare var google;
declare var jquery:any;
declare var $ :any;
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  users: any[] = [];
  map: any;
  
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public ngZone: NgZone, public mailService: MailServiceProvider, private storage: Storage) {
  }
  
  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
    });

    //Content for university marker 
    let contentString = '<div id="content">'+
                '<strong> Tu ubicación </strong>' + 
                '</div>'; 
    let infowindow = new google.maps.InfoWindow({content: contentString});

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    infowindow.open(this.map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(this.map);

    let placeslist = this.getUsers();
    console.log("retorno de getusers: ");
    
    console.log(JSON.stringify(placeslist));
    console.log("arreglo newarray: ");
    let LatLng1={lat:4.6374325, lng:-74.0849883};
    let LatLng2={lat:4.6364594, lng:-74.083513};
    let valueString = '<div id="content" class="barra-titulo">'+
                '<strong> Información del lugar:</strong> <br><br>' +
                '</div>'; 
    // for (let i=0; i <=2; i++){
    //this.addMarker(LatLng1, valueString, "house");
    //this.addMarker(LatLng2, valueString, "police");
    //}
  }

  getUsers(){
        console.log(this);
        let thisScope = this;
        let houseAPI = "http://192.168.99.102:3080/invites/get-event.php";//Api to obtain data of the house
        let myLatLngOri = {lat:41.8708 , lng: -87.6505};//University coordinates
        $.getJSON(houseAPI, function (data) {
            
            for (let datos in data.Places){
                let info = data.Places[datos];
                console.log (info);
                let idplace = info.Id;
                let name = info.Name;
                let lati = Number(info.Latitud);
                let longi = Number(info.Longitud);
                let myLatLng={lat:lati, lng:longi};
                let valueString = '<div id="content" class="barra-titulo">'+
                '<strong> ' + name + ': </strong> <br><br> <button onClick="window.ionicPageRef.zone.run(function () { window.ionicPageRef.component.openPage('+idplace+') })">Ir al lugar</button> </div>';

                  
                //console.log(this);
                thisScope.addMarker(myLatLng, valueString, "house");
            }
            //this.addMarker(LatLng1, valueString, "house");
            //console.log(data);
        });
        //console.log ("retorno interna");
        //console.log(PlacesList);
        //return PlacesList;
        // set a key/value
        this.storage.set('name', 'Max');

        // Or to get a key/value pair
        this.storage.get('name').then((val) => {
        console.log('Your name is', val);
        });
    }

  //Function to add marker to the map
  addMarker(location, contentString, markertype) {
    (<any>window).ionicPageRef = { component: this, zone: this.ngZone };
    let titulo="";
    let markerImage = "";

    //let infowindow = new google.maps.InfoWindow({content: contentString});
    let infowindow = new google.maps.InfoWindow({content: contentString});
    //Obtaining the type of marker, used to set the icon on the map
    if (markertype == "house"){
        markerImage = new google.maps.MarkerImage
        (
            "https://image.flaticon.com/icons/png/512/169/169857.png",
            new google.maps.Size(36, 36, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(36, 36, "px", "px")
        );
        titulo = "Possible property"
    }
    if (markertype == "police"){
        markerImage = new google.maps.MarkerImage
        (
            "https://cdn2.iconfinder.com/data/icons/location-map-simplicity/512/music_concert_hall-512.png",
            new google.maps.Size(36, 36, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(36, 36, "px", "px")
        );
        titulo = "Police"
    }
    if (markertype == "bikes"){
        markerImage = new google.maps.MarkerImage
        (
            "images/Byke.png",
            new google.maps.Size(32, 32, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(32, 32, "px", "px")
        );
        titulo = "Bikes"
    }
    var marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: markerImage,
        title: titulo 
    });
    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    //console.log("marcador añadido");
                    infowindow.open(this.map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(this.map);
    }

    openPage(idevent) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(OtherPage , { id: idevent });
    }
}
    