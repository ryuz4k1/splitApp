import {Component, NgZone} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {
    LoadingController,
    NavController,
    ModalController,
    App,
    NavParams,
    AlertController,
    Platform, MenuController, Events
} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ProfilePage} from "../profile/profile";
import {Http} from "@angular/http";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Storage} from "@ionic/storage";

declare var google: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

    public photos : any;
    public base64Image : string;

    myData:any;
    username:any;
    password:any;
    loginData:any;



    map:any;
    markers: any;
    autocomplete: any;
    GoogleAutocomplete: any;
    GooglePlaces: any;
    geocoder: any;
    autocompleteItems: any;
    loading: any;
    result: any = [];
    nearbyItems: any = new Array<any>();
    MyLat:any;
    MyLng:any;

    locData:any;
    user_json:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertCtrl : AlertController,

                public zone: NgZone,
                public geolocation: Geolocation,
                public loadingCtrl: LoadingController,
                public http: Http,
                public modalCtrl : ModalController,
                public app:App,
                public platform : Platform,
                public httpClient: HttpClient,
                public menuCtrl : MenuController,
                public dataProvider : DataServiceProvider,
                public event : Events,
                public storage : Storage) {

        platform.ready().then(() => {
            this.tryGeolocation();
        });


        let elem = document.createElement("div");
        this.markers = [];
        this.loading = this.loadingCtrl.create();

        menuCtrl.enable(true);

    }

    openMenu(evt) {
        if(evt === "main"){
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }else{
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    }

    ionViewDidLoad() {

    }


    tryGeolocation() {

        this.geolocation.getCurrentPosition().then((resp) => {

            //myLatlong is a variable keeps data which is coming from json data
            var myLatLong = {lat: resp.coords.latitude, lng: resp.coords.longitude, name: 'Burdasın'};
            this.MyLat = resp.coords.latitude;
            this.MyLng = resp.coords.longitude;


            //Create map
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLong,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControl: true,
                streetViewControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                fullscreenControl: true
            });

            //Marker
            let marker = new google.maps.Marker({
                position: myLatLong,
                map: this.map,
                icon:'https://i.imgyukle.com/2019/03/27/6PXhH.png'
            });


            //Push the marker in the markes
            this.markers.push(marker);

            //Set the location in the center
            this.map.setCenter(myLatLong);


            //Info Window
            let infoWindow = new google.maps.InfoWindow({});


            //Info window open when I click it
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(myLatLong.name);
                infoWindow.open(this.map, marker);
            });

            this.AdresleriListele(resp.coords.latitude,resp.coords.longitude);

        }).catch((error) => {
            alert(error);
            this.loading.dismiss();

        });
    }


    AdresleriListele(MyLat,MyLong){
        var myLatLong = {lat: MyLat, lng: MyLong, name: 'Burdasın'};
        console.log(myLatLong);

        this.storage.get('log_user').then(user_json =>{

            this.user_json = user_json;

            this.dataProvider.getAllLocation(this.user_json.id).subscribe((mapData: any) => {

                console.log(mapData);
                //var locData = mapData.locations;
                var locData = mapData.data.yakin_lokasyonlar;

                for(var i=0;i<locData.length;i++){
                    var pozisyon = {lat:parseFloat(locData[i]["latitude"]),lng:parseFloat(locData[i]["longitude"])};
                    console.log("All pozisyon : " , pozisyon);
                    //console.log(mapData[i]["name"]);

                    let  marker = new google.maps.Marker({
                        position: pozisyon,
                        map: this.map,
                        animation: google.maps.Animation.DROP,
                        icon: 'https://i.imgyukle.com/2019/03/27/6PhE1.png'
                    });

                    //Push the marker in the markes
                    this.markers.push(marker);

                    // Add the circle for this city to the map.
                    var cityCircle = new google.maps.Circle({
                        strokeColor: '#f90405',
                        strokeOpacity: 0.1,
                        strokeWeight: 1,
                        fillColor: '#f6fff4',
                        fillOpacity: 0.1,
                        map: this.map,
                        center: myLatLong,
                        radius: 10000
                    });

                    //var loc_isim  =  mapData[i]["name"];
                    var id = locData[i]["user_id"];
                    var lat = locData[i]["latitude"];
                    var lng = locData[i]["longitude"];


                    var content =
                        '<!--<h5 style="color:#e74c3c;"></h5>-->'+
                        '<p style="color:#e74c3c;">Latitude : '+lat+'</p>'+
                        '<p style="color:#e74c3c;">Longitude : '+lng+'</p>'
                    '<button type="button" #info'+id+' id="info'+id+'" (click)="this.navCtrl.push(ProfilePage)" style="color:#1A92E7">Daha Fazla Bilgi</button>'
                    ;

                    //Info Window
                    let infoWindow = new google.maps.InfoWindow({
                        content:content
                    });


                    marker.addListener('click', () => {
                        infoWindow.open(this.map, marker);
                    });

                    let sayfa = this.navCtrl;
                    google.maps.event.addListener(marker,'click', (function(marker,i)
                    {return function()
                    {console.log(locData[i]["user_id"]);
                        sayfa.push(ProfilePage,{ID:locData[i]["user_id"],push:true});
                        //   infoWindow.open(map, marker);
                    }
                    })(marker, i));

                }

            });

        });

    }


    clearMarkers(){
        for (var i = 0; i < this.markers.length; i++) {
            console.log(this.markers[i]);
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }



}
