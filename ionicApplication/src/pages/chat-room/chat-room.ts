import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams, ToastController} from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import {Http} from "@angular/http";



@Component({
    selector: 'page-chat-room',
    templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
    messages = [];
    nickname = '';
    message = '';

    receiver = '';

    @ViewChild(Content) content: Content;

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private socket: Socket,
                private toastCtrl: ToastController,
                public http:Http
    ) {

        this.nickname = this.navParams.get('nickname');
        console.log(this.nickname);
        this.receiver = this.navParams.get('receiver');



        this.getMessages().subscribe(message => {
            this.messages.push(message);
            console.log(message);

        });

        this.getUsers().subscribe(data => {
            let user = data['user'];
            if (data['event'] === 'left') {
                this.showToast('User left: ' + user);
            } else {
                this.showToast('User joined: ' + user);
            }
        });
    }

    sendMessage() {
        this.scrollToBottom();
        this.socket.emit('add-message', { text: this.message });

        this.message = '';
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    getUsers() {
        let observable = new Observable(observer => {
            this.socket.on('users-changed', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    ionViewWillLeave() {
        this.socket.disconnect();
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position:'top'
        });
        toast.present();
    }


    scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 100);
    }

}