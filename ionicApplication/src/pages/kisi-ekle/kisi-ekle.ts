import { Component  } from '@angular/core';
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
import {FilePath} from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {TabPage} from "../tab/tab";


declare var cordova: any;



@Component({
  selector: 'page-kisi-ekle',
  templateUrl: 'kisi-ekle.html',
})
export class KisiEklePage {



    lastImage: string = null;
    loading: Loading;

    name:string = '';

    ip:any;

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
              public dataProvider : DataServiceProvider

  ) {



      this.ip = navParams.get('ip');
      console.log(this.ip);
      var url = "http://" +this.ip + "/kisiekle";
      console.log(url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KisiEklePage');
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



    public uploadImage() {
        // Destination URL
        var url = "http://" +this.ip + "/kisiekle";

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);



        // File name only
        var filename = this.lastImage;

        //var myInput = document.getElementById("inputum").nodeValue;
        console.log(this.name);
        if (this.name == "" ){
            const alert = this.alertCtrl.create({
                title: "Hata",
                subTitle: "İsim alanı boş bırakılamaz!",
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        console.log(this.name);


        var options = {
            fileKey: "file",
            fileName: filename,
            person_name: this.name,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {
                'file': filename,
                'person_name':this.name

            }
        };

        const fileTransfer: TransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Yükleniyor...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        this.dataProvider.registerFace(targetPath, options).then(data => {
            this.loading.dismissAll();
            var myParse = JSON.parse(data.response);

            console.log('myParse : ' , myParse);

             var encoding = myParse.encoding;
             var face_found = myParse.face_found;


             if (encoding == 1 && face_found == 1){

                const alert = this.alertCtrl.create({
                    subTitle: "Kisi Eklendi",
                    buttons: ['OK']
                });
                this.navCtrl.setRoot(TabPage);
                alert.present();

            }
             else if(face_found == 0){
                const alert = this.alertCtrl.create({
                    subTitle: "Kisi Bulunamadi",
                    buttons: ['OK']
                });
                alert.present();

            }
             else
             {
                 const alert = this.alertCtrl.create({
                     subTitle: "Bağlanti Hatasi",
                     buttons: ['OK']
                 });
                 alert.present();

             }



            console.log(data);
            this.presentToast('Resim başarılı bir şekilde yüklendi.');
        }, err => {
            this.loading.dismissAll();
            this.presentToast('Resim yüklenirken hata!!');
        });
    }





}
