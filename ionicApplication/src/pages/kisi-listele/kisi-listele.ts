import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-kisi-listele',
  templateUrl: 'kisi-listele.html',
})
export class KisiListelePage {

    myData:any = [];
    ip:any;
    myParse = [];

  constructor(public navCtrl: NavController, public navParams: NavParams , public http:Http) {


      this.ip = navParams.get('ip');
      console.log(this.ip);



      this.http.get('http://'+ this.ip + '/kisiler').map(res => res.json()).subscribe(
          data => {

              this.myData = data;
              console.log('myParse : ' , this.myData.toString());
          });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KisiListelePage');
  }

}
