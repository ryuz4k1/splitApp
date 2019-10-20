import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, NavParams, Slides} from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

    showSkip = true;

    @ViewChild('slides') slides: Slides;


    slide_content = [
        {
            title: "Welcome to Split APP",
            description: "Find your partner interests and communicate",
            image: "https://i.hizliresim.com/Z5g3r3.png",
        },
        {
            title: "Register system",
            description: "You can register to the system in the normal way or with face recognition.",
            image: "https://i.hizliresim.com/gPz6N0.png",
        },
        {
            title: "Getting started",
            description: "Choose your interests and start now",
            image: "https://i.hizliresim.com/Yd2Q2k.png",
        }

    ];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public storage : Storage
    ) { }

    startApp() {

        this.navCtrl.push(LoginPage).then(() => {
            this.storage.set('hasSeenTutorial', 'true');
        })
    }


    onSlideChangeStart(slider: Slides) {
        this.showSkip = !slider.isEnd();
    }

    ionViewWillEnter() {
        this.slides.update();
    }

    ionViewDidEnter() {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    ionViewDidLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    }

}
