import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {EditProfilePage} from "../edit-profile/edit-profile";



@Component({
  selector: 'page-interest-success',
  templateUrl: 'interest-success.html',
})
export class InterestSuccessPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

      let TIME_IN_MS = 3000;
      setTimeout( () => {
          this.navCtrl.push(LoginPage);
          // somecode
      }, TIME_IN_MS);

    console.log('ionViewDidLoad InterestSuccessPage');
  }

}
