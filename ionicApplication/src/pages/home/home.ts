import { Component } from '@angular/core';
import {AlertController, MenuController, ModalController, NavController, ToastController} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {EditPostPage} from "../edit-post/edit-post";
import {Storage} from "@ionic/storage";
import {Geolocation} from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


    response_posts:any;
    articles:any;
    resp_delete:any;

    likee:number = 5;


    user = {
        name: 'James Ford',
        profileImage: 'https://avatars1.githubusercontent.com/u/33656801?s=460&v=4',
        coverImage: 'https://aapsonline.org/wp/wp-content/uploads/2015/12/MatrixCode.jpg',
        occupation: 'Software Developer',
        location: 'Istanbul, Turkey',
        description: 'because limits like fears are often just an illusion.',
        followers: 456,
        following: 1052,
        posts: 35
    };

    public user_json:any = {};


    constructor(public navCtrl: NavController,
              public menuCtrl:MenuController,
              public dataProvider : DataServiceProvider,
              public alertCtrl : AlertController,
              public modalCtrl : ModalController,
                public storage : Storage,
                public geolocation : Geolocation,
                public toastCtrl : ToastController
  ) {

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

        this.dataProvider.getAllPosts().subscribe( data => {

            this.response_posts = data;
            console.log(this.response_posts);

            this.articles = this.response_posts.data.articles;

        });



        this.storage.get('log_user').then(log_user => {

            this.geolocation.getCurrentPosition().then((resp) => {
                var MyLat = resp.coords.latitude;
                var MyLng = resp.coords.longitude;
                console.log("Res lati : " , resp.coords.latitude);
                console.log("Res longi : " , resp.coords.longitude);

                var locData = {
                    latitude : MyLat,
                    longitude : MyLng
                };


                this.dataProvider.setLocation(log_user.id,locData).subscribe(data => {
                    console.log(data);
                });


            }).catch((error) => {
                console.log('Error getting location', error);
            });
        });

    }


    editPost(id){

        let modal = this.modalCtrl.create(EditPostPage,{id : id});
        modal.present();

    }


    removePost(id){

        const alert =  this.alertCtrl.create({
            message: '<strong>Are you sure?</strong>',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Remove',
                    handler: () => {
                        this.dataProvider.removePost(id).subscribe( data => {

                            console.log(data);

                            this.resp_delete = data;

                        });
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }
                }
            ]
        });

        alert.present();

    }


    imageTapped(post) {
        const toast = this.toastCtrl.create({
            message: 'Post image clicked.',
            duration: 2000
        });
        toast.present();

    }

    comment(post) {
        const toast = this.toastCtrl.create({
            message: 'Comments clicked',
            duration: 2000
        });
        toast.present();

    }

    like(post) {
        this.likee = this.likee + 1;
        const toast = this.toastCtrl.create({
            message: 'Like clicked',
            duration: 2000
        });
        toast.present();

    }
}
