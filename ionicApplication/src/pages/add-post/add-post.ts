import { Component } from '@angular/core';
import {
    ActionSheetController, AlertController,
    Loading,
    LoadingController,
    NavController,
    NavParams, Platform, ToastController,
    ViewController
} from 'ionic-angular';


import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {HttpClient} from "@angular/common/http";
import {NetworkServiceProvider} from "../../providers/network-service/network-service";
import {DataServiceProvider} from "../../providers/data-service/data-service";

import {Storage} from "@ionic/storage";


declare var cordova: any;


@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
    body:string;
    title:string;

    lastImage: string = null;
    loading: Loading;

    name:string = '';

    myPostResponse:any;

    username:any;
    user_id:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public loadingCtrl : LoadingController,
              public actionSheetCtrl : ActionSheetController,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public toastCtrl: ToastController,
              public platform: Platform,
              public alertCtrl : AlertController,
              public httpClient : HttpClient,
              public networkServiceProvider : NetworkServiceProvider,
              public dataProvider : DataServiceProvider,
              public storage : Storage) {
  }

  ionViewDidLoad() {


      this.storage.get('log_user').then((user) => {
          this.username = user.username;
          this.user_id = user.id;
      });

    console.log('ionViewDidLoad AddPostPage');
  }

    addPost() {
        if (this.networkServiceProvider.getConnectionStatus()) {

            if (this.title != null && this.body != null) {
                var post_data = {
                    title: this.title,
                    author: this.username,
                    body: this.body,
                    user_id : this.user_id
                };


                this.dataProvider.addPost(post_data).subscribe(data => {

                    let loader = this.loadingCtrl.create({
                        duration: 200
                    });


                    this.myPostResponse = data;
                    console.log(this.myPostResponse);

                    var status = this.myPostResponse.data.error;

                    let alert = this.alertCtrl.create({
                        title: "You shared a post!!",
                        subTitle: status,
                        buttons: [{text: 'Tamam', role: 'cancel'}]
                    });

                    loader.present().then( () => this.navCtrl.pop() ); // Get back to profile page. You should do that after you got data from API
                    alert.present();

                });
            }

            else {
                let alert = this.alertCtrl.create({
                    title: "Do not leave empty",
                    subTitle: "Please do not leave space!",
                    buttons: [{text: 'OK', role: 'cancel'}]
                });
                alert.present();
            }

        }
        else {
            const alert = this.alertCtrl.create({
                title: 'Connection Error!',
                subTitle: 'Please make sure your Internet is connected!',
                buttons: ['OK']
            });
            alert.present();
        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Resim Kaynağını Seç',
            buttons: [
                {
                    text: 'Galeriden Yükle',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Kamerayi Kullan',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'İptal',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }


    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Resim Seçerken Hata');
        });
    }


    // Create a new name for the image
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName =  n + ".jpg";
        return newFileName;
    }

// Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            this.presentToast('Dosyayi Kaydederken Hata');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

// Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }
}
