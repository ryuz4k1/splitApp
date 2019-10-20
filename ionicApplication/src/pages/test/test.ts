import {Component, NgZone} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {
    LoadingController,
    NavController,
    ModalController,
    App,
    NavParams,
    AlertController,
    Platform, MenuController
} from 'ionic-angular';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ProfilePage} from "../profile/profile";
import {Http} from "@angular/http";
import {Storage} from "@ionic/storage";
import { AngularFireDatabase } from "angularfire2/database";
import {DataServiceProvider} from "../../providers/data-service/data-service";


@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

    public photos : any;
    public base64Image : string;

    myData:any;
    //username:any;
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



    //declare the variable
    data:any = {};
    public deviceInfo;
    public lat:number;
    public lng:number;


    username:string = '';
    message: string = '';
    _chatSubscription;
    messages: object[] = [];





    all_users:any = [];

    public user_json:any = {};

    users_id:any;



    user1 = {
        about: null,
        email: "test11@gmail.com",
        gender: null,
        id: 47,
        interests: ['Sport', 'Art', 'Music'],
        job: null,
        latitude: null,
        loc_id: null,
        longitude: null,
        name: null,
        password: "$5$rounds=535000$k3ufpmtZEdu4wx8U$WphVy6OVDqwxB07OfIwjT.7FAQx7h7G5Wg1O6Bf3d4C",
        phone: null,
        register_date: "Tue, 09 Apr 2019 17:21:41 GMT",
        username: "test11",
        website: null
    };

    user2 = {
        about: null,
        email: "test10@gmail.com",
        gender: null,
        id: 46,
        interests: ['Sport', 'Art', 'Music'],
        job: null,
        latitude: null,
        loc_id: null,
        longitude: null,
        name: null,
        password: "$5$rounds=535000$9wsrOZmf.yGLtlWj$szjVV2OtgmtBGeM1KZ20OMJJNje56Wf4BNv4R2vuRL4",
        phone: null,
        register_date: "Tue, 09 Apr 2019 15:47:16 GMT",
        username: "test10",
        website: null
    };





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
                public db: AngularFireDatabase,
                public storage : Storage,
                public dataProvider : DataServiceProvider



    ) {

        let elem = document.createElement("div");
        this.markers = [];
        this.loading = this.loadingCtrl.create();

        menuCtrl.enable(true);

        this.storage.get('log_user').then((log_user) => {
            this.user_json = log_user;
            console.log(this.user_json);
        });

        /**
        this.username = this.navParams.get('nickname');
        console.log('Username : ' , this.username);
        this._chatSubscription = this.db.list(this.username+'/chat').valueChanges().subscribe( data => {
            this.messages = data;
            console.log(data);
        });

         **/

  }


  findCommon(){
        var users_info = [];


        users_info.push(this.user1,this.user2);
        console.log(users_info);

      // just some good 'ol JS fun with objects and arrays
      // build up the data by linking speakers to sessions
      this.data = {
          info : users_info
      };
      console.log(this.data);

      // loop through each day in the schedule
      this.data.info.forEach((user: any) => {
          this.users_id = [];
          this.users_id.push(user.id);
          user.interests.forEach((interest: any) =>{
              console.log(interest);
          });

          /**
          if (session.speakerNames) {
              session.speakerNames.forEach((speakerName: any) => {
                  let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
                  if (speaker) {
                      session.speakers.push(speaker);
                      speaker.sessions = speaker.sessions || [];
                      speaker.sessions.push(session);
                  }
              });


          }
           **/
          console.log(this.users_id);

      });




  }




    sendMessage() {
        this.db.list(this.username+'/chat').push({
            username: this.username,
            message: this.message
        });
        this.message = '';
    }

    ionViewDidLoad() {
        this.db.list(this.username+'/chat').push({
            specialMessage: true,
            message: `${this.username} has joined the room`
        });
    }

    ionViewWillLeave(){
        this._chatSubscription.unsubscribe();
        this.db.list(this.username+'/chat').push({
            specialMessage: true,
            message: `${this.username} has left the room`
        });
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









  testGeoLocation(){
        /**
        this.dataProvider.getLocation(this.user_json.id).subscribe(data => {
           console.log(data);
        });

         **/


      this.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
          console.log("Res lati : " , resp.coords.latitude);
          console.log("Res longi : " , resp.coords.longitude);
      }).catch((error) => {
          console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude

          console.log("Data lati : " , data.coords.latitude);
          console.log("Data longi : " , data.coords.latitude);

      });

  }




    updateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete.input},
            (predictions, status) => {
                this.autocompleteItems = [];
                if (predictions) {
                    this.zone.run(() => {
                        predictions.forEach((prediction) => {
                            this.autocompleteItems.push(prediction);
                        });
                    });
                }
            });
    }

    selectSearchResult(item) {

        this.clearMarkers();
        this.autocompleteItems = [];

        this.geocoder.geocode({'placeId': item.place_id}, (results) => {
            if (status === 'OK' && results[0]) {
                this.GooglePlaces.nearbySearch({
                    location: results[0].geometry.location,
                    radius: '10000',
                    types: ['taxi_stand'], //check other types here https://developers.google.com/places/web-service/supported_types
                    key: 'AIzaSyAGrQOvVvD5xm8SjbTikGLVl1L_BgMvRqY'
                }, (near_places) => {
                    this.zone.run(() => {
                        this.nearbyItems = [];
                        for (var i = 0; i < near_places.length; i++) {
                            let marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: this.map
                            });
                            this.markers.push(marker);
                            this.map.setCenter(results[0].geometry.location);
                            this.nearbyItems.push(near_places[i]);
                        }
                        this.loading.dismiss();
                    });
                });
                let position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                console.log(position);

            }
        })
    }



    clearMarkers(){
        for (var i = 0; i < this.markers.length; i++) {
            console.log(this.markers[i])
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }





    gonder(){
      this.loginData = {
          'username' : this.username,
          'password' : this.password

      };
          this.http.post('http://172.17.197.42:5000/api/users',this.loginData).subscribe( data =>{

              this.myData = data;

              console.log(JSON.stringify(this.myData));
          })

    }


}
