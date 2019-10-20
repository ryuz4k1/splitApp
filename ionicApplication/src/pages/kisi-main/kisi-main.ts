import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {KisiEklePage} from "../kisi-ekle/kisi-ekle";
import {KisiTanimaPage} from "../kisi-tanima/kisi-tanima";
import {KisiListelePage} from "../kisi-listele/kisi-listele";



@Component({
  selector: 'page-kisi-main',
  templateUrl: 'kisi-main.html',
})
export class KisiMainPage {

    ip:any;


    constructor(public navCtrl: NavController, public navParams: NavParams) {


      this.ip = this.navParams.get('ip');
      console.log(this.ip);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KisiMainPage');
  }



    goToKisiEkle(){
        this.navCtrl.push(KisiEklePage, {
            ip:this.ip
        });
    }


    goToKisiTanima(){
        this.navCtrl.push(KisiTanimaPage,{
            ip:this.ip
        });
    }


    goToKisiListele(){
        this.navCtrl.push(KisiListelePage,{
            ip:this.ip

        });
    }

}
