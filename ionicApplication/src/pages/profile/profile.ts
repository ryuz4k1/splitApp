import { Component } from '@angular/core';
import {Events,AlertController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {EditProfilePage} from "../edit-profile/edit-profile";
import {AddPostPage} from "../add-post/add-post";
import {HttpClient} from "@angular/common/http";
import {EditPostPage} from "../edit-post/edit-post";
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {Storage} from "@ionic/storage";
import {ChatRoomPage} from "../chat-room/chat-room";
import {subscriptionLogsToBeFn} from "rxjs/testing/TestScheduler";
import {ChatViewModel} from "../../models/ChatViewModel";
import {Socket} from "ng-socket-io";
import {ChatViewProvider} from "../../providers/chat-view/chat-view";



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    response_posts:any;
    articles:any;

    resp_delete:any;

    following = false;

    placeholderPicture = 'https://api.adorable.io/avatar/200/bob';


    user = {
        name: 'James Ford',
        profileImage: 'https://avatars1.githubusercontent.com/u/33656801?s=460&v=4',
        coverImage: 'https://i.imgyukle.com/2019/05/23/kx78Rq.jpg',
        occupation: 'Software Developer',
        location: 'Istanbul, Turkey',
        description: 'because limits like fears are often just an illusion.',
        followers: 456,
        following: 1052,
        posts: 35
    };

    posts = [
        {
            photo: 'assets/imgs/background/background-2.jpg',
            article: `I believe in being strong when everything seems to be going wrong.
             I believe that happy girls are the prettiest girls.
             I believe that tomorrow is another day and I believe in miracles.`,
            date: 'November 5, 2016',
            likes: 12,
            comments: 4,
            timestamp: '11h ago'
        },
        {
            photo: 'assets/imgs/background/background-3.jpg',
            article: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
            date: 'October 23, 2016',
            likes: 30,
            comments: 64,
            timestamp: '30d ago'
        }
    ];


    user_json:any = [];
    user_json_storage:any = {};
    profile_info:any = [];

    push:any;

    user_id:any;

    login_check:any;


    reg_info:any;

    user_info:any;

    article_success:any;

    today:any;



    constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl : ToastController,
              public modalCtrl : ModalController,
              public httpClient : HttpClient,
              public alertCtrl : AlertController,
              public dataProvider : DataServiceProvider,
                public storage : Storage,
                public event : Events,
                public socket : Socket,
                public chatViewProvider : ChatViewProvider) {

        this.reg_info = navParams.data;

        this.push = this.navParams.get('push');

        if(this.push == true){
            var user_id = this.navParams.get('ID');

            this.dataProvider.getUserProfile(user_id).subscribe(data => {
                console.log(data);

                this.user_json = data;
            });

            this.dataProvider.getUserPosts(user_id).subscribe( data => {

                this.response_posts = data;
                this.article_success = this.response_posts.data.error;
                console.log(this.response_posts);

                this.articles = this.response_posts.data.articles;
            });
        }
        else{

            //this.user_json = this.navParams.get('user_json');
            this.storage.get('log_user').then((log_user) => {

                this.user_json_storage = log_user;
                console.log(this.user_json_storage);

                this.dataProvider.getUserProfile(this.user_json_storage.id).subscribe(data => {
                    console.log(data);
                    this.profile_info = data;
                });

                this.dataProvider.getUserPosts(this.user_json_storage.id).subscribe( data => {

                    this.response_posts = data;
                    this.article_success = this.response_posts.data.error;
                    console.log(this.response_posts);

                    this.articles = this.response_posts.data.articles;
                });
            });
        }
  }

    ionViewDidLoad() {

    }

    removePost(id){
        const alert =  this.alertCtrl.create({
            message: '<strong>Are you sure?</strong>',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Remove',
                    handler: () => {
                        this.dataProvider.removePost(id).subscribe( data => {

                            console.log(data);

                            this.resp_delete = data;

                        });
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }
                }
            ]
        });

        alert.present();
    }


    editPost(id){

      let modal = this.modalCtrl.create(EditPostPage,{id : id});
      modal.present();

    }

    goAddPost(){

        let modal = this.modalCtrl.create(AddPostPage);
        modal.present();
    }

    follow() {
        this.following = !this.following;

        const toast = this.toastCtrl.create({
            message: 'Follow user clicked.',
            duration: 2000
        });
        toast.present();
  }

    imageTapped(post) {
        const toast = this.toastCtrl.create({
            message: 'Post image clicked.',
            duration: 2000
        });
        toast.present();

    }

    comment(post) {
        const toast = this.toastCtrl.create({
            message: 'Comments clicked',
            duration: 2000
        });
        toast.present();

    }

    like(post) {
        const toast = this.toastCtrl.create({
            message: 'Like clicked',
            duration: 2000
        });
        toast.present();

    }

    goEditProfile() {
        // Open it as a modal page
        let modal = this.modalCtrl.create(EditProfilePage);
        modal.present();
    }


    goToChatRoom(name){
        this.storage.get('log_user').then((log_user) => {
            var my_nickname = log_user.username;

            this.today = new Date().toLocaleTimeString();
            this.socket.connect();
            this.socket.emit('set-nickname', my_nickname);

            let card = new ChatViewModel(name,this.today);
            this.chatViewProvider.addCards(card);

            this.navCtrl.push(ChatRoomPage,{nickname : my_nickname ,receiver : name})
        });
    }
}
