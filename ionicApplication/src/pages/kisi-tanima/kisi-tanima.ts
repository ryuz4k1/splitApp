import { Component } from '@angular/core';
import {
    NavController,
    ActionSheetController,
    ToastController,
    Platform,
    LoadingController,
    Loading,
    AlertController, NavParams
} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { TextToSpeech } from '@ionic-native/text-to-speech';


declare var cordova: any;
@Component({
  selector: 'page-kisi-tanima',
  templateUrl: 'kisi-tanima.html',
})
export class KisiTanimaPage {

    lastImage: string = null;
    loading: Loading;

    ip:any;

    rate: number;
    locale: string;

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              public alertCtrl : AlertController,
              public navParams:NavParams,
              public tts:TextToSpeech) {


      this.ip = navParams.get('ip');
      console.log(this.ip);
      var url = "http://" + this.ip;
      console.log(url);


      this.locale = 'tr-TR';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KisiTanimaPage');
  }



    public presentActionSheet() {


        this.takePicture(this.camera.PictureSourceType.CAMERA);


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
        var options : CameraOptions= {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth:1000,
            targetHeight:1000
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



    public uploadImage() {
        // Destination URL
        //var url = "http://192.168.45.241:5003";
        var url = "http://" + this.ip + "/sifresiztanima";

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'file': filename}
        };

        const fileTransfer: TransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Yükleniyor...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.loading.dismissAll();
            var myParse = JSON.parse(data.response);

            console.log('myParse : ' , myParse);

             var face_found = myParse.face_found;
             var person_name = myParse.person_name;

             if (person_name != 0 && face_found == 1){
                const alert = this.alertCtrl.create({
                    title: "Merhaba " + person_name,
                    buttons: ['OK']
                });
                alert.present();

                this.tts.speak({
                    text: "Merhaba "+ person_name,
                    rate: 0.55,
                    locale: this.locale
                })
                    .then(() => console.log('Success'))
                    .catch((reason: any) => console.log(reason));
            }


             else if(face_found == 0)
             {
                 const alert = this.alertCtrl.create({
                     title: "Yüz Bulunamadi",
                     subTitle: "Bu fotoğrafta yüz bulunamadi.",
                     buttons: ['OK']
                 });
                 alert.present();

                 this.tts.speak({
                     text: "Yüz Bulunamadi",
                     rate: 0.55,
                     locale: this.locale
                 })
                     .then(() => console.log('Success'))
                     .catch((reason: any) => console.log(reason));

             }

             else if (person_name == 0) {
                const alert = this.alertCtrl.create({
                    title: "Kişi Bulunamadi",
                    subTitle: "Bu kişiyi  bulamadım.",
                    buttons: ['OK']
                });
                alert.present();

                this.tts.speak({
                    text: "Kişi Bulunamadi",
                    rate: 0.55,
                    locale: this.locale
                })
                    .then(() => console.log('Success'))
                    .catch((reason: any) => console.log(reason));
            }

            console.log(data);
            this.presentToast('Resim başarılı bir şekilde yüklendi.');
        }, err => {
            this.loading.dismissAll();
            this.presentToast('Resim yüklenirken hata!!');
        });
    }
}
