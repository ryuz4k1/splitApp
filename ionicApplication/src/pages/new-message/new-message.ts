import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {HttpClient} from "@angular/common/http";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {ChatRoomPage} from "../chat-room/chat-room";
import {Socket} from "ng-socket-io";
import {Storage} from "@ionic/storage";
import {ChatViewModel} from "../../models/ChatViewModel";
import {ChatViewProvider} from "../../providers/chat-view/chat-view";


@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html',
})
export class NewMessagePage {

    searchTerm: string = '';
    searchControl: FormControl;
    searching: any = false;

    searchQuery: string = '';

    all_users:any = {};

    public user_json:any = {};


    today:any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public httpClient:HttpClient,
                public dataProvider : DataServiceProvider,
                private socket: Socket,
                public storage : Storage,
                public chatViewProvider : ChatViewProvider,
                public event : Events
    ) {


      this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMessagePage');



      this.dataProvider.getUsers().subscribe(data => {

          this.all_users = data;
          console.log(this.all_users)

      });

      //this.user_json = this.navParams.get('user_json');
      this.storage.get('log_user').then((log_user) => {
          this.user_json = log_user;
          console.log(this.user_json);
      });
  }


    goChatRoom(name,id){
        this.today = new Date().toLocaleTimeString();
        this.socket.connect();
        this.socket.emit('set-nickname', this.user_json.username);

        var chat_info = {
            name : this.user_json.username,
            date : this.today
        };

        this.event.publish('chat_info', chat_info);

        this.navCtrl.push(ChatRoomPage,{nickname : this.user_json.username,receiver : name});

        let card = new ChatViewModel(name,this.today);
        this.chatViewProvider.addCards(card);
    }


    onSearchInput(){
        this.searching = true;
    }

}
