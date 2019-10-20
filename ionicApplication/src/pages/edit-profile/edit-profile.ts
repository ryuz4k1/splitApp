import { Component } from '@angular/core';
import {
    AlertController,
    LoadingController,
    NavController,
    NavParams,
    ToastController,
    ViewController
} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Storage} from "@ionic/storage";
import {Camera} from "@ionic-native/camera";
import {LoginPage} from "../login/login";



@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

    id:any;
    name:any;
    email:any;

    website:any;
    about:any;
    job:any;
    phone:any;
    gender:any;

    login_check:any;

    placeholderPicture = 'https://api.adorable.io/avatar/200/bob';


    // You can get this data from your API. This is a dumb data for being an example.
    public user_data = {
        profile_img: '',
        name_surname: 'Özer',
        username: 'ryuz4k1',
        website: 'https://github.com/ryuz4k1',
        description: 'Software developer',
        email: 'ozer@gmail.com',
        phone: '',
        gender:'male'
    };


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        public alertCtrl : AlertController,
        public dataProvider : DataServiceProvider,
        public storage : Storage,
        public camera : Camera,
        public toastCtrl : ToastController

    ) {


        this.storage.get('log_user').then(user_info => {
            console.log(user_info);

            this.id = user_info.id;

            this.login_check = user_info.login_check;

        });

    }



    updateProfile() {
        let loader = this.loadingCtrl.create({
            duration: 200
        });

            var user_more_info = {
                name:this.name,
                email:this.email,
                website : this.website,
                about : this.about,
                job : this.job,
                phone : this.phone,
                gender : this.gender
            };


            this.dataProvider.updateProfile(user_more_info,this.id).subscribe(data => {
                console.log(data);

            });


            loader.present().then( () => this.navCtrl.pop() ); // Get back to profile page. You should do that after you got data from API
            console.log(this.gender);




    }

    dismiss() {
        this.viewCtrl.dismiss();
    }



    selectGender(){
        let alert = this.alertCtrl.create({
            title: 'Select Gender',
            inputs: [
                {
                    type: 'radio',
                    label: 'Female',
                    value: '0'
                },
                {
                    type: 'radio',
                    label: 'Male',
                    value: '1'
                }
            ],
            buttons: [
                {
                    text: 'İptal',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Tamam',
                    handler: () => {
                        console.log('OK clicked: ' );
                        // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
                    }
                }
            ],
        });
        alert.present();
    }


    updateProfileImage() {
        this.camera.getPicture({
            quality: 50,
            allowEdit: true,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then((imageData) => {
            this.user_data.profile_img = imageData;
        }, (err) => {
            this.toastCtrl.create({message : err})
        });
    }

}
