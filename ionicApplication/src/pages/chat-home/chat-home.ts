import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {ChatRoomPage} from "../chat-room/chat-room";
import {Socket} from "ng-socket-io";
import {TestPage} from "../test/test";

@Component({
    selector: 'page-chat-home',
    templateUrl: 'chat-home.html',
})
export class ChatHomePage {

    nickname = '';

    constructor(public navCtrl: NavController, private socket: Socket,public menuCtrl:MenuController) {

    }

    joinChat() {
        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);
        this.navCtrl.push(ChatRoomPage, { nickname: this.nickname });
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

}
