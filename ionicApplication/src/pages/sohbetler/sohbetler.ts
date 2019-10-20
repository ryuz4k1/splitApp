import { Component } from '@angular/core';
import {Events, MenuController, Nav, NavController, NavParams} from 'ionic-angular';
import {ChatRoomPage} from "../chat-room/chat-room";
import {Http} from "@angular/http";
import {map} from "rxjs/operator/map";
import {GroupChatRoomPage} from "../group-chat-room/group-chat-room";
import {Storage} from "@ionic/storage";
import {NewMessagePage} from "../new-message/new-message";
import {Socket} from "ng-socket-io";
import {ChatViewProvider} from "../../providers/chat-view/chat-view";


@Component({
  selector: 'page-sohbetler',
  templateUrl: 'sohbetler.html',

})
export class SohbetlerPage {

    channel:any;

    today:any;

    users:any = [];
    msg: string = "ozel";


    chat_group:any = [
            {
                id:1,
                kanal:'Sport',
                photo : "https://i.hizliresim.com/1pm6mB.jpg",
            },
            {
                id:2,
                kanal:'Fashion',
                photo : "https://i.hizliresim.com/gPzrzN.jpg",
            },
            {
                id:3,
                kanal:'Technology',
                photo : "https://i.hizliresim.com/M15VY9.jpg",
            },
            {
                id:4,
                kanal:'Music',
                photo : "https://i.hizliresim.com/vad6dr.png",
            },
            {
                id:5,
                kanal:'Economy',
                photo : "https://i.imgyukle.com/2019/05/23/kxw6ax.jpg",
            },
            {
                id:6,
                kanal:'Art',
                photo : "https://i.hizliresim.com/2Om6mE.jpg",
            },
            {
                id:7,
                kanal:'Math',
                photo : "https://i.hizliresim.com/bvAV8j.jpg",
            },
            {
                id:8,
                kanal:'Physics',
                photo : "https://i.imgyukle.com/2019/05/23/kxwXWo.jpg",
            },
            {
                id:9,
                kanal:'Engineering',
                photo : "https://i.imgyukle.com/2019/05/23/kxw2Yt.jpg",
            },
            {
                id:10,
                kanal:'Research',
                photo : "https://i.imgyukle.com/2019/05/23/kx0VaU.png",
            },
            {
                id:11,
                kanal:'Design',
                photo : "https://i.imgyukle.com/2019/05/23/kx0YHQ.jpg",
            },
            {
                id:12,
                kanal:'Social Media',
                photo : "https://i.imgyukle.com/2019/05/23/kx0sk0.jpg",
            }
        ];


    public user_json:any = {};

    public chat_info : any = {};

    public name:any;
    public date:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams ,
                public menuCtrl:MenuController,
                public nav:Nav,public events:Events,
                public http:Http,
                public storage : Storage,
                private socket: Socket,
                public chatViewProvider : ChatViewProvider,
                public event : Events) {

        this.today = new Date().toLocaleTimeString();

        menuCtrl.enable(true);

        storage.get('log_user').then((log_user) => {
            this.user_json = log_user;
            console.log(this.user_json);
        });


        this.event.subscribe('chat_info', (chat_info) => {
            this.chat_info = chat_info;
            console.log(this.chat_info);

            this.name = this.chat_info.name;
            this.date = this.chat_info.date;

        });

        if (this.msg == 'ozel'){
            this.chatViewProvider.load();
        }
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


    goSearch(){
      //this.navCtrl.push(SearchPage);
    }


    goChatRoom(receiver_name){
        this.socket.connect();
        this.socket.emit('set-nickname', this.user_json.username);
        this.navCtrl.push(ChatRoomPage,{nickname : this.user_json.username,receiver:receiver_name});
    }

    goChatRoom2(id,kanal,photo){
        this.navCtrl.push(GroupChatRoomPage, {
            id: id,
            kanal: kanal,
            photo : photo
        });
    }

    goNewMessagePage(){
        this.navCtrl.push(NewMessagePage)
    }





}
