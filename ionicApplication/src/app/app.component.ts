import {Component, ViewChild} from '@angular/core';
import {Events, ModalController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {ServerPage} from "../pages/server/server";
import {TestPage} from "../pages/test/test";
import {ChatHomePage} from "../pages/chat-home/chat-home";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {PresentationPage} from "../pages/presentation/presentation";
import {ProfilePage} from "../pages/profile/profile";
import * as firebase from 'Firebase';
import {TabPage} from "../pages/tab/tab";
import {InterestsPage} from "../pages/interests/interests";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {InterestSuccessPage} from "../pages/interest-success/interest-success";




//It must be your firebase config
const config = {
    apiKey:'' ,
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId:'' 
};



export interface PageInterface {
    title: string;
    name: string;
    icon: string;
    component:any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage: any = ''; //hasSeenTutorial için bunu aç
    //rootPage : any = InterestsPage;

    user_json:any;

    username:any;
    status:any;

    pages: PageInterface[] = [
        { title: 'Home Page',name: 'HomePage',  component: TabPage ,  icon: 'home' },
        { title: 'Global Chat',name: 'ChatPage',  component: ChatHomePage ,  icon: 'chatboxes' },
    ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public modalCtrl:ModalController,public storage : Storage, public httpClient : HttpClient,
              public event : Events) {


      platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
      });

      firebase.initializeApp(config);



      this.storage.get('log_user').then(user_info => {
          this.user_json = user_info;
          console.log(this.user_json);

          this.username = this.user_json.username;


          if (this.user_json.login_check == true){
              this.status = 'Online';
          }
          else{
              this.status = 'Offline';
          }
      });

      this.storage.get('hasSeenTutorial')
          .then((hasSeenTutorial) => {
              this.storage.get('hasLogged').then((hasLogged) => {
                  if (hasSeenTutorial && hasLogged) {
                      this.rootPage = TabPage;
                  } else if (hasSeenTutorial) {
                      this.rootPage = LoginPage;
                  }
                  else{
                      this.rootPage = PresentationPage
                  }
                  platform.ready().then(() => {
                      // Okay, so the platform is ready and our plugins are available.
                      // Here you can do any higher level native things you might need.
                      statusBar.styleDefault();
                      splashScreen.hide();
                  });

              });

          });
  }


    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    }


    openTutorial() {
        this.nav.setRoot(PresentationPage);
    }


    cikisYap(){

        let cikis = new Date().toLocaleString();
        console.log("End : " + cikis);

        this.nav.setRoot(LoginPage)
    }
}

