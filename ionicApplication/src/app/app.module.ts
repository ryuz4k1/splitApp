import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {HttpModule} from "@angular/http";
import { TextToSpeech } from '@ionic-native/text-to-speech';
import {ServerPage} from "../pages/server/server";
import {KisiTanimaPage} from "../pages/kisi-tanima/kisi-tanima";
import {KisiEklePage} from "../pages/kisi-ekle/kisi-ekle";
import {KisiListelePage} from "../pages/kisi-listele/kisi-listele";
import {KisiMainPage} from "../pages/kisi-main/kisi-main";
import {TestPage} from "../pages/test/test";
import {Camera} from "@ionic-native/camera";
import { Transfer } from '@ionic-native/transfer';
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import {Md5} from 'ts-md5/dist/md5';
import {Network} from "@ionic-native/network";
import {ChatHomePage} from "../pages/chat-home/chat-home";
import {ChatRoomPage} from "../pages/chat-room/chat-room";
import {SocketIoConfig, SocketIoModule} from "ng-socket-io";
import {HttpClientModule} from '@angular/common/http';
import {Base64} from "@ionic-native/base64";
import {FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer/ngx";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {PresentationPage} from "../pages/presentation/presentation";
import {ProfilePage} from "../pages/profile/profile";


import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import {TabPage} from "../pages/tab/tab";
import {SohbetlerPage} from "../pages/sohbetler/sohbetler";
import {GroupChatRoomPage} from "../pages/group-chat-room/group-chat-room";
import {MapPage} from "../pages/map/map";
import {InterestsPage} from "../pages/interests/interests";

import { IonicStorageModule } from '@ionic/storage';
import {AddPostPage} from "../pages/add-post/add-post";


import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NewMessagePage} from "../pages/new-message/new-message";
import {EditPostPage} from "../pages/edit-post/edit-post";
import {DataServiceProvider} from "../providers/data-service/data-service";
import {InterestSuccessPage} from "../pages/interest-success/interest-success";
import { ChatViewProvider } from '../providers/chat-view/chat-view';




var configChat = {
    apiKey: "AIzaSyDbyBpPT3lfQQEjou9YEtNN00tbjgTQWko",
    authDomain: "helloworldchat-e1105.firebaseapp.com",
    databaseURL: "https://helloworldchat-e1105.firebaseio.com",
    projectId: "helloworldchat-e1105",
    storageBucket: "helloworldchat-e1105.appspot.com",
    messagingSenderId: "1000797139453"
};


const config: SocketIoConfig = { url: 'http://splitapp.openode.io/', options: {} };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
      LoginPage,
      ServerPage,


      KisiMainPage,
      KisiTanimaPage,
      KisiEklePage,
      KisiListelePage,

      ChatHomePage,
      ChatRoomPage,

      ProfilePage,
      EditProfilePage,
      PresentationPage,

      TestPage,
      TabPage,
      SohbetlerPage,

      GroupChatRoomPage,

      MapPage,
      InterestsPage,
      AddPostPage,
      NewMessagePage,
      EditPostPage,

      InterestSuccessPage
  ],
  imports: [
    BrowserModule,
      HttpModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp,{
          menuType: 'push',
          platforms: {
              ios: {
                  menuType: 'overlay',
              },
              android:{
                  menuType:'overlay',
              }
          },
          tabsHideOnSubPages: true,

      }),
      SocketIoModule.forRoot(config),
      AngularFireModule.initializeApp(configChat),
      AngularFireDatabaseModule,
      IonicStorageModule.forRoot()


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      LoginPage,
      ServerPage,

      KisiMainPage,
      KisiTanimaPage,
      KisiEklePage,
      KisiListelePage,

      ChatHomePage,
      ChatRoomPage,

      ProfilePage,
      EditProfilePage,
      PresentationPage,

      TestPage,

      TabPage,
      SohbetlerPage,

      GroupChatRoomPage,

      MapPage,
      InterestsPage,
      AddPostPage,
      NewMessagePage,
      EditPostPage,

      InterestSuccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
      File,
      TextToSpeech,
      Camera,
      Transfer,
      FilePath,
      Md5,
      Network,
      Base64,
      FileTransferObject,
      Geolocation,
      Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkServiceProvider,
    DataServiceProvider,
    ChatViewProvider,

  ]
})
export class AppModule {}
