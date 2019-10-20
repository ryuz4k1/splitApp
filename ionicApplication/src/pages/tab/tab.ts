import { Component } from '@angular/core';
import {Events, MenuController, NavController, NavParams} from 'ionic-angular';
import {SohbetlerPage} from "../sohbetler/sohbetler";
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {MapPage} from "../map/map";




@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

    tab0root:any;
    tab1root:any;
    tab2root:any;
    tab3root:any;
    public onlypage: boolean = false;

    reg_info:any;
    registerdan_id:any;
    register_check:any;


    constructor(public navCtrl: NavController, public navParams: NavParams,public events:Events,public menuCtrl : MenuController) {

    this.tab0root = HomePage;
    this.tab1root = SohbetlerPage;
    this.tab2root = ProfilePage;
    this.tab3root = MapPage;

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
    console.log('ionViewDidLoad TabPage');
  }

}
