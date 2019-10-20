import { Component } from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';
import {KisiMainPage} from "../kisi-main/kisi-main";
import {LoginPage} from "../login/login";
import {DataServiceProvider} from "../../providers/data-service/data-service";

@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
})
export class ServerPage {

    ip:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl : MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerPage');
  }

    sendToPages(){

        this.navCtrl.push(KisiMainPage, {
            ip:this.ip
        });

    }


    sentToLogin(){
        this.navCtrl.push(LoginPage, {
            ip:this.ip
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

}
