import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Storage} from "@ionic/storage";



@Component({
  selector: 'page-group-chat-room',
  templateUrl: 'group-chat-room.html',
})
export class GroupChatRoomPage {


  grop_chat_id:any;
  group_chat_name:any;
    group_chat_photo:any;


    username:string = '';
    message: string = '';
    _chatSubscription;
    messages: object[] = [];


    @ViewChild(Content) content: Content;


    constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public storage : Storage

  ) {


      this.grop_chat_id = this.navParams.get('id');
      this.group_chat_name = this.navParams.get('kanal');
      this.group_chat_photo = this.navParams.get('photo');

      this.storage.get('log_user').then((user) => {
          this.username = user.username;
          console.log(user);
      });


      this._chatSubscription = this.db.list(this.group_chat_name+'/chat').valueChanges().subscribe( data => {
          this.messages = data;
          //console.log(data);
      });

        this.scrollToBottom();


  }

    sendMessage() {
        this.scrollToBottom();
        this.db.list(this.group_chat_name+'/chat').push({
            username: this.username,
            message: this.message
        });
        this.message = '';
    }

    ionViewDidLoad() {
        this.db.list(this.group_chat_name+'/chat').push({
            specialMessage: true,
            message: this.username + ' has joined the room'
        });
    }

    ionViewWillLeave(){
        this._chatSubscription.unsubscribe();
        this.db.list(this.group_chat_name+'/chat').push({
            specialMessage: true,
            message: this.username + ' has left the room'
        });
    }


    scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 100);
    }

}
