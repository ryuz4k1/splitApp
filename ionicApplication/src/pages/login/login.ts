import { Component } from '@angular/core';
import {
    Loading,
    NavController,
    NavParams,
    ToastController,
    LoadingController,
    AlertController,
    Nav, Platform
} from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {HomePage} from "../home/home";
import {Camera,CameraOptions} from "@ionic-native/camera";
import { File } from '@ionic-native/file';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import {Md5} from 'ts-md5/dist/md5';
import {NetworkServiceProvider} from "../../providers/network-service/network-service";
import {FilePath} from "@ionic-native/file-path";
import {HttpClient} from "@angular/common/http";
import {Base64} from "@ionic-native/base64";
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import {TabPage} from "../tab/tab";
import {Storage} from "@ionic/storage";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {InterestsPage} from "../interests/interests";
import { Events } from 'ionic-angular';
import {KisiEklePage} from "../kisi-ekle/kisi-ekle";
import {Geolocation} from '@ionic-native/geolocation';


declare var cordova: any;


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    users:any = [];

    //Kullanıcı Bilgileri
    username:string;
    pass:string;


    //Register info
    regName:string;
    regUsername:string;
    regPass:string;
    regEmail:string;

    myResponse:any;


    lastImage: string = null;
    loading: Loading;

    ip:any;

    rate: number;
    locale: string;

    saveForm: any;


    segment: string = "login";


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              private camera: Camera,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public alertCtrl:AlertController,
              private file: File,
              public tts:TextToSpeech,
              public nav:Nav,
              public platform:Platform,
              public filePath : FilePath,
              public networkServiceProvider:NetworkServiceProvider,
              public base64 : Base64,
              public httpClient : HttpClient,
              private transfer: Transfer,
              public storage : Storage,
              public dataProvider : DataServiceProvider,
              public event : Events,
              public geolocation: Geolocation) {

      this.ip = this.navParams.get('ip');

      console.log('login_ip : ' , this.ip);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

    public takePicture() {
        // Create options for the Camera Dialog
        var options : CameraOptions= {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth:1000,
            targetHeight:1000,
            cameraDirection:this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

            this.uploadImage()

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
        this.dataProvider.loginFaceRecognition(targetPath, options).then(data => {
            this.loading.dismissAll();
            var myParse = JSON.parse(data.response);

            console.log('myParse : ' , myParse);

            var face_found = myParse.face_found;
            var person_name = myParse.person_name;

            if (person_name != 0 && face_found == 1) {
                const alert = this.alertCtrl.create({
                    title: "Hoşgeldin " + person_name,
                    buttons: ['OK']
                });
                alert.present();

                this.tts.speak({
                    text: "Hoşgeldin " + person_name,
                    rate: 0.55,
                    locale: this.locale
                })
                    .then(() => console.log('Success'))
                    .catch((reason: any) => console.log(reason));
                //this.storage.set('login:status',true);
                this.nav.setRoot(TabPage);
            }


            else if (face_found == 0) {
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

            //console.log(data);
            this.presentToast('Resim başarılı bir şekilde yüklendi.');
        }, err => {
            this.loading.dismissAll();
            this.presentToast('Resim yüklenirken hata!!');
        });
    }


    goToHomePage()
    {
        if (this.networkServiceProvider.getConnectionStatus()) {
            if (this.username != null && this.pass != null) {

                let loading = this.loadingCtrl.create({content: "Lütfen bekleyiniz..."});
                loading.present();

                var myData = {
                    username: this.username,
                    password: this.pass
                };
                //console.log("Post data : " + JSON.stringify(myData));

                this.dataProvider.login(myData).subscribe(data => {
                    //console.log("Dönene data :  " + JSON.stringify(data));
                    this.myResponse = data;
                    console.log(this.myResponse);


                    var log_in = this.myResponse.data.log_in;
                    var error = this.myResponse.data.error;
                    var pass_control = this.myResponse.data.pass_control;


                    if (log_in != true) {
                        let alert = this.alertCtrl.create({
                            title: "Wrong!",
                            subTitle: error,
                            buttons: [{text: 'OK', role: 'cancel'}]
                        });
                        alert.present();
                    }
                    else if(log_in == true && pass_control != true){
                        let alert = this.alertCtrl.create({
                            title: "Wrong!",
                            subTitle: error,
                            buttons: [{text: 'OK', role: 'cancel'}]
                        });
                        alert.present();
                    }
                    else {
                        let alert = this.alertCtrl.create({
                            title: "You've logged successfully",
                            subTitle: error,
                            buttons: [{text: 'OK', role: 'cancel'}]
                        });
                        alert.present();


                        var id = this.myResponse.data.id;
                        var username =this.myResponse.data.username;
                        var login_check = this.myResponse.data.log_in;

                        var user_json = {
                            id:id,
                            username: username,
                            login_check : login_check
                        };

                        this.storage.set('log_user', user_json);

                        this.event.publish('user_info', user_json);


                        this.geolocation.getCurrentPosition().then((resp) => {
                            var MyLat = resp.coords.latitude;
                            var MyLng = resp.coords.longitude;
                            console.log("Res lati : " , resp.coords.latitude);
                            console.log("Res longi : " , resp.coords.longitude);


                            var locData = {
                                latitude : MyLat,
                                longitude : MyLng
                            };


                            this.dataProvider.setLocation(this.myResponse.data.id,locData).subscribe(data => {
                                console.log(data);
                            });


                        }).catch((error) => {
                            console.log('Error getting location', error);
                        });

                        let watch = this.geolocation.watchPosition();
                        watch.subscribe((data) => {
                            // data can be a set of coordinates, or an error (if an error occurred).
                            // data.coords.latitude
                            // data.coords.longitude
                            console.log("Data lati : " , data.coords.latitude);
                            console.log("Data longi : " , data.coords.latitude);

                        });
                        this.storage.set('hasLogged', 'true');
                        this.nav.setRoot(TabPage);
                    }
                    loading.dismiss();
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
        } else {
            const alert = this.alertCtrl.create({
                title: 'Connection Error!',
                subTitle: 'Please make sure your Internet is connected!',
                buttons: ['OK']
            });
            alert.present();
        }
    }

    goPersonalInfoPage(){
        if(this.networkServiceProvider.getConnectionStatus()){
          if(this.regUsername != null && this.regPass != null && this.regEmail){
              let loading = this.loadingCtrl.create({content: "Lütfen bekleyiniz..."});
              loading.present();

              var regData = {
                  email : this.regEmail,
                  username: this.regUsername,
                  password: this.regPass,

              };
              this.dataProvider.register(regData).subscribe(data => {
                  //console.log(data);
                  //console.log("Dönene data :  " + JSON.stringify(data));
                  this.myResponse = data;

                  var status = this.myResponse.data.success;
                  var error = this.myResponse.data.error;
                  var exist = this.myResponse.data.exist;


                  if (status != true) {
                      let alert = this.alertCtrl.create({
                          title: "There is something wrong",
                          subTitle: error,
                          buttons: [{text: 'OK', role: 'cancel'}]
                      });
                      alert.present();
                  }

                  else if(exist == true){
                      let alert = this.alertCtrl.create({
                          title: "Try Again",
                          subTitle: error,
                          buttons: [{text: 'OK', role: 'cancel'}]
                      });
                      alert.present();
                  }

                  else {

                      let alert = this.alertCtrl.create({
                          title: "Congrats",
                          subTitle: error,
                          buttons: [{text: 'OK', role: 'cancel'}]
                      });
                      alert.present();

                      var id = this.myResponse.data.id;

                      var user_json = {
                          id:id,
                          email : this.regEmail,
                          username: this.regUsername,
                          password: this.regPass
                      };

                      //this.users.push(user_json);

                      //console.log(this.users);

                      // set a key/value
                      this.storage.set('reg_user', user_json);


                      this.navCtrl.push(InterestsPage,{user_id : id});

                  }

                  loading.dismiss();

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


    registerFace(){
      this.navCtrl.push(KisiEklePage);
    }

}
