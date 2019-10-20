webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatViewProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ChatViewModel__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatViewProvider = /** @class */ (function () {
    function ChatViewProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.cards = [];
        console.log('Hello ChatViewProvider Provider');
    }
    ChatViewProvider.prototype.load = function () {
        var _this = this;
        this.storage.get('permatimerCards').then(function (cards) {
            if (cards) {
                for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                    var card = cards_1[_i];
                    var savedCards = new __WEBPACK_IMPORTED_MODULE_4__models_ChatViewModel__["a" /* ChatViewModel */](card.name, card.date);
                    _this.cards.push(savedCards);
                }
            }
        });
    };
    ChatViewProvider.prototype.save = function () {
        this.storage.set('permatimerCards', this.cards);
    };
    ChatViewProvider.prototype.reorder = function (indexes) {
        this.cards = Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* reorderArray */])(this.cards, indexes);
        this.save();
    };
    ChatViewProvider.prototype.addCards = function (project) {
        this.cards.push(project);
        this.save();
    };
    ChatViewProvider.prototype.removeCards = function (project) {
        var index = this.cards.indexOf(project);
        if (index > -1) {
            this.cards.splice(index, 1);
            this.save();
        }
    };
    ChatViewProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ChatViewProvider);
    return ChatViewProvider;
}());

//# sourceMappingURL=chat-view.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NetworkServiceProvider = /** @class */ (function () {
    function NetworkServiceProvider(http, network) {
        //console.log('Hello NetworkServiceProvider Provider');
        var _this = this;
        this.http = http;
        this.network = network;
        this.statusChangedObserver = null;
        this.isOnline = true;
        this.statusChanged = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            _this.statusChangedObserver = observer;
        });
        // watch network for a disconnect
        this.network.onDisconnect().subscribe(function () {
            console.log('network was disconnected :-(');
            _this.setConnectionStatus(false);
        });
        // watch network for a connection
        this.network.onConnect().subscribe(function () {
            console.log('network connected!');
            _this.setConnectionStatus(true);
        });
    }
    NetworkServiceProvider.prototype.setConnectionStatus = function (status) {
        this.isOnline = status;
        this.statusChangedObserver.next(status);
    };
    NetworkServiceProvider.prototype.getConnectionStatus = function () {
        return this.isOnline;
        //return false;
        //return !(this.network.type === 'none');
    };
    NetworkServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], NetworkServiceProvider);
    return NetworkServiceProvider;
}());

//# sourceMappingURL=network-service.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatViewModel; });
var ChatViewModel = /** @class */ (function () {
    function ChatViewModel(name, date) {
        this.name = name;
        this.date = date;
    }
    ChatViewModel.prototype.setIsim = function (name) {
        this.name = name;
    };
    ChatViewModel.prototype.setAdet = function (date) {
        this.date = date;
    };
    return ChatViewModel;
}());

//# sourceMappingURL=ChatViewModel.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditPostPage = /** @class */ (function () {
    function EditPostPage(navCtrl, navParams, viewCtrl, loadingCtrl, httpClient, dataProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.httpClient = httpClient;
        this.dataProvider = dataProvider;
        this.post_id = this.navParams.get('id');
    }
    EditPostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditPostPage');
    };
    EditPostPage.prototype.updatePost = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            duration: 200
        });
        var post_edit_data = {
            title: this.title,
            body: this.body
        };
        this.dataProvider.editPost(post_edit_data, this.post_id).subscribe(function (data) {
            console.log(data);
        });
        loader.present().then(function () { return _this.navCtrl.pop(); });
    };
    EditPostPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-post',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/edit-post/edit-post.html"*/'<ion-header>\n  <ion-navbar color="myColor">\n    <ion-buttons start left>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Edit Post</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="updatePost()">\n        <ion-icon name="checkmark" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <div>\n    <ion-label position="fixed"><h3>Title : </h3></ion-label>\n    <ion-input no-margin no-padding class="info-text" [(ngModel)]="title"></ion-input>\n    <hr class="custom-hr" color="gray">\n  </div>\n\n  <br>\n\n  <div no-border>\n    <ion-label position="fixed"><h3>Body : </h3></ion-label>\n    <ion-textarea [(ngModel)]="body" class="textKutu"></ion-textarea>\n  </div>\n\n  <br>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/edit-post/edit-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["a" /* DataServiceProvider */]])
    ], EditPostPage);
    return EditPostPage;
}());

//# sourceMappingURL=edit-post.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_profile_edit_profile__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_post_add_post__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_post_edit_post__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__chat_room_chat_room__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_ChatViewModel__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng_socket_io__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_chat_view_chat_view__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, toastCtrl, modalCtrl, httpClient, alertCtrl, dataProvider, storage, event, socket, chatViewProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.httpClient = httpClient;
        this.alertCtrl = alertCtrl;
        this.dataProvider = dataProvider;
        this.storage = storage;
        this.event = event;
        this.socket = socket;
        this.chatViewProvider = chatViewProvider;
        this.following = false;
        this.placeholderPicture = 'https://api.adorable.io/avatar/200/bob';
        this.user = {
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
        this.posts = [
            {
                photo: 'assets/imgs/background/background-2.jpg',
                article: "I believe in being strong when everything seems to be going wrong.\n             I believe that happy girls are the prettiest girls.\n             I believe that tomorrow is another day and I believe in miracles.",
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
        this.user_json = [];
        this.user_json_storage = {};
        this.profile_info = [];
        this.reg_info = navParams.data;
        this.push = this.navParams.get('push');
        if (this.push == true) {
            var user_id = this.navParams.get('ID');
            this.dataProvider.getUserProfile(user_id).subscribe(function (data) {
                console.log(data);
                _this.user_json = data;
            });
            this.dataProvider.getUserPosts(user_id).subscribe(function (data) {
                _this.response_posts = data;
                _this.article_success = _this.response_posts.data.error;
                console.log(_this.response_posts);
                _this.articles = _this.response_posts.data.articles;
            });
        }
        else {
            //this.user_json = this.navParams.get('user_json');
            this.storage.get('log_user').then(function (log_user) {
                _this.user_json_storage = log_user;
                console.log(_this.user_json_storage);
                _this.dataProvider.getUserProfile(_this.user_json_storage.id).subscribe(function (data) {
                    console.log(data);
                    _this.profile_info = data;
                });
                _this.dataProvider.getUserPosts(_this.user_json_storage.id).subscribe(function (data) {
                    _this.response_posts = data;
                    _this.article_success = _this.response_posts.data.error;
                    console.log(_this.response_posts);
                    _this.articles = _this.response_posts.data.articles;
                });
            });
            /**
            if (this.register_check == true){
                this.dataProvider.getUserProfile(this.registerdan_id).subscribe(data => {
                    console.log(data);
                    this.profile_info = data;
                });

                this.dataProvider.getUserPosts(this.registerdan_id).subscribe( data => {

                    this.response_posts = data;
                    console.log(this.response_posts);

                    this.articles = this.response_posts.data.articles;

                });
            }
            else {
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
                        console.log(this.response_posts);

                        this.articles = this.response_posts.data.articles;

                    });

                });


            }

             **/
        }
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        /**

        this.storage.get('log_user').then((log_user) => {
            this.user_id = log_user.id;

            this.dataProvider.getUserPosts(this.user_id).subscribe( data => {

                this.response_posts = data;
                console.log(this.response_posts);

                this.articles = this.response_posts.data.articles;



            });
        });

         **/
    };
    ProfilePage.prototype.removePost = function (id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '<strong>Are you sure?</strong>',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Remove',
                    handler: function () {
                        _this.dataProvider.removePost(id).subscribe(function (data) {
                            console.log(data);
                            _this.resp_delete = data;
                        });
                        _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                    }
                }
            ]
        });
        alert.present();
    };
    ProfilePage.prototype.editPost = function (id) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__edit_post_edit_post__["a" /* EditPostPage */], { id: id });
        modal.present();
    };
    ProfilePage.prototype.goAddPost = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_post_add_post__["a" /* AddPostPage */]);
        modal.present();
    };
    ProfilePage.prototype.follow = function () {
        this.following = !this.following;
        var toast = this.toastCtrl.create({
            message: 'Follow user clicked.',
            duration: 2000
        });
        toast.present();
    };
    ProfilePage.prototype.imageTapped = function (post) {
        var toast = this.toastCtrl.create({
            message: 'Post image clicked.',
            duration: 2000
        });
        toast.present();
    };
    ProfilePage.prototype.comment = function (post) {
        var toast = this.toastCtrl.create({
            message: 'Comments clicked',
            duration: 2000
        });
        toast.present();
    };
    ProfilePage.prototype.like = function (post) {
        var toast = this.toastCtrl.create({
            message: 'Like clicked',
            duration: 2000
        });
        toast.present();
    };
    ProfilePage.prototype.goEditProfile = function () {
        // Open it as a modal page
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__edit_profile_edit_profile__["a" /* EditProfilePage */]);
        modal.present();
    };
    ProfilePage.prototype.goToChatRoom = function (name) {
        var _this = this;
        this.storage.get('log_user').then(function (log_user) {
            var my_nickname = log_user.username;
            _this.today = new Date().toLocaleTimeString();
            _this.socket.connect();
            _this.socket.emit('set-nickname', my_nickname);
            var card = new __WEBPACK_IMPORTED_MODULE_9__models_ChatViewModel__["a" /* ChatViewModel */](name, _this.today);
            _this.chatViewProvider.addCards(card);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__chat_room_chat_room__["a" /* ChatRoomPage */], { nickname: my_nickname, receiver: name });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/profile/profile.html"*/'<ion-content padding>\n  <div id="profile-bg" [ngStyle]="{\'background-image\': \'url(\' + user.coverImage +\')\'}"></div>\n\n\n\n\n  <div id="content" *ngIf="push && article_success == true">\n    <div id="profile-info" padding>\n      <img id="profile-image" [src]="user.profileImage">\n      <h3 id="profile-name">{{user_json.name}}</h3>\n      <p>{{user_json.job}} &bull; {{user.location}}</p>\n      <p class="profile-description">{{user_json.about}}</p>\n\n\n      <button ion-button icon-start *ngIf="!following" small color="side_left" (click)="follow()">\n        <ion-icon item-start name="person-add"  icon="myColor"></ion-icon>\n        Follow\n      </button>\n      <button ion-button *ngIf="following" class="follow-button" small color="myColor" (click)="follow()">Following<ion-icon name="checkmark"></ion-icon></button>\n\n\n      <button ion-button icon-start small color="side_left" (click)="goToChatRoom(user_json.name)">\n        <ion-icon item-start name="chatbubbles"></ion-icon>\n        Chat\n      </button>\n\n    </div>\n\n\n\n    <br><br>\n  <hr/>\n    <ion-row class="profile-numbers">\n      <ion-col col-4>\n        <p>Followers</p>\n        <span>{{user.followers}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Following</p>\n        <span>{{user.following}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Posts</p>\n        <span>{{user.posts}}</span>\n      </ion-col>\n\n    </ion-row>\n\n\n    <ion-card *ngFor="let post of articles" style="box-shadow: 0px 11px 20px -3px rgba(142, 136, 146, 0.75);">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="https://avatars1.githubusercontent.com/u/33656801?s=460&v=4">\n        </ion-avatar>\n        <h2 class="sticky">{{post.author}}</h2>\n        <p>{{post.create_date}}</p>\n      </ion-item>\n      <img src="https://i.hizliresim.com/bV7lP8.jpg" (click)="imageTapped(post)">\n      <ion-card-title>\n        <p>{{post.title}}</p>\n      </ion-card-title>\n      <ion-card-content>\n        <p>{{post.body}}</p>\n      </ion-card-content>\n      <ion-row>\n        <ion-col col-4>\n          <button ion-button color="purple" clear small icon-left (click)="like(post)">\n            <ion-icon name=\'thumbs-up\'></ion-icon>\n            5 Likes\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </div>\n\n  <div id="content" *ngIf="push && article_success == false">\n    <div id="profile-info" padding>\n      <img id="profile-image" [src]="user.profileImage">\n      <h3 id="profile-name">{{user_json.name}}</h3>\n      <p>{{user_json.job}} &bull; {{user.location}}</p>\n      <p class="profile-description">{{user_json.about}}</p>\n\n\n\n      <button ion-button icon-start *ngIf="!following" small color="side_left" (click)="follow()">\n        <ion-icon item-start name="person-add"  icon="myColor"></ion-icon>\n        Follow\n      </button>\n      <button ion-button *ngIf="following" class="follow-button" small color="myColor" (click)="follow()">Following<ion-icon name="checkmark"></ion-icon></button>\n\n\n      <button ion-button icon-start small color="side_left" (click)="goToChatRoom(user_json.name)">\n        <ion-icon item-start name="chatbubbles"></ion-icon>\n        Chat\n      </button>\n\n    </div>\n\n\n\n    <br><br>\n    <hr/>\n    <ion-row class="profile-numbers">\n      <ion-col col-4>\n        <p>Followers</p>\n        <span>{{user.followers}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Following</p>\n        <span>{{user.following}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Posts</p>\n        <span>{{user.posts}}</span>\n      </ion-col>\n\n    </ion-row>\n\n\n    <ion-row>\n      <p>{{articles}}</p>\n    </ion-row>\n\n  </div>\n\n\n  <div id="content2" *ngIf="!push && article_success == true">\n    <div id="profile-info2" padding>\n      <img id="profile-image2" [src]="user.profileImage">\n      <h3 id="profile-name2" >{{profile_info.name}}</h3>\n      <p >{{profile_info.job}} &bull; {{user.location}}</p>\n      <p class="profile-description">{{profile_info.about}}</p>\n\n      <ion-row>\n        <ion-col col-6>\n          <button ion-button icon-start small color="myColor" (click)="goEditProfile()">\n            <ion-icon item-start name="create"  icon="myColor"></ion-icon>\n            Edit Profile\n          </button>\n        </ion-col>\n\n        <ion-col col-6>\n          <button ion-button icon-start small color="myColor" (click)="goAddPost()">\n            <ion-icon item-start name="create"  icon="myColor"></ion-icon>\n            Create Post\n          </button>\n        </ion-col>\n      </ion-row>\n    </div>\n\n\n    <hr/>\n    <ion-row class="profile-numbers">\n      <ion-col col-4>\n        <p>Followers</p>\n        <span>{{user.followers}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Following</p>\n        <span>{{user.following}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Posts</p>\n        <span>{{user.posts}}</span>\n      </ion-col>\n\n    </ion-row>\n\n\n    <ion-card *ngFor="let post of articles" style="box-shadow: 0px 11px 20px -3px rgba(142, 136, 146, 0.75);">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="https://avatars1.githubusercontent.com/u/33656801?s=460&v=4">\n        </ion-avatar>\n        <h2 class="sticky">{{post.author}}</h2>\n        <p>{{post.create_date}}</p>\n      </ion-item>\n      <img src="https://i.hizliresim.com/bV7lP8.jpg" (click)="imageTapped(post)">\n      <ion-card-title>\n        <p>{{post.title}}</p>\n      </ion-card-title>\n      <ion-card-content>\n        <p>{{post.body}}</p>\n      </ion-card-content>\n      <ion-row>\n        <ion-col col-5>\n          <button ion-button color="myColor" clear small icon-left (click)="like(post)">\n            <ion-icon name=\'thumbs-up\'></ion-icon>\n            5 Likes\n          </button>\n        </ion-col>\n          <ion-col col-3>\n\n          </ion-col>\n        <ion-col col-2 align-self-center text-center>\n          <button color="myColor" ion-button icon-only clear (click)="removePost(post.id)">\n            <ion-icon name="trash" ></ion-icon>\n          </button>\n        </ion-col>\n\n        <ion-col col-2 align-self-center text-center>\n          <button color="myColor" ion-button icon-only clear (click)="editPost(post.id)">\n            <ion-icon name="create"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </div>\n\n\n\n  <div id="content2" *ngIf="!push && article_success == false" >\n\n    <div id="profile-info2" padding>\n      <img id="profile-image2" [src]="user.profileImage">\n      <h3 id="profile-name2" >{{profile_info.name}}</h3>\n      <p >{{profile_info.job}} &bull; {{user.location}}</p>\n      <p class="profile-description">{{profile_info.about}}</p>\n\n      <ion-row>\n        <ion-col col-6>\n          <button ion-button icon-start small color="myColor" (click)="goEditProfile()">\n            <ion-icon item-start name="create"  icon="myColor"></ion-icon>\n            Edit Profile\n          </button>\n        </ion-col>\n\n        <ion-col col-6>\n          <button ion-button icon-start small color="myColor" (click)="goAddPost()">\n            <ion-icon item-start name="create"  icon="myColor"></ion-icon>\n            Create Post\n          </button>\n        </ion-col>\n      </ion-row>\n    </div>\n\n\n    <hr/>\n    <ion-row class="profile-numbers">\n      <ion-col col-4>\n        <p>Followers</p>\n        <span>{{user.followers}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Following</p>\n        <span>{{user.following}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Posts</p>\n        <span>{{user.posts}}</span>\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n      <p text-center>{{articles}}</p>\n    </ion-row>\n\n\n  </div>\n\n\n\n  <!--\n\n  <div id="content2" *ngIf="push && article_success == false" >\n\n    <div id="profile-info2" padding>\n      <img id="profile-image2" [src]="user.profileImage">\n      <h3 id="profile-name2" >{{profile_info.name}}</h3>\n      <p >{{profile_info.job}} &bull; {{user.location}}</p>\n      <p class="profile-description">{{profile_info.about}}</p>\n\n      <button ion-button icon-start *ngIf="!following" small color="side_left" (click)="follow()">\n        <ion-icon item-start name="person-add"  icon="myColor"></ion-icon>\n        Follow\n      </button>\n      <button ion-button *ngIf="following" class="follow-button" small color="myColor" (click)="follow()">Following<ion-icon name="checkmark"></ion-icon></button>\n\n      <button ion-button icon-start small color="side_left" (click)="goToChatRoom(user_json.name)">\n        <ion-icon item-start name="chatbubbles"></ion-icon>\n        Chat\n      </button>\n\n    </div>\n\n\n    <hr/>\n    <ion-row class="profile-numbers">\n      <ion-col col-4>\n        <p>Followers</p>\n        <span>{{user.followers}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Following</p>\n        <span>{{user.following}}</span>\n      </ion-col>\n      <ion-col col-4>\n        <p>Posts</p>\n        <span>{{user.posts}}</span>\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row text-center>\n      <p>{{articles}}</p>\n    </ion-row>\n\n\n  </div>\n\n  -->\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_10_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_11__providers_chat_view_chat_view__["a" /* ChatViewProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KisiEklePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tab_tab__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var KisiEklePage = /** @class */ (function () {
    function KisiEklePage(navCtrl, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl, alertCtrl, navParams, dataProvider) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.lastImage = null;
        this.name = '';
        this.ip = navParams.get('ip');
        console.log(this.ip);
        var url = "http://" + this.ip + "/kisiekle";
        console.log(url);
    }
    KisiEklePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KisiEklePage');
    };
    KisiEklePage.prototype.presentActionSheet = function () {
        //this.takePicture(this.camera.PictureSourceType.CAMERA);
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Resim Kaynağını Seç',
            buttons: [
                {
                    text: 'Galeriden Yükle',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Kamerayi Kullan',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'İptal',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    KisiEklePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Resim Seçerken Hata');
        });
    };
    // Create a new name for the image
    KisiEklePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    KisiEklePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Dosyayi Kaydederken Hata');
        });
    };
    KisiEklePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    KisiEklePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    KisiEklePage.prototype.uploadImage = function () {
        var _this = this;
        // Destination URL
        var url = "http://" + this.ip + "/kisiekle";
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        //var myInput = document.getElementById("inputum").nodeValue;
        console.log(this.name);
        if (this.name == "") {
            var alert_1 = this.alertCtrl.create({
                title: "Hata",
                subTitle: "İsim alanı boş bırakılamaz!",
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        console.log(this.name);
        var options = {
            fileKey: "file",
            fileName: filename,
            person_name: this.name,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {
                'file': filename,
                'person_name': this.name
            }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Yükleniyor...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        this.dataProvider.registerFace(targetPath, options).then(function (data) {
            _this.loading.dismissAll();
            var myParse = JSON.parse(data.response);
            console.log('myParse : ', myParse);
            var encoding = myParse.encoding;
            var face_found = myParse.face_found;
            if (encoding == 1 && face_found == 1) {
                var alert_2 = _this.alertCtrl.create({
                    subTitle: "Kisi Eklendi",
                    buttons: ['OK']
                });
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tab_tab__["a" /* TabPage */]);
                alert_2.present();
            }
            else if (face_found == 0) {
                var alert_3 = _this.alertCtrl.create({
                    subTitle: "Kisi Bulunamadi",
                    buttons: ['OK']
                });
                alert_3.present();
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    subTitle: "Bağlanti Hatasi",
                    buttons: ['OK']
                });
                alert_4.present();
            }
            console.log(data);
            _this.presentToast('Resim başarılı bir şekilde yüklendi.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Resim yüklenirken hata!!');
        });
    };
    KisiEklePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kisi-ekle',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-ekle/kisi-ekle.html"*/'\n<ion-header>\n\n  <ion-navbar color="myColor">\n    <ion-title>Register with your face!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <ion-item>\n    <ion-input type="text" id="inputum" placeholder="Username" [(ngModel)]="name" ></ion-input>\n  </ion-item>\n\n\n\n  <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n  <h3 padding [hidden]="lastImage !== null">Take picture and register now!!</h3>\n\n\n  <ion-buttons padding>\n    <button ion-button icon-left color="myColor" (click)="presentActionSheet()">\n      <ion-icon name="camera"></ion-icon>Take Picture\n    </button>\n    <button ion-button icon-left color="myColor" (click)="uploadImage()" [disabled]="lastImage === null">\n      <ion-icon name="cloud-upload"></ion-icon>Upload\n    </button>\n  </ion-buttons>\n\n  <br>\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-ekle/kisi-ekle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data_service_data_service__["a" /* DataServiceProvider */]])
    ], KisiEklePage);
    return KisiEklePage;
}());

//# sourceMappingURL=kisi-ekle.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 234:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 234;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataServiceProvider = /** @class */ (function () {
    function DataServiceProvider(httpClient, transfer, storage) {
        this.httpClient = httpClient;
        this.transfer = transfer;
        this.storage = storage;
        this.BASE_URL = 'http://ec2-18-218-6-16.us-east-2.compute.amazonaws.com';
        this.HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
        this.HAS_LOGGED = 'hasLogged';
    }
    DataServiceProvider.prototype.ionViewDidLoad = function () {
        console.log('Hello DataServiceProvider Provider');
    };
    DataServiceProvider.prototype.loginFaceRecognition = function (targetPath, options) {
        var fileTransfer = this.transfer.create();
        return fileTransfer.upload(targetPath, this.BASE_URL + '/sifresiztanima', options);
    };
    DataServiceProvider.prototype.registerFace = function (targetPath, options) {
        var fileTransfer = this.transfer.create();
        return fileTransfer.upload(targetPath, this.BASE_URL + '/kisiekle', options);
    };
    DataServiceProvider.prototype.login = function (loginDATA) {
        return this.httpClient.post(this.BASE_URL + '/login', loginDATA);
    };
    DataServiceProvider.prototype.register = function (registerDATA) {
        return this.httpClient.post(this.BASE_URL + '/register', registerDATA);
    };
    DataServiceProvider.prototype.addPost = function (postDATA) {
        return this.httpClient.post(this.BASE_URL + '/add_posts', postDATA);
    };
    DataServiceProvider.prototype.editPost = function (editPostDATA, editPostID) {
        return this.httpClient.post(this.BASE_URL + '/edit_post' + '/' + editPostID, editPostDATA);
    };
    DataServiceProvider.prototype.removePost = function (removePostID) {
        return this.httpClient.post(this.BASE_URL + '/delete_post' + '/' + removePostID, JSON.stringify(removePostID));
    };
    DataServiceProvider.prototype.getUserPosts = function (userID) {
        return this.httpClient.get(this.BASE_URL + '/get_user_posts' + '/' + userID);
    };
    DataServiceProvider.prototype.getAllPosts = function () {
        return this.httpClient.get(this.BASE_URL + '/get_posts');
    };
    DataServiceProvider.prototype.updateProfile = function (updateProfileDATA, profileID) {
        return this.httpClient.post(this.BASE_URL + '/edit_profile' + '/' + profileID, updateProfileDATA);
    };
    DataServiceProvider.prototype.getUsers = function () {
        return this.httpClient.get(this.BASE_URL + '/users');
    };
    DataServiceProvider.prototype.getAllLocation = function (userID) {
        return this.httpClient.get(this.BASE_URL + '/lokasyonlaricek' + '/' + userID);
    };
    DataServiceProvider.prototype.getUserProfile = function (userID) {
        return this.httpClient.get(this.BASE_URL + '/user_info' + '/' + userID);
    };
    DataServiceProvider.prototype.checkHasSeenTutorial = function () {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then(function (value) {
            return value;
        });
    };
    ;
    DataServiceProvider.prototype.checkHasLogged = function () {
        return this.storage.get(this.HAS_LOGGED).then(function (value) {
            return value;
        });
    };
    ;
    DataServiceProvider.prototype.sendInterest = function (userID, interestDATA) {
        return this.httpClient.post(this.BASE_URL + '/interests' + '/' + userID, interestDATA);
    };
    DataServiceProvider.prototype.setLocation = function (userID, locDATA) {
        return this.httpClient.post(this.BASE_URL + '/setUserLocation' + '/' + userID, locDATA);
    };
    DataServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], DataServiceProvider);
    return DataServiceProvider;
}());

//Data adaptor data reader , yemek classlarıyla ilgili soru , adonet
//Typescript enum interests
//# sourceMappingURL=data-service.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SohbetlerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_room_chat_room__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__group_chat_room_group_chat_room__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__new_message_new_message__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_chat_view_chat_view__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SohbetlerPage = /** @class */ (function () {
    function SohbetlerPage(navCtrl, navParams, menuCtrl, nav, events, http, storage, socket, chatViewProvider, event) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.nav = nav;
        this.events = events;
        this.http = http;
        this.storage = storage;
        this.socket = socket;
        this.chatViewProvider = chatViewProvider;
        this.event = event;
        this.users = [];
        this.msg = "ozel";
        this.chat_group = [
            {
                id: 1,
                kanal: 'Sport',
                photo: "https://i.hizliresim.com/1pm6mB.jpg",
            },
            {
                id: 2,
                kanal: 'Fashion',
                photo: "https://i.hizliresim.com/gPzrzN.jpg",
            },
            {
                id: 3,
                kanal: 'Technology',
                photo: "https://i.hizliresim.com/M15VY9.jpg",
            },
            {
                id: 4,
                kanal: 'Music',
                photo: "https://i.hizliresim.com/vad6dr.png",
            },
            {
                id: 5,
                kanal: 'Economy',
                photo: "https://i.imgyukle.com/2019/05/23/kxw6ax.jpg",
            },
            {
                id: 6,
                kanal: 'Art',
                photo: "https://i.hizliresim.com/2Om6mE.jpg",
            },
            {
                id: 7,
                kanal: 'Math',
                photo: "https://i.hizliresim.com/bvAV8j.jpg",
            },
            {
                id: 8,
                kanal: 'Physics',
                photo: "https://i.imgyukle.com/2019/05/23/kxwXWo.jpg",
            },
            {
                id: 9,
                kanal: 'Engineering',
                photo: "https://i.imgyukle.com/2019/05/23/kxw2Yt.jpg",
            },
            {
                id: 10,
                kanal: 'Research',
                photo: "https://i.imgyukle.com/2019/05/23/kx0VaU.png",
            },
            {
                id: 11,
                kanal: 'Design',
                photo: "https://i.imgyukle.com/2019/05/23/kx0YHQ.jpg",
            },
            {
                id: 12,
                kanal: 'Social Media',
                photo: "https://i.imgyukle.com/2019/05/23/kx0sk0.jpg",
            }
        ];
        this.user_json = {};
        this.chat_info = {};
        this.today = new Date().toLocaleTimeString();
        menuCtrl.enable(true);
        //this.user_json = this.navParams.get('user_json');
        storage.get('log_user').then(function (log_user) {
            _this.user_json = log_user;
            console.log(_this.user_json);
        });
        this.event.subscribe('chat_info', function (chat_info) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            _this.chat_info = chat_info;
            console.log(_this.chat_info);
            _this.name = _this.chat_info.name;
            _this.date = _this.chat_info.date;
        });
        if (this.msg == 'ozel') {
            this.chatViewProvider.load();
        }
    }
    SohbetlerPage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    SohbetlerPage.prototype.goSearch = function () {
        //this.navCtrl.push(SearchPage);
    };
    SohbetlerPage.prototype.goChatRoom = function (receiver_name) {
        this.socket.connect();
        this.socket.emit('set-nickname', this.user_json.username);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chat_room_chat_room__["a" /* ChatRoomPage */], { nickname: this.user_json.username, receiver: receiver_name });
    };
    SohbetlerPage.prototype.goChatRoom2 = function (id, kanal, photo) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__group_chat_room_group_chat_room__["a" /* GroupChatRoomPage */], {
            id: id,
            kanal: kanal,
            photo: photo
        });
    };
    SohbetlerPage.prototype.goNewMessagePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__new_message_new_message__["a" /* NewMessagePage */]);
    };
    SohbetlerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sohbetler',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/sohbetler/sohbetler.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons left>\n      <button ion-button icon-only color="myColor" (click)="openMenu(\'main\')">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Chat Region</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="myColor" (click)="goSearch()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n\n\n  <ion-toolbar>\n    <ion-segment  [(ngModel)]="msg" color="myColor">\n      <ion-segment-button value="ozel">\n        Special Message\n      </ion-segment-button>\n      <ion-segment-button value="kanal">\n        Common Groups\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n\n\n\n  <ion-list  [ngSwitch]="msg" no-lines>\n\n    <!--\n    <ion-list *ngSwitchCase="\'ozel\'" >\n      <button ion-item detail-none (click)="goChatRoom()">\n        <ion-row>\n          <ion-col col-2>\n            <ion-avatar>\n              <img style="border-radius: 50%;!important;"  src="https://avatars0.githubusercontent.com/u/33656801?s=400&u=bea3678e3a38e22fd29317a00c92c97038e894ac&v=4">\n            </ion-avatar>\n          </ion-col>\n          <ion-col col-9 style="border-bottom: 0.55px solid #c8c7cc; margin-bottom: 10px; margin-left: 15px;">\n            <ion-row>\n              <ion-col col-10>\n                <h2 style="font-weight: 500; color: black;">James Ford</h2>\n              </ion-col>\n              <ion-col col-2>\n                <ion-badge color="myColor">1</ion-badge>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col col-8>\n                <p>Comment Here</p>\n              </ion-col>\n              <ion-col col-3>\n                <p>{{today}}</p>\n              </ion-col>\n            </ion-row>\n          </ion-col>\n        </ion-row>\n      </button>\n    </ion-list>\n\n    -->\n\n\n    <ion-list *ngSwitchCase="\'ozel\'" no-lines> <!--reorder="true" (ionItemReorder)="chatViewProvider.reorder($event)"-->\n      <div *ngFor="let card of chatViewProvider.cards">\n        <ion-row>\n          <ion-col col-10>\n            <button ion-item detail-none (click)="goChatRoom(card.name)">\n              <ion-row>\n                <ion-col col-2>\n                  <ion-avatar>\n                    <img style="border-radius: 50%;!important;"  src="https://avatars0.githubusercontent.com/u/33656801?s=400&u=bea3678e3a38e22fd29317a00c92c97038e894ac&v=4">\n                  </ion-avatar>\n                </ion-col>\n                <ion-col col-9 style="border-bottom: 0.55px solid #c8c7cc; margin-bottom: 10px; margin-left: 15px;">\n                  <ion-row>\n                    <ion-col col-10>\n                      <h2 style="font-weight: 500; color: black;">{{card.name}}</h2>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-8>\n                      <p>Comment Here</p>\n                    </ion-col>\n                    <ion-col col-3>\n                      <p>{{card.date}}</p>\n                    </ion-col>\n                  </ion-row>\n                </ion-col>\n              </ion-row>\n            </button>\n          </ion-col>\n          <ion-col col-2>\n            <button color="danger" clear ion-button icon-only (click)="chatViewProvider.removeCards(card)">\n              <ion-icon name="trash"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-list>\n\n\n\n\n\n\n    <ion-list *ngSwitchCase="\'kanal\'">\n\n      <ion-list>\n        <button ion-item  detail-none *ngFor="let i of chat_group" (click)="goChatRoom2(i.id,i.kanal,i.photo)">\n          <ion-row>\n            <ion-col col-2>\n              <ion-avatar>\n                <img style="border-radius: 50%;!important;" src="{{i.photo}}" >\n                <!--<img style="border-radius: 50%;!important;"  src="https://i.pinimg.com/originals/23/fa/e9/23fae92c553cb9907827ba5ec8556c27.jpg">-->\n              </ion-avatar>\n            </ion-col>\n            <ion-col col-9 style="border-bottom: 0.55px solid #c8c7cc; margin-bottom: 10px; margin-left: 15px;">\n                <ion-row>\n                  <ion-col col-10>\n                    <h2 style="font-weight: 500; color: black;">{{i.kanal}}</h2>\n                  </ion-col>\n                  <ion-col col-2>\n                    <ion-badge color="myColor">2</ion-badge>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col col-8>\n                    <p>Comment Here</p>\n                  </ion-col>\n                  <ion-col col-3>\n                    <p>{{today}}</p>\n                  </ion-col>\n                </ion-row>\n            </ion-col>\n          </ion-row>\n        </button>\n      </ion-list>\n    </ion-list>\n\n\n  </ion-list>\n\n\n\n\n  <ion-fab right bottom>\n    <button ion-fab color="myColor" (click)="goNewMessagePage()"><ion-icon name="create"></ion-icon></button>\n  </ion-fab>\n\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/sohbetler/sohbetler.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_8__providers_chat_view_chat_view__["a" /* ChatViewProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], SohbetlerPage);
    return SohbetlerPage;
}());

//# sourceMappingURL=sohbetler.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupChatRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GroupChatRoomPage = /** @class */ (function () {
    function GroupChatRoomPage(navCtrl, navParams, db, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.storage = storage;
        this.username = '';
        this.message = '';
        this.messages = [];
        this.grop_chat_id = this.navParams.get('id');
        this.group_chat_name = this.navParams.get('kanal');
        this.group_chat_photo = this.navParams.get('photo');
        this.storage.get('log_user').then(function (user) {
            _this.username = user.username;
            console.log(user);
            /**
             this.user_data = user;
             this.name_surname = this.user_data.name_surname;
             this.userId = this.user_data.id;
             this.phone_number = this.user_data.phone_number;
  
             **/
        });
        //console.log("this.group_chat_id",this.grop_chat_id);
        //console.log("this.group_chat_name",this.group_chat_name);
        this._chatSubscription = this.db.list(this.group_chat_name + '/chat').valueChanges().subscribe(function (data) {
            _this.messages = data;
            //console.log(data);
        });
        this.scrollToBottom();
    }
    GroupChatRoomPage.prototype.sendMessage = function () {
        this.scrollToBottom();
        this.db.list(this.group_chat_name + '/chat').push({
            username: this.username,
            message: this.message
        });
        this.message = '';
    };
    GroupChatRoomPage.prototype.ionViewDidLoad = function () {
        this.db.list(this.group_chat_name + '/chat').push({
            specialMessage: true,
            message: this.username + ' has joined the room'
        });
    };
    GroupChatRoomPage.prototype.ionViewWillLeave = function () {
        this._chatSubscription.unsubscribe();
        this.db.list(this.group_chat_name + '/chat').push({
            specialMessage: true,
            message: this.username + ' has left the room'
        });
    };
    GroupChatRoomPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 100);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], GroupChatRoomPage.prototype, "content", void 0);
    GroupChatRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-group-chat-room',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/group-chat-room/group-chat-room.html"*/'\n\n\n<ion-header>\n  <ion-navbar color="myColor" class="messages-page-navbar">\n    <!--<img class="chat-picture" src="https://i.pinimg.com/originals/23/fa/e9/23fae92c553cb9907827ba5ec8556c27.jpg">-->\n    <img class="chat-picture" src="{{this.group_chat_photo}}">\n\n\n    <div>\n      <ion-title class="chat-title">{{this.group_chat_name}}</ion-title>\n    </div>\n\n    <ion-buttons end>\n      <button ion-button icon-only class="attach-button"><ion-icon name="attach"></ion-icon></button>\n      <button ion-button icon-only class="options-button"><ion-icon name="more"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div id="chatMessages">\n    <div *ngFor="let message of messages" [class]="message.specialMessage ? \'message special\' : \'message\'">\n      <div [class]="message.username == username ? \'innerMessage messageRight\' : \'innerMessage messageLeft\'">\n        <div class="username">{{ message.username }}</div>\n        <div class="messageContent">{{ message.message }}</div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n\n\n<!--\n<ion-footer>\n  <ion-toolbar>\n    <div id="footer">\n      <div class="elem"><ion-input type="text" [(ngModel)]="message"></ion-input></div>\n      <div class="elem"><button ion-button icon-only (click)="sendMessage()"><ion-icon name="send"></ion-icon> </button></div>\n    </div>\n  </ion-toolbar>\n</ion-footer>\n\n-->\n\n\n<ion-footer>\n  <ion-toolbar color="myColor" class="messages-page-footer" position="bottom">\n    <ion-input [(ngModel)]="message" class="message-editor" placeholder="Bir mesaj yaz"></ion-input>\n\n    <ion-buttons end>\n      <button ion-button icon-only class="message-editor-button" (click)="sendMessage()">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n\n\n<!--\n\n<ion-content padding class="messages-page-content">\n\n  <ion-scroll scrollY="true" class="messages"><br>\n    <ion-row>\n      <ion-col col-10>\n        <ion-grid class="message-mine">\n          <ion-row>\n            <ion-col col-9>\n              <span class="user_name">James Ford</span><br>\n              <span>Selam</span>\n              <div class="time">18.07.2018</div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <p class="test2"></p>\n      </ion-col>\n    </ion-row>\n\n\n    <ion-row>\n      <ion-col col-10 offset-2>\n        <ion-grid class="message-other">\n          <ion-row>\n            <ion-col col-9>\n              <span class="user_name">Jack</span><br>\n              <span>İyidir</span>\n              <div class="time">18.07.2018</div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <p class="test"></p>\n      </ion-col>\n    </ion-row>\n\n  </ion-scroll>\n\n\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar color="myColor" class="messages-page-footer" position="bottom">\n    <ion-input [(ngModel)]="message" (keypress)="onInputKeypress($event)" class="message-editor" placeholder="Bir mesaj yaz"></ion-input>\n\n    <ion-buttons end>\n      <button ion-button icon-only class="message-editor-button" (click)="sendTextMessage()">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n\n\n\n-->\n\n\n<!--\n<ion-header>\n  <ion-toolbar color="myColor">\n    <ion-buttons left>\n      <button ion-button icon-only color="light" (click)="goToBackTab()" >\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <ion-row>\n        <ion-col col-2>\n          <ion-avatar>\n            <img style="border-radius: 50%;!important;"  margin-top="2px" src="https://avatars0.githubusercontent.com/u/33656801?s=400&u=bea3678e3a38e22fd29317a00c92c97038e894ac&v=4">\n          </ion-avatar>\n        </ion-col>\n        <ion-col col-10>\n          <h2>Murat Özer</h2>\n        </ion-col>\n      </ion-row>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="light">\n        <ion-icon name="call"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n\n\n\n-->\n\n<!--\n<ion-content style="background-color: wheat">\n  <ion-grid>\n    <ion-row>\n\n      <ion-col col-9 style="background: white; border-radius: 10px">\n        <span class="user_name">Murat:</span><br>\n        <span>Selam</span>\n        <div class="time">18.07.2018</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid><br>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col offset-3 col-9 style="background-color: #0db280; border-radius: 10px">\n        <span class="user_name">Deniz:</span><br>\n        <span>İyidir</span>\n        <div class="time">18.07.2018</div>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-row class="message_row">\n      <ion-col col-9>\n        <ion-item no-lines>\n          <ion-input type="text" placeholder="Message"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button clear color="myColor">\n          Send\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>\n\n\n-->\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/group-chat-room/group-chat-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], GroupChatRoomPage);
    return GroupChatRoomPage;
}());

//# sourceMappingURL=group-chat-room.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewMessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_room_chat_room__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_ChatViewModel__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_chat_view_chat_view__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var NewMessagePage = /** @class */ (function () {
    function NewMessagePage(navCtrl, navParams, httpClient, dataProvider, socket, storage, chatViewProvider, event) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.dataProvider = dataProvider;
        this.socket = socket;
        this.storage = storage;
        this.chatViewProvider = chatViewProvider;
        this.event = event;
        this.searchTerm = '';
        this.searching = false;
        this.searchQuery = '';
        this.all_users = {};
        this.user_json = {};
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]();
    }
    NewMessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad NewMessagePage');
        this.dataProvider.getUsers().subscribe(function (data) {
            _this.all_users = data;
            console.log(_this.all_users);
        });
        //this.user_json = this.navParams.get('user_json');
        this.storage.get('log_user').then(function (log_user) {
            _this.user_json = log_user;
            console.log(_this.user_json);
        });
        /**
          this.setFilteredItems();
    
          this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    
              this.searching = false;
              this.setFilteredItems();
    
          });
    
         **/
    };
    NewMessagePage.prototype.goChatRoom = function (name, id) {
        this.today = new Date().toLocaleTimeString();
        this.socket.connect();
        this.socket.emit('set-nickname', this.user_json.username);
        var chat_info = {
            name: this.user_json.username,
            date: this.today
        };
        this.event.publish('chat_info', chat_info);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chat_room_chat_room__["a" /* ChatRoomPage */], { nickname: this.user_json.username, receiver: name });
        var card = new __WEBPACK_IMPORTED_MODULE_9__models_ChatViewModel__["a" /* ChatViewModel */](name, this.today);
        this.chatViewProvider.addCards(card);
    };
    NewMessagePage.prototype.onSearchInput = function () {
        this.searching = true;
    };
    NewMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-new-message',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/new-message/new-message.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>NewMessagePage</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n\n    <!--\n    <br>\n    <ion-searchbar [(ngModel)]="searchTerm" [formControl]="searchControl" (ionInput)="onSearchInput()" clearInput="true" placeholder="Ara" animated="true"  debounce="500"></ion-searchbar>\n    <br><br>\n\n    -->\n\n\n    <ion-list no-lines>\n      <ion-list-header>\n        <p>Following <ion-badge color="myColor">10</ion-badge></p>\n      </ion-list-header>\n      <ion-item *ngFor="let i of all_users.users">\n        <button ion-item detail-none (click)="goChatRoom(i.name,i.id)">{{i.name}}</button>\n      </ion-item>\n\n    </ion-list>\n\n\n\n\n  </ion-list>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/new-message/new-message.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_10__providers_chat_view_chat_view__["a" /* ChatViewProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], NewMessagePage);
    return NewMessagePage;
}());

//# sourceMappingURL=new-message.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_post_edit_post__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menuCtrl, dataProvider, alertCtrl, modalCtrl, storage, geolocation, toastCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.geolocation = geolocation;
        this.toastCtrl = toastCtrl;
        this.likee = 5;
        this.user = {
            name: 'James Ford',
            profileImage: 'https://avatars1.githubusercontent.com/u/33656801?s=460&v=4',
            coverImage: 'https://aapsonline.org/wp/wp-content/uploads/2015/12/MatrixCode.jpg',
            occupation: 'Software Developer',
            location: 'Istanbul, Turkey',
            description: 'because limits like fears are often just an illusion.',
            followers: 456,
            following: 1052,
            posts: 35
        };
        this.user_json = {};
        menuCtrl.enable(true);
    }
    HomePage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dataProvider.getAllPosts().subscribe(function (data) {
            _this.response_posts = data;
            console.log(_this.response_posts);
            _this.articles = _this.response_posts.data.articles;
        });
        this.storage.get('log_user').then(function (log_user) {
            _this.geolocation.getCurrentPosition().then(function (resp) {
                var MyLat = resp.coords.latitude;
                var MyLng = resp.coords.longitude;
                console.log("Res lati : ", resp.coords.latitude);
                console.log("Res longi : ", resp.coords.longitude);
                var locData = {
                    latitude: MyLat,
                    longitude: MyLng
                };
                _this.dataProvider.setLocation(log_user.id, locData).subscribe(function (data) {
                    console.log(data);
                });
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
        });
    };
    HomePage.prototype.editPost = function (id) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__edit_post_edit_post__["a" /* EditPostPage */], { id: id });
        modal.present();
    };
    HomePage.prototype.removePost = function (id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '<strong>Are you sure?</strong>',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: function (blah) {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Remove',
                    handler: function () {
                        _this.dataProvider.removePost(id).subscribe(function (data) {
                            console.log(data);
                            _this.resp_delete = data;
                        });
                        _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.imageTapped = function (post) {
        var toast = this.toastCtrl.create({
            message: 'Post image clicked.',
            duration: 2000
        });
        toast.present();
    };
    HomePage.prototype.comment = function (post) {
        var toast = this.toastCtrl.create({
            message: 'Comments clicked',
            duration: 2000
        });
        toast.present();
    };
    HomePage.prototype.like = function (post) {
        this.likee = this.likee + 1;
        var toast = this.toastCtrl.create({
            message: 'Like clicked',
            duration: 2000
        });
        toast.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar color="myWhite">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'main\')">\n        <ion-icon name="menu" color="myColor"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Home Page</ion-title>\n    <!--\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'user\')">\n        <ion-icon name="contact"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    -->\n  </ion-toolbar>\n</ion-header>\n\n\n\n\n<ion-content>\n\n  <ion-card *ngFor="let post of articles" style="box-shadow: 0px 11px 20px -3px rgba(142, 136, 146, 0.75);">\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="https://avatars1.githubusercontent.com/u/33656801?s=460&v=4">\n      </ion-avatar>\n      <h2 class="sticky">{{post.author}}</h2>\n      <p>{{post.create_date}}</p>\n    </ion-item>\n    <img src="https://i.hizliresim.com/bV7lP8.jpg" (click)="imageTapped(post)">\n    <ion-card-title text-center>\n      <p>{{post.title}}</p>\n    </ion-card-title>\n    <ion-card-content>\n      <p>{{post.body}}</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col col-4>\n        <button ion-button color="myColor" clear small icon-left (click)="like(post)">\n          <ion-icon name=\'thumbs-up\'></ion-icon>\n          {{likee}} Likes\n        </button>\n      </ion-col>\n\n      <!--\n      <ion-col col-4 align-self-center text-center>\n        <button color="myColor" ion-button icon-only (click)="editPost(post.id)">\n          <ion-icon name="create"></ion-icon>\n        </button>\n      </ion-col>\n\n      <ion-col col-1>\n        <button color="myColor" ion-button icon-only (click)="removePost(post.id)">\n          <ion-icon name="trash" ></ion-icon>\n        </button>\n      </ion-col>\n\n      -->\n\n    </ion-row>\n  </ion-card>\n\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditProfilePage = /** @class */ (function () {
    function EditProfilePage(navCtrl, navParams, viewCtrl, loadingCtrl, alertCtrl, dataProvider, storage, camera, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dataProvider = dataProvider;
        this.storage = storage;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.placeholderPicture = 'https://api.adorable.io/avatar/200/bob';
        // You can get this data from your API. This is a dumb data for being an example.
        this.user_data = {
            profile_img: '',
            name_surname: 'Özer',
            username: 'ryuz4k1',
            website: 'https://github.com/ryuz4k1',
            description: 'Software developer',
            email: 'ozer@gmail.com',
            phone: '',
            gender: 'male'
        };
        this.storage.get('log_user').then(function (user_info) {
            console.log(user_info);
            _this.id = user_info.id;
            _this.login_check = user_info.login_check;
        });
    }
    EditProfilePage.prototype.updateProfile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            duration: 200
        });
        var user_more_info = {
            name: this.name,
            email: this.email,
            website: this.website,
            about: this.about,
            job: this.job,
            phone: this.phone,
            gender: this.gender
        };
        this.dataProvider.updateProfile(user_more_info, this.id).subscribe(function (data) {
            console.log(data);
        });
        loader.present().then(function () { return _this.navCtrl.pop(); }); // Get back to profile page. You should do that after you got data from API
        console.log(this.gender);
    };
    EditProfilePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditProfilePage.prototype.selectGender = function () {
        var alert = this.alertCtrl.create({
            title: 'Select Gender',
            inputs: [
                {
                    type: 'radio',
                    label: 'Female',
                    value: '0'
                },
                {
                    type: 'radio',
                    label: 'Male',
                    value: '1'
                }
            ],
            buttons: [
                {
                    text: 'İptal',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Tamam',
                    handler: function () {
                        console.log('OK clicked: ');
                        // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
                    }
                }
            ],
        });
        alert.present();
    };
    EditProfilePage.prototype.updateProfileImage = function () {
        var _this = this;
        this.camera.getPicture({
            quality: 50,
            allowEdit: true,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            _this.user_data.profile_img = imageData;
        }, function (err) {
            _this.toastCtrl.create({ message: err });
        });
    };
    EditProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-profile',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/edit-profile/edit-profile.html"*/'<ion-header>\n\n  <ion-navbar color="myColor">\n    <ion-buttons start left>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Edit Profile</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="updateProfile()">\n        <ion-icon name="checkmark" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content margin-top="10px">\n\n  <div text-center>\n    <img [src]="user_data.profile_img ? user_data.profile_img : placeholderPicture" class="edit-avatar" alt="">\n    <!--<img [src]="user_data.profile_img" class="edit-avatar" alt="">-->\n    <p (click)="updateProfileImage()" class="change-text">Change Photo</p>\n  </div>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="clipboard" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="name" placeholder="Name" [(ngModel)]="name"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="globe" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="website" placeholder="Website" [(ngModel)]="website"></ion-input>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="laptop" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="job" placeholder="Job" [(ngModel)]="job"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="quote" color="gray"></ion-icon>\n    </ion-label>\n    <ion-textarea placeholder="" [value]="about" placeholder="About" [(ngModel)]="about"></ion-textarea>\n  </ion-item>\n\n  <div margin padding-top>\n    <h4 no-margin no-padding class="info-text">Private Information</h4>\n    <hr class="custom-hr" color="gray">\n  </div>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="mail" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="email" placeholder="Email" [(ngModel)]="email"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="phone-portrait" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="phone" placeholder="Add your phone" [(ngModel)]="phone"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="transgender" color="gray"></ion-icon>\n    </ion-label>\n    <ion-select class="custom-select" [(ngModel)]="gender">\n      <ion-option value="male">Male</ion-option>\n      <ion-option value="female">Female</ion-option>\n      <ion-option value="none">Not Specified</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <br><br>\n\n</ion-content>\n\n<!--\n\n<ion-content padding>\n\n  <div text-center>\n    <img [src]="user_data.profile_img" class="edit-avatar" alt="">\n    <p class="change-text">Change Photo</p>\n  </div>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="clipboard" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="user_data.name_surname"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="person" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="user_data.username"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="globe" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="user_data.website"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="quote" color="gray"></ion-icon>\n    </ion-label>\n    <ion-textarea placeholder="" [value]="user_data.description"></ion-textarea>\n  </ion-item>\n\n  <div margin-top padding-top>\n    <h4 no-margin no-padding class="info-text">Private Information</h4>\n    <hr class="custom-hr" color="gray">\n  </div>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="mail" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="user_data.email"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="phone-portrait" color="gray"></ion-icon>\n    </ion-label>\n    <ion-input type="text" [value]="user_data.phone" placeholder="Add your phone"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      <ion-icon name="transgender" color="gray"></ion-icon>\n    </ion-label>\n    <ion-select class="custom-select" [(ngModel)]="gender">\n      <ion-option value="male">Male</ion-option>\n      <ion-option value="female">Female</ion-option>\n      <ion-option value="none">Not Specified</ion-option>\n    </ion-select>\n  </ion-item>\n\n</ion-content>\n\n-->\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/edit-profile/edit-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], EditProfilePage);
    return EditProfilePage;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_network_service_network_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddPostPage = /** @class */ (function () {
    function AddPostPage(navCtrl, navParams, viewCtrl, loadingCtrl, actionSheetCtrl, camera, transfer, file, filePath, toastCtrl, platform, alertCtrl, httpClient, networkServiceProvider, dataProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.httpClient = httpClient;
        this.networkServiceProvider = networkServiceProvider;
        this.dataProvider = dataProvider;
        this.storage = storage;
        this.lastImage = null;
        this.name = '';
    }
    AddPostPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('log_user').then(function (user) {
            _this.username = user.username;
            _this.user_id = user.id;
            console.log(user);
            /**
             this.user_data = user;
             this.name_surname = this.user_data.name_surname;
             this.userId = this.user_data.id;
             this.phone_number = this.user_data.phone_number;
  
             **/
        });
        console.log('ionViewDidLoad AddPostPage');
    };
    AddPostPage.prototype.addPost = function () {
        var _this = this;
        if (this.networkServiceProvider.getConnectionStatus()) {
            if (this.title != null && this.body != null) {
                var post_data = {
                    title: this.title,
                    author: this.username,
                    body: this.body,
                    user_id: this.user_id
                };
                this.dataProvider.addPost(post_data).subscribe(function (data) {
                    var loader = _this.loadingCtrl.create({
                        duration: 200
                    });
                    _this.myPostResponse = data;
                    console.log(_this.myPostResponse);
                    var status = _this.myPostResponse.data.error;
                    var alert = _this.alertCtrl.create({
                        title: "You shared a post!!",
                        subTitle: status,
                        buttons: [{ text: 'Tamam', role: 'cancel' }]
                    });
                    loader.present().then(function () { return _this.navCtrl.pop(); }); // Get back to profile page. You should do that after you got data from API
                    alert.present();
                });
            }
            else {
                var alert_1 = this.alertCtrl.create({
                    title: "Do not leave empty",
                    subTitle: "Please do not leave space!",
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                alert_1.present();
            }
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Connection Error!',
                subTitle: 'Please make sure your Internet is connected!',
                buttons: ['OK']
            });
            alert_2.present();
        }
        /**
          let loader = this.loadingCtrl.create({
              duration: 200
          });
          loader.present().then( () => this.navCtrl.pop() ); // Get back to profile page. You should do that after you got data from API
  
          if(this.lastImage != null){
              let card = new ChatViewModel(this.body,this.name,this.lastImage);
              this.cardProvider.addProject(card);
          }
          else{
              let card = new ChatViewModel(this.body,this.name,'assets/imgs/background/background-2.jpg');
              this.cardProvider.addProject(card);
          }
  
         **/
    };
    AddPostPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddPostPage.prototype.presentActionSheet = function () {
        //this.takePicture(this.camera.PictureSourceType.CAMERA);
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Resim Kaynağını Seç',
            buttons: [
                {
                    text: 'Galeriden Yükle',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Kamerayi Kullan',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'İptal',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    AddPostPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Resim Seçerken Hata');
        });
    };
    // Create a new name for the image
    AddPostPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    AddPostPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Dosyayi Kaydederken Hata');
        });
    };
    AddPostPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    AddPostPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    AddPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-post',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/add-post/add-post.html"*/'<ion-header>\n\n  <ion-navbar color="myColor">\n    <ion-buttons start left>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Add Post</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addPost()">\n        <ion-icon name="checkmark" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n\n\n  <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n\n\n  <div>\n    <ion-label position="fixed"><h3>Title : </h3></ion-label>\n    <ion-input no-margin no-padding class="info-text" [(ngModel)]="title"></ion-input>\n    <hr class="custom-hr" color="gray">\n  </div>\n\n  <br>\n\n  <div no-border>\n    <ion-label position="fixed"><h3>Body : </h3></ion-label>\n    <ion-textarea [(ngModel)]="body" class="textKutu"></ion-textarea>\n  </div>\n\n  <br>\n\n\n  <h3 padding [hidden]="lastImage !== null">Upload photo in your article</h3>\n\n  <ion-buttons padding>\n    <button ion-button icon-left color="myColor" (click)="presentActionSheet()">\n      <ion-icon name="camera"></ion-icon>Upload Image\n    </button>\n  </ion-buttons>\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/add-post/add-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_7__providers_network_service_network_service__["a" /* NetworkServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
    ], AddPostPage);
    return AddPostPage;
}());

//# sourceMappingURL=add-post.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, alertCtrl, zone, geolocation, loadingCtrl, http, modalCtrl, app, platform, httpClient, menuCtrl, dataProvider, event, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.app = app;
        this.platform = platform;
        this.httpClient = httpClient;
        this.menuCtrl = menuCtrl;
        this.dataProvider = dataProvider;
        this.event = event;
        this.storage = storage;
        this.result = [];
        this.nearbyItems = new Array();
        platform.ready().then(function () {
            _this.tryGeolocation();
        });
        var elem = document.createElement("div");
        this.markers = [];
        this.loading = this.loadingCtrl.create();
        menuCtrl.enable(true);
    }
    MapPage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    MapPage.prototype.ionViewDidLoad = function () {
    };
    MapPage.prototype.tryGeolocation = function () {
        //Location function
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            //myLatlong is a variable keeps data which is coming from json data
            var myLatLong = { lat: resp.coords.latitude, lng: resp.coords.longitude, name: 'Burdasın' };
            _this.MyLat = resp.coords.latitude;
            _this.MyLng = resp.coords.longitude;
            //Create map
            _this.map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLong,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControl: true,
                streetViewControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                fullscreenControl: true
            });
            //Marker
            var marker = new google.maps.Marker({
                position: myLatLong,
                map: _this.map,
                icon: 'https://i.imgyukle.com/2019/03/27/6PXhH.png'
            });
            //Push the marker in the markes
            _this.markers.push(marker);
            //Set the location in the center
            _this.map.setCenter(myLatLong);
            //Info Window
            var infoWindow = new google.maps.InfoWindow({});
            //Info window open when I click it
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(myLatLong.name);
                infoWindow.open(this.map, marker);
            });
            _this.AdresleriListele(resp.coords.latitude, resp.coords.longitude);
        }).catch(function (error) {
            alert(error);
            _this.loading.dismiss();
        });
        //this.http.get("http://localhost/frem/api/?api=lokasyonlaricek&lat="+resp.coords.latitude+"&lng="+resp.coords.longitude)
    };
    MapPage.prototype.AdresleriListele = function (MyLat, MyLong) {
        var _this = this;
        var myLatLong = { lat: MyLat, lng: MyLong, name: 'Burdasın' };
        console.log(myLatLong);
        this.storage.get('log_user').then(function (user_json) {
            _this.user_json = user_json;
            _this.dataProvider.getAllLocation(_this.user_json.id).subscribe(function (mapData) {
                console.log(mapData);
                //var locData = mapData.locations;
                var locData = mapData.data.yakin_lokasyonlar;
                var _loop_1 = function () {
                    pozisyon = { lat: parseFloat(locData[i]["latitude"]), lng: parseFloat(locData[i]["longitude"]) };
                    console.log("All pozisyon : ", pozisyon);
                    //console.log(mapData[i]["name"]);
                    var marker = new google.maps.Marker({
                        position: pozisyon,
                        map: _this.map,
                        animation: google.maps.Animation.DROP,
                        icon: 'https://i.imgyukle.com/2019/03/27/6PhE1.png'
                    });
                    //Push the marker in the markes
                    _this.markers.push(marker);
                    // Add the circle for this city to the map.
                    cityCircle = new google.maps.Circle({
                        strokeColor: '#f90405',
                        strokeOpacity: 0.1,
                        strokeWeight: 1,
                        fillColor: '#f6fff4',
                        fillOpacity: 0.1,
                        map: _this.map,
                        center: myLatLong,
                        radius: 10000
                    });
                    //var loc_isim  =  mapData[i]["name"];
                    id = locData[i]["user_id"];
                    lat = locData[i]["latitude"];
                    lng = locData[i]["longitude"];
                    content = '<!--<h5 style="color:#e74c3c;"></h5>-->' +
                        '<p style="color:#e74c3c;">Latitude : ' + lat + '</p>' +
                        '<p style="color:#e74c3c;">Longitude : ' + lng + '</p>';
                    '<button type="button" #info' + id + ' id="info' + id + '" (click)="this.navCtrl.push(ProfilePage)" style="color:#1A92E7">Daha Fazla Bilgi</button>';
                    //Info Window
                    var infoWindow = new google.maps.InfoWindow({
                        content: content
                    });
                    marker.addListener('click', function () {
                        infoWindow.open(_this.map, marker);
                    });
                    /**
                     //Info window open when I click it
                     google.maps.event.addListener(marker, 'click', function () {
                    //    infoWindow.setContent(this.latsandlongs[i]["durak_isim"]);
                    //        infoWindow.open(map, marker);
                });

                     **/
                    var sayfa = _this.navCtrl;
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            console.log(locData[i]["user_id"]);
                            sayfa.push(__WEBPACK_IMPORTED_MODULE_5__profile_profile__["a" /* ProfilePage */], { ID: locData[i]["user_id"], push: true });
                            //   infoWindow.open(map, marker);
                        };
                    })(marker, i));
                };
                var pozisyon, cityCircle, id, lat, lng, content;
                for (var i = 0; i < locData.length; i++) {
                    _loop_1();
                }
            });
        });
        /**
         for(var i=0;i<this.latsandlongs.length;i++){

            var pozisyon = {lat:parseFloat(this.latsandlongs[i]["lat"]),lng:parseFloat(this.latsandlongs[i]["lng"])};

                let  marker = new google.maps.Marker({
                    position: pozisyon,
                    map: this.map,
                    //   title: this.latsandlongs[i]["durakismi"],
                    animation: google.maps.Animation.DROP,
                    icon: 'http://duragimnerede.com/icon-50.png'
                });

                //Push the marker in the markes
                this.markers.push(marker);


                // Add the circle for this city to the map.
                var cityCircle = new google.maps.Circle({
                    strokeColor: '#9e03ff',
                    strokeOpacity: 0.1,
                    strokeWeight: 2,
                    fillColor: '#f6fff4',
                    fillOpacity: 0.1,
                    map: this.map,
                    center: myLatLong,
                    radius: 2000
                });




                var durak_ismi  =  this.latsandlongs[i]["durakismi"];
                var durak_tel = this.latsandlongs[i]["durak_tel"];
                var durak_adres = this.latsandlongs[i]["adres"];
                var id = this.latsandlongs[i]["id"];
                var lat = this.latsandlongs[i]["lat"];
                var lng = this.latsandlongs[i]["lng"];

                var content =
                    '<h5 style="color:#e74c3c;">'+durak_ismi+'</h5>'+
                    '<p style="color:#e74c3c;">Telefon : 0'+durak_tel+'</p>'+
                    '<button type="button" #info'+id+' id="info'+id+'" (click)="this.navCtrl.push(InfoPage)" style="color:#1A92E7">Daha Fazla Bilgi</button>'
                ;




                //Info Window
                let infoWindow = new google.maps.InfoWindow({
                    //      content:id
                });



                //         window.getElementById("info138").innerHTML = "bilgi var bigli";


                //marker.setMap(map);


                //Info window open when I click it
                google.maps.event.addListener(marker, 'click', function () {
                    //    infoWindow.setContent(this.latsandlongs[i]["durak_isim"]);
                    //        infoWindow.open(map, marker);
                });
                let sayfa = this.navCtrl;
                google.maps.event.addListener(marker,'click', (function(marker,i)
                {return function()
                {console.log(data[i]["id"]);
                    sayfa.push(ProfilePage,{ID:data[i]["id"]});
                    //   infoWindow.open(map, marker);
                }
                })(marker, i));


            }

         **/
    };
    MapPage.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            console.log(this.markers[i]);
            this.markers[i].setMap(null);
        }
        this.markers = [];
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/map/map.html"*/'<ion-header>\n  <ion-toolbar color="myWhite">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'main\')">\n        <ion-icon name="menu" color="myColor"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Find Match Map</ion-title>\n    <!--\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'user\')">\n        <ion-icon name="contact"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    -->\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n  <div #map id=\'map\'></div>\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interest_success_interest_success__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InterestsPage = /** @class */ (function () {
    function InterestsPage(navCtrl, navParams, toastCtrl, dataProvider, event) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.dataProvider = dataProvider;
        this.event = event;
        //interest_select = false;
        this.choosen_name = [];
        this.choosen_name_json = {};
        this.interests = [
            {
                id: 1,
                name: "Sport",
                photo: "https://i.hizliresim.com/1pm6mB.jpg",
                interest_select: false
            },
            {
                id: 2,
                name: "Art",
                photo: "https://i.hizliresim.com/2Om6mE.jpg",
                interest_select: false
            },
            {
                id: 3,
                name: "Music",
                photo: "https://i.hizliresim.com/vad6dr.png",
                interest_select: false
            },
            {
                id: 4,
                name: "Fashion",
                photo: "https://i.hizliresim.com/gPzrzN.jpg",
                interest_select: false
            },
            {
                id: 5,
                name: "Technology",
                photo: "https://i.hizliresim.com/M15VY9.jpg",
                interest_select: false
            },
            {
                id: 6,
                name: "Math",
                photo: "https://i.hizliresim.com/bvAV8j.jpg",
                interest_select: false
            },
            {
                id: 7,
                name: "Physics",
                photo: "https://i.imgyukle.com/2019/05/23/kxwXWo.jpg",
                interest_select: false
            },
            {
                id: 8,
                name: "Engineering",
                photo: "https://i.imgyukle.com/2019/05/23/kxw2Yt.jpg",
                interest_select: false
            },
            {
                id: 9,
                name: "Economy",
                photo: "https://i.imgyukle.com/2019/05/23/kxw6ax.jpg",
                interest_select: false
            },
            {
                id: 10,
                name: "Research",
                photo: "https://i.imgyukle.com/2019/05/23/kx0VaU.png",
                interest_select: false
            },
            {
                id: 11,
                name: "Design",
                photo: "https://i.imgyukle.com/2019/05/23/kx0YHQ.jpg",
                interest_select: false
            },
            {
                id: 12,
                name: "Social Media",
                photo: "https://i.imgyukle.com/2019/05/23/kx0sk0.jpg",
                interest_select: false
            }
        ];
        this.user_id = this.navParams.get('user_id');
        console.log(this.user_id);
    }
    InterestsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InterestsPage');
    };
    InterestsPage.prototype.get_selected = function (id) {
        for (var i = 0; i < this.interests.length; i++) {
            if (this.interests[i].id === id) {
                this.interests[i].interest_select = !this.interests[i].interest_select;
                if (this.interests[i].interest_select) {
                    this.choosen_name_json = {
                        int_name: this.interests[i].name,
                        int_id: this.interests[i].id
                    };
                    this.choosen_name.push(this.choosen_name_json);
                }
                else {
                    this.choosen_name_json = {
                        int_name: this.interests[i].name,
                        int_id: this.interests[i].id
                    };
                    this.choosen_name.pop(this.choosen_name_json);
                }
                console.log(this.interests[i].interest_select);
            }
        }
        console.log(this.choosen_name);
    };
    InterestsPage.prototype.tamamla = function () {
        var _this = this;
        var extra_json = {
            interests: this.choosen_name
        };
        if (extra_json != null) {
            this.dataProvider.sendInterest(this.user_id, extra_json).subscribe(function (data) {
                console.log(data);
                _this.myResponseData = data;
                console.log(_this.myResponseData.data.interests);
                var reg_info = {
                    registerdan_id: _this.user_id,
                    register_check: true
                };
                //this.navCtrl.setRoot(TabPage,{reg_info : reg_info});
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__interest_success_interest_success__["a" /* InterestSuccessPage */]);
            });
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'You need to select interest at least one',
                duration: 2000
            });
            toast.present();
        }
    };
    InterestsPage.prototype.follow = function () {
        //this.interest_select = !this.interest_select;
        var toast = this.toastCtrl.create({
            message: 'Follow user clicked.',
            duration: 2000
        });
        toast.present();
    };
    InterestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-interests',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/interests/interests.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title color="myColor">Interests Page</ion-title>\n    <ion-buttons end (click)="tamamla()">\n      <button ion-button color="myColor">\n        Finish\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n\n  <!--\n  <ion-card>\n    <ion-item>\n      <ion-label>Quantity</ion-label>\n      <ion-select>\n        <ion-option value="nes">0</ion-option>\n        <ion-option value="n64">1</ion-option>\n        <ion-option value="ps">2</ion-option>\n        <ion-option value="genesis">3</ion-option>\n        <ion-option value="saturn">More</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-card>\n\n  -->\n\n\n  <!--\n  <button ion-button icon-start *ngIf="!interest_select" small color="side_left" (click)="follow()">\n    <ion-icon item-start name="person-add"  icon="myColor"></ion-icon>\n    Not Selected\n  </button>\n  <button ion-button *ngIf="interest_select" class="follow-button" small color="myColor" (click)="follow()">Selected<ion-icon name="checkmark"></ion-icon></button>\n\n-->\n\n\n  <!--\n  <ion-row>\n    <ion-col>\n      <button icon-start *ngIf="!interest_select" small color="side_left" (click)="follow()">\n        <ion-card>\n          <img src="../assets/imgs/background/background-1.jpg"/>\n          <div class="card-title">Sport</div>\n        </ion-card>\n      </button>\n      <button icon-start *ngIf="interest_select" class="follow-button" (click)="follow()">\n        <ion-card>\n          <img src="../assets/imgs/background/background-1.jpg"/>\n          <div class="card-title">Sport</div>\n          <div class="card-subtitle"><ion-icon name="checkmark"></ion-icon></div>\n        </ion-card>\n      </button>\n    </ion-col>\n  </ion-row>\n\n  <ion-col>\n    <button icon-start *ngIf="!interest_select" small color="side_left" (click)="follow()">\n      <ion-card>\n        <img src="../assets/imgs/background/background-2.jpg"/>\n        <div class="card-title">Software</div>\n      </ion-card>\n    </button>\n    <button icon-start *ngIf="interest_select" class="follow-button" (click)="follow()">\n      <ion-card>\n        <img src="../assets/imgs/background/background-2.jpg"/>\n        <div class="card-title">Software</div>\n        <div class="card-subtitle"><ion-icon name="checkmark"></ion-icon></div>\n      </ion-card>\n    </button>\n  </ion-col>\n\n-->\n\n  <div *ngFor="let interest of interests">\n    <ion-card *ngIf="!interest.interest_select" (click)="get_selected(interest.id)">\n      <img src={{interest.photo}}/>\n      <div class="card-title">{{interest.name}}</div>\n    </ion-card>\n\n    <ion-card class="selected_card" *ngIf="interest.interest_select" (click)="get_selected(interest.id)">\n      <img src={{interest.photo}}/>\n      <div class="card-title">{{interest.name}}</div>\n      <div class="card-subtitle"><ion-icon name="checkmark"></ion-icon></div>\n    </ion-card>\n  </div>\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/interests/interests.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], InterestsPage);
    return InterestsPage;
}());

//# sourceMappingURL=interests.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterestSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InterestSuccessPage = /** @class */ (function () {
    function InterestSuccessPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InterestSuccessPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var TIME_IN_MS = 3000;
        setTimeout(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
            // somecode
        }, TIME_IN_MS);
        console.log('ionViewDidLoad InterestSuccessPage');
    };
    InterestSuccessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-interest-success',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/interest-success/interest-success.html"*/'<ion-content style="background-color: #ffffff">\n\n  <img style="margin-top: 25%; margin-left: 13%" width="300px" height="300px" src="https://i.hizliresim.com/1pm00p.png">\n\n\n\n  <!--\n  <ion-list no-lines style="background-color: transparent">\n\n    <ion-item>\n      <ion-label text-right>Hours: </ion-label>\n      <ion-input [(ngModel)]="hours" type="tel"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label text-right>Minutes: </ion-label>\n      <ion-input [(ngModel)]="minutes" type="tel"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label text-right>Seconds: </ion-label>\n      <ion-input [(ngModel)]="seconds" type="tel"></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  -->\n\n\n  <ion-row>\n    <ion-col style="text-align: center;">\n      <p style="color: #f53d3d; font-size: 18px">Your Interest saved successfully!</p>\n    </ion-col>\n  </ion-row>\n\n  <ion-row style="height: 10px;"></ion-row>\n\n  <ion-row>\n    <ion-col style="text-align: center;">\n      <p style="color: #f53d3d; font-size: 18px">Redirecting to Login Page...</p>\n    </ion-col>\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/interest-success/interest-success.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], InterestSuccessPage);
    return InterestSuccessPage;
}());

//# sourceMappingURL=interest-success.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_room_chat_room__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatHomePage = /** @class */ (function () {
    function ChatHomePage(navCtrl, socket, menuCtrl) {
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.menuCtrl = menuCtrl;
        this.nickname = '';
    }
    ChatHomePage.prototype.joinChat = function () {
        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chat_room_chat_room__["a" /* ChatRoomPage */], { nickname: this.nickname });
    };
    ChatHomePage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    ChatHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-home',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/chat-home/chat-home.html"*/'<ion-header>\n  <ion-toolbar color="myDark">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'main\')">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Join Chat</ion-title>\n\n    <!--\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'user\')">\n        <ion-icon name="contact"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    -->\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding style="background-image: url(\'https://i.pinimg.com/originals/75/70/c1/7570c17b4b27f23847b4f0d3c324caf4.jpg\')">\n  <ion-item margin-top="200px" style="border-radius: 15px">\n    <ion-label stacked>Set Nickname</ion-label>\n    <ion-input type="text" [(ngModel)]="nickname" placeholder="Nickname"></ion-input>\n  </ion-item>\n  <button ion-button full round  color="myDark" (click)="joinChat()" [disabled]="nickname === \'\'">Join Chat as {{ nickname }}</button>\n</ion-content>'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/chat-home/chat-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], ChatHomePage);
    return ChatHomePage;
}());

//# sourceMappingURL=chat-home.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PresentationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PresentationPage = /** @class */ (function () {
    function PresentationPage(navCtrl, menu, storage) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.storage = storage;
        this.showSkip = true;
        this.slide_content = [
            {
                title: "Welcome to Split APP",
                description: "Find your partner interests and communicate",
                image: "https://i.hizliresim.com/Z5g3r3.png",
            },
            {
                title: "Register system",
                description: "You can register to the system in the normal way or with face recognition.",
                image: "https://i.hizliresim.com/gPz6N0.png",
            },
            {
                title: "Getting started",
                description: "Choose your interests and start now",
                image: "https://i.hizliresim.com/Yd2Q2k.png",
            }
        ];
    }
    PresentationPage.prototype.startApp = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]).then(function () {
            _this.storage.set('hasSeenTutorial', 'true');
        });
    };
    PresentationPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    PresentationPage.prototype.ionViewWillEnter = function () {
        this.slides.update();
    };
    PresentationPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    PresentationPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], PresentationPage.prototype, "slides", void 0);
    PresentationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-presentation',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/presentation/presentation.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <ion-buttons end *ngIf="showSkip">\n      <button ion-button (click)="startApp()" color="myColor">Skip</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-slides #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager>\n\n\n\n    <ion-slide *ngFor="let slide of slide_content">\n      <img src="{{slide.image}}" class="slide-image"/>\n      <h2 class="slide-title">\n        {{slide.title}}\n      </h2>\n      <p>\n        {{slide.description}}\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="https://i.imgyukle.com/2019/05/23/kx7y7x.png" class="slide-image"/>\n      <h2 class="slide-title">Ready to Play?</h2>\n      <button color="myColor" ion-button icon-end large clear (click)="startApp()">\n        Continue\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/presentation/presentation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], PresentationPage);
    return PresentationPage;
}());

//# sourceMappingURL=presentation.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KisiMainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kisi_ekle_kisi_ekle__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__kisi_tanima_kisi_tanima__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__kisi_listele_kisi_listele__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var KisiMainPage = /** @class */ (function () {
    function KisiMainPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ip = this.navParams.get('ip');
        console.log(this.ip);
    }
    KisiMainPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KisiMainPage');
    };
    KisiMainPage.prototype.goToKisiEkle = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__kisi_ekle_kisi_ekle__["a" /* KisiEklePage */], {
            ip: this.ip
        });
    };
    KisiMainPage.prototype.goToKisiTanima = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__kisi_tanima_kisi_tanima__["a" /* KisiTanimaPage */], {
            ip: this.ip
        });
    };
    KisiMainPage.prototype.goToKisiListele = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__kisi_listele_kisi_listele__["a" /* KisiListelePage */], {
            ip: this.ip
        });
    };
    KisiMainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kisi-main',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-main/kisi-main.html"*/'<ion-header>\n  <ion-toolbar color="side_right">\n    <ion-title>Kisi İşlem Anasayfa</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <br><br><br><br><br><br><br>\n\n\n  <ion-list style="text-align:center">\n\n    <ion-row>\n      <ion-col text-center>\n        <button class="myButton" ion-button color="myColor" round (click)="goToKisiEkle()">Kisi Ekle</button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col text-center>\n        <button class="myButton" ion-button color="side_left" round (click)="goToKisiTanima()">Kisi Tanima</button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col text-center>\n        <button class="myButton" ion-button color="side_right" round (click)="goToKisiListele()">Kisi Listele</button>\n      </ion-col>\n    </ion-row>\n\n  </ion-list>\n\n\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-main/kisi-main.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], KisiMainPage);
    return KisiMainPage;
}());

//# sourceMappingURL=kisi-main.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KisiTanimaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var KisiTanimaPage = /** @class */ (function () {
    function KisiTanimaPage(navCtrl, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl, alertCtrl, navParams, tts) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.tts = tts;
        this.lastImage = null;
        this.ip = navParams.get('ip');
        console.log(this.ip);
        var url = "http://" + this.ip;
        console.log(url);
        this.locale = 'tr-TR';
    }
    KisiTanimaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KisiTanimaPage');
    };
    KisiTanimaPage.prototype.presentActionSheet = function () {
        var _this = this;
        this.takePicture(this.camera.PictureSourceType.CAMERA);
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Resim Kaynağını Seç',
            buttons: [
                {
                    text: 'Galeriden Yükle',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Kamerayi Kullan',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'İptal',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    KisiTanimaPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 1000,
            targetHeight: 1000
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Resim Seçerken Hata');
        });
    };
    // Create a new name for the image
    KisiTanimaPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    KisiTanimaPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Dosyayi Kaydederken Hata');
        });
    };
    KisiTanimaPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    KisiTanimaPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    KisiTanimaPage.prototype.uploadImage = function () {
        var _this = this;
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
            params: { 'file': filename }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Yükleniyor...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            var myParse = JSON.parse(data.response);
            console.log('myParse : ', myParse);
            var face_found = myParse.face_found;
            var person_name = myParse.person_name;
            if (person_name != 0 && face_found == 1) {
                var alert_1 = _this.alertCtrl.create({
                    title: "Merhaba " + person_name,
                    buttons: ['OK']
                });
                alert_1.present();
                _this.tts.speak({
                    text: "Merhaba " + person_name,
                    rate: 0.55,
                    locale: _this.locale
                })
                    .then(function () { return console.log('Success'); })
                    .catch(function (reason) { return console.log(reason); });
            }
            else if (face_found == 0) {
                var alert_2 = _this.alertCtrl.create({
                    title: "Yüz Bulunamadi",
                    subTitle: "Bu fotoğrafta yüz bulunamadi.",
                    buttons: ['OK']
                });
                alert_2.present();
                _this.tts.speak({
                    text: "Yüz Bulunamadi",
                    rate: 0.55,
                    locale: _this.locale
                })
                    .then(function () { return console.log('Success'); })
                    .catch(function (reason) { return console.log(reason); });
            }
            else if (person_name == 0) {
                var alert_3 = _this.alertCtrl.create({
                    title: "Kişi Bulunamadi",
                    subTitle: "Bu kişiyi  bulamadım.",
                    buttons: ['OK']
                });
                alert_3.present();
                _this.tts.speak({
                    text: "Kişi Bulunamadi",
                    rate: 0.55,
                    locale: _this.locale
                })
                    .then(function () { return console.log('Success'); })
                    .catch(function (reason) { return console.log(reason); });
            }
            console.log(data);
            _this.presentToast('Resim başarılı bir şekilde yüklendi.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Resim yüklenirken hata!!');
        });
    };
    KisiTanimaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kisi-tanima',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-tanima/kisi-tanima.html"*/'\n<ion-header>\n\n  <ion-navbar color="side_left">\n    <ion-title>Kisi Tanima Sayfasi</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n  <h3 [hidden]="lastImage !== null">Bir fotoğraf çek</h3>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color="side_left">\n    <ion-buttons>\n      <button ion-button icon-left (click)="presentActionSheet()">\n        <ion-icon name="camera"></ion-icon>Resim Çek\n      </button>\n      <button ion-button icon-left (click)="uploadImage()" [disabled]="lastImage === null">\n        <ion-icon name="cloud-upload"></ion-icon>Yükle\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-tanima/kisi-tanima.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__["a" /* TextToSpeech */]])
    ], KisiTanimaPage);
    return KisiTanimaPage;
}());

//# sourceMappingURL=kisi-tanima.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KisiListelePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var KisiListelePage = /** @class */ (function () {
    function KisiListelePage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.myData = [];
        this.myParse = [];
        this.ip = navParams.get('ip');
        console.log(this.ip);
        this.http.get('http://' + this.ip + '/kisiler').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.myData = data;
            console.log('myParse : ', _this.myData.toString());
        });
    }
    KisiListelePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KisiListelePage');
    };
    KisiListelePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kisi-listele',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-listele/kisi-listele.html"*/'\n<ion-header>\n\n  <ion-navbar color="side_right">\n    <ion-title>Kisileri Listele Sayfasi</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h2 style="color: #AE19FF">Uygulamadaki Kişiler</h2>\n\n  <ion-list *ngFor="let i of this.myData">\n    <h2>{{i}}</h2>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/kisi-listele/kisi-listele.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], KisiListelePage);
    return KisiListelePage;
}());

//# sourceMappingURL=kisi-listele.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(383);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_text_to_speech__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_server_server__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_kisi_tanima_kisi_tanima__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_kisi_ekle_kisi_ekle__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_kisi_listele_kisi_listele__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_kisi_main_kisi_main__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_test_test__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_transfer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_file_path__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_file__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_network_service_network_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ts_md5_dist_md5__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_ts_md5_dist_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_network__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_chat_home_chat_home__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_chat_room_chat_room__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ng_socket_io__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_base64__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_file_transfer_ngx__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_edit_profile_edit_profile__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_presentation_presentation__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_profile_profile__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_geolocation__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_device__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_tab_tab__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_sohbetler_sohbetler__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_group_chat_room_group_chat_room__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_map_map__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_interests_interests__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_add_post_add_post__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angularfire2__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_angularfire2_database__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_new_message_new_message__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_edit_post_edit_post__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_interest_success_interest_success__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_chat_view_chat_view__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















































var configChat = {
    apiKey: "AIzaSyDbyBpPT3lfQQEjou9YEtNN00tbjgTQWko",
    authDomain: "helloworldchat-e1105.firebaseapp.com",
    databaseURL: "https://helloworldchat-e1105.firebaseio.com",
    projectId: "helloworldchat-e1105",
    storageBucket: "helloworldchat-e1105.appspot.com",
    messagingSenderId: "1000797139453"
};
var config = { url: 'http://splitapp.openode.io/', options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_server_server__["a" /* ServerPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_kisi_main_kisi_main__["a" /* KisiMainPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_kisi_tanima_kisi_tanima__["a" /* KisiTanimaPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_kisi_ekle_kisi_ekle__["a" /* KisiEklePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_kisi_listele_kisi_listele__["a" /* KisiListelePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_chat_home_chat_home__["a" /* ChatHomePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_chat_room_chat_room__["a" /* ChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_presentation_presentation__["a" /* PresentationPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tab_tab__["a" /* TabPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_sohbetler_sohbetler__["a" /* SohbetlerPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_group_chat_room_group_chat_room__["a" /* GroupChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_interests_interests__["a" /* InterestsPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_add_post_add_post__["a" /* AddPostPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_new_message_new_message__["a" /* NewMessagePage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_edit_post_edit_post__["a" /* EditPostPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_interest_success_interest_success__["a" /* InterestSuccessPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    menuType: 'push',
                    platforms: {
                        ios: {
                            menuType: 'overlay',
                        },
                        android: {
                            menuType: 'overlay',
                        }
                    },
                    tabsHideOnSubPages: true,
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_25_ng_socket_io__["SocketIoModule"].forRoot(config),
                __WEBPACK_IMPORTED_MODULE_41_angularfire2__["a" /* AngularFireModule */].initializeApp(configChat),
                __WEBPACK_IMPORTED_MODULE_42_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_server_server__["a" /* ServerPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_kisi_main_kisi_main__["a" /* KisiMainPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_kisi_tanima_kisi_tanima__["a" /* KisiTanimaPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_kisi_ekle_kisi_ekle__["a" /* KisiEklePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_kisi_listele_kisi_listele__["a" /* KisiListelePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_chat_home_chat_home__["a" /* ChatHomePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_chat_room_chat_room__["a" /* ChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_presentation_presentation__["a" /* PresentationPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_tab_tab__["a" /* TabPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_sohbetler_sohbetler__["a" /* SohbetlerPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_group_chat_room_group_chat_room__["a" /* GroupChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_interests_interests__["a" /* InterestsPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_add_post_add_post__["a" /* AddPostPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_new_message_new_message__["a" /* NewMessagePage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_edit_post_edit_post__["a" /* EditPostPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_interest_success_interest_success__["a" /* InterestSuccessPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_21_ts_md5_dist_md5__["Md5"],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_file_transfer_ngx__["a" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_device__["a" /* Device */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_network_service_network_service__["a" /* NetworkServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_45__providers_data_service_data_service__["a" /* DataServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_47__providers_chat_view_chat_view__["a" /* ChatViewProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_chat_home_chat_home__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_presentation_presentation__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Firebase__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tab_tab__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var config = {
    apiKey: "AIzaSyDbyBpPT3lfQQEjou9YEtNN00tbjgTQWko",
    authDomain: "helloworldchat-e1105.firebaseapp.com",
    databaseURL: "https://helloworldchat-e1105.firebaseio.com",
    projectId: "helloworldchat-e1105",
    storageBucket: "helloworldchat-e1105.appspot.com",
    messagingSenderId: "1000797139453"
};
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl, storage, httpClient, event) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.httpClient = httpClient;
        this.event = event;
        this.rootPage = ''; //hasSeenTutorial için bunu aç
        this.pages = [
            { title: 'Home Page', name: 'HomePage', component: __WEBPACK_IMPORTED_MODULE_8__pages_tab_tab__["a" /* TabPage */], icon: 'home' },
            { title: 'Global Chat', name: 'ChatPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_home_chat_home__["a" /* ChatHomePage */], icon: 'chatboxes' },
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_7_Firebase__["initializeApp"](config);
        this.storage.get('log_user').then(function (user_info) {
            _this.user_json = user_info;
            console.log(_this.user_json);
            _this.username = _this.user_json.username;
            if (_this.user_json.login_check == true) {
                _this.status = 'Online';
            }
            else {
                _this.status = 'Offline';
            }
        });
        /**
        this.event.subscribe('user_info', (user_info) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
  
            this.user_json = user_info;
            console.log(this.user_json);
  
            this.username = this.user_json.username;
  
  
            if (this.user_json.login_check == true){
                this.status = 'Online';
            }
            else{
                this.status = 'Offline';
            }
  
        });
  
         **/
        this.storage.get('hasSeenTutorial')
            .then(function (hasSeenTutorial) {
            _this.storage.get('hasLogged').then(function (hasLogged) {
                if (hasSeenTutorial && hasLogged) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_tab_tab__["a" /* TabPage */];
                }
                else if (hasSeenTutorial) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_presentation_presentation__["a" /* PresentationPage */];
                }
                platform.ready().then(function () {
                    // Okay, so the platform is ready and our plugins are available.
                    // Here you can do any higher level native things you might need.
                    statusBar.styleDefault();
                    splashScreen.hide();
                });
            });
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    };
    MyApp.prototype.openTutorial = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_presentation_presentation__["a" /* PresentationPage */]);
    };
    MyApp.prototype.cikisYap = function () {
        var cikis = new Date().toLocaleString();
        console.log("End : " + cikis);
        /**
         var End = Date.now();
         console.log("End : " + End);




         let minutes = Math.floor(End / 60);
         let hours = Math.floor(minutes / 60);
         let seconds = Math.floor(End % 60);

         console.log(hours + " hrs, " + minutes + " mins, " + seconds + " secs");

         **/
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/app/app.html"*/'\n<ion-menu [content]="content" side="left" id="menu1" menuClose>\n    <ion-content>\n\n        <div class="menu-header">\n            <!--material-design-background-->\n            <img class="user-avatar" [src]="chosenPicture || placeholder" onerror="this.src=\'https://i.pinimg.com/originals/23/fa/e9/23fae92c553cb9907827ba5ec8556c27.jpg\'"\n            />\n            <p class="name">{{this.username}}</p>\n            <p class="e-mail">{{this.status}}</p>\n        </div>\n\n        <ion-list no-lines>\n            <ion-list-header>\n                Menu\n            </ion-list-header>\n            <button ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)">\n                <ion-icon item-start [name]="p.icon" color="myColor"></ion-icon>\n                {{p.title}}\n            </button>\n        </ion-list>\n\n\n        <ion-list>\n            <ion-list-header>\n                Tutorial\n            </ion-list-header>\n            <button ion-item menuClose (click)="openTutorial()">\n                <ion-icon item-start name="book" color="myColor"></ion-icon>\n                Show Presentation\n            </button>\n        </ion-list>\n\n\n        <ion-list no-lines>\n            <ion-item>\n                <button ion-item (click)="cikisYap()">\n                    <ion-icon item-start name="log-out" color="myColor"></ion-icon>\n                    Oturumu kapat\n                </button>\n            </ion-item>\n        </ion-list>\n\n    </ion-content>\n</ion-menu>\n\n\n\n<!--\n<ion-menu [content]="content" side="right" id="menu2" menuClose>\n\n\n\n    <ion-header>\n        <ion-toolbar class="user-profile">\n            <ion-grid>\n                <ion-row>\n                    <ion-col col-4>\n                        <div class="user-avatar">\n                            <img src="https://avatars0.githubusercontent.com/u/33656801?s=400&u=bea3678e3a38e22fd29317a00c92c97038e894ac&v=4">\n                        </div>\n                    </ion-col>\n                    <ion-col padding-top col-6>\n                        <h2 ion-text class="no-margin bold text-white">\n                            James Ford\n                        </h2>\n                        <span ion-text color="light">Admin</span>\n                    </ion-col>\n                    <ion-col col-2>\n                        <button ion-button large (click)="goEditProfile()"  style="background: none"><ion-icon name="color-wand"></ion-icon></button>\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-list no-lines>\n                    <ion-item style="background:none;" text-center>\n                        <button ion-button small outline round color="myDark"><p style="color: black">Etkin</p></button>\n                    </ion-item>\n                </ion-list>\n\n            </ion-grid>\n        </ion-toolbar>\n    </ion-header>\n\n\n\n    <!--\n    <ion-content>\n        <ion-list-header>\n            Online Kisiler\n        </ion-list-header>\n        <ion-list>\n\n            <button *ngFor="let user of users" ion-item detail-none (click)="goChatRoom(user.username)" >\n                <ion-row>\n                    <ion-col col-2>\n                        <ion-avatar>\n                            <img style="border-radius: 50%;!important;"  src="https://avatars0.githubusercontent.com/u/33656801?s=400&u=bea3678e3a38e22fd29317a00c92c97038e894ac&v=4">\n                        </ion-avatar>\n                    </ion-col>\n                    <ion-col>\n                        <ion-row>\n                            <ion-col col-10>\n                                <h2 style="font-weight: 500; color: black;">{{user.username}}</h2>\n                            </ion-col>\n                        </ion-row>\n                    </ion-col>\n                </ion-row>\n            </button>\n\n        </ion-list>\n\n    </ion-content>\n\n    -->\n\n\n    <!--\n\n    <ion-list>\n        <ion-item *ngFor="let row of users">\n            <h2>{{row.name}}</h2>\n        </ion-item>\n\n        <ion-item *ngIf="users.length == 0">\n            <p>Gösterilecek herhangi bir yorum mevcut değil</p>\n        </ion-item>\n\n    </ion-list>\n\n\n\n</ion-menu>\n\n-->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="app"></ion-nav>\n\n\n\n\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kisi_main_kisi_main__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServerPage = /** @class */ (function () {
    function ServerPage(navCtrl, navParams, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
    }
    ServerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServerPage');
    };
    ServerPage.prototype.sendToPages = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__kisi_main_kisi_main__["a" /* KisiMainPage */], {
            ip: this.ip
        });
    };
    ServerPage.prototype.sentToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */], {
            ip: this.ip
        });
    };
    ServerPage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    ServerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-server',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/server/server.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons left>\n      <button ion-button icon-only color="myColor" (click)="openMenu(\'main\')">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Server Page</ion-title>\n  </ion-toolbar>\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n<ion-list>\n\n    <ion-item>\n      <ion-input type="text" id="inputum" placeholder="Ip Gir" [(ngModel)]="ip" ></ion-input>\n    </ion-item>\n\n    <ion-item no-lines>\n      <button ion-button color="myColor" (click)="sendToPages()">Gönder</button>\n    </ion-item>\n\n\n    <ion-item>\n      <button ion-button color="myColor" (click)="sentToLogin()">Logine Gönder</button>\n    </ion-item>\n\n\n\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/server/server.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], ServerPage);
    return ServerPage;
}());

//# sourceMappingURL=server.js.map

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_service_data_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TestPage = /** @class */ (function () {
    function TestPage(navCtrl, navParams, alertCtrl, zone, geolocation, loadingCtrl, http, modalCtrl, app, platform, httpClient, menuCtrl, db, storage, dataProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.app = app;
        this.platform = platform;
        this.httpClient = httpClient;
        this.menuCtrl = menuCtrl;
        this.db = db;
        this.storage = storage;
        this.dataProvider = dataProvider;
        this.result = [];
        this.nearbyItems = new Array();
        //declare the variable
        this.data = {};
        this.username = '';
        this.message = '';
        this.messages = [];
        this.all_users = [];
        this.user_json = {};
        this.user1 = {
            about: null,
            email: "test11@gmail.com",
            gender: null,
            id: 47,
            interests: ['Sport', 'Art', 'Music'],
            job: null,
            latitude: null,
            loc_id: null,
            longitude: null,
            name: null,
            password: "$5$rounds=535000$k3ufpmtZEdu4wx8U$WphVy6OVDqwxB07OfIwjT.7FAQx7h7G5Wg1O6Bf3d4C",
            phone: null,
            register_date: "Tue, 09 Apr 2019 17:21:41 GMT",
            username: "test11",
            website: null
        };
        this.user2 = {
            about: null,
            email: "test10@gmail.com",
            gender: null,
            id: 46,
            interests: ['Sport', 'Art', 'Music'],
            job: null,
            latitude: null,
            loc_id: null,
            longitude: null,
            name: null,
            password: "$5$rounds=535000$9wsrOZmf.yGLtlWj$szjVV2OtgmtBGeM1KZ20OMJJNje56Wf4BNv4R2vuRL4",
            phone: null,
            register_date: "Tue, 09 Apr 2019 15:47:16 GMT",
            username: "test10",
            website: null
        };
        var elem = document.createElement("div");
        this.markers = [];
        this.loading = this.loadingCtrl.create();
        menuCtrl.enable(true);
        this.storage.get('log_user').then(function (log_user) {
            _this.user_json = log_user;
            console.log(_this.user_json);
        });
        /**
        this.username = this.navParams.get('nickname');
        console.log('Username : ' , this.username);
        this._chatSubscription = this.db.list(this.username+'/chat').valueChanges().subscribe( data => {
            this.messages = data;
            console.log(data);
        });

         **/
    }
    TestPage.prototype.findCommon = function () {
        var _this = this;
        var users_info = [];
        users_info.push(this.user1, this.user2);
        console.log(users_info);
        // just some good 'ol JS fun with objects and arrays
        // build up the data by linking speakers to sessions
        this.data = {
            info: users_info
        };
        console.log(this.data);
        // loop through each day in the schedule
        this.data.info.forEach(function (user) {
            _this.users_id = [];
            _this.users_id.push(user.id);
            user.interests.forEach(function (interest) {
                console.log(interest);
            });
            /**
            if (session.speakerNames) {
                session.speakerNames.forEach((speakerName: any) => {
                    let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
                    if (speaker) {
                        session.speakers.push(speaker);
                        speaker.sessions = speaker.sessions || [];
                        speaker.sessions.push(session);
                    }
                });
  
  
            }
  
             **/
            console.log(_this.users_id);
        });
    };
    TestPage.prototype.sendMessage = function () {
        this.db.list(this.username + '/chat').push({
            username: this.username,
            message: this.message
        });
        this.message = '';
    };
    TestPage.prototype.ionViewDidLoad = function () {
        this.db.list(this.username + '/chat').push({
            specialMessage: true,
            message: this.username + " has joined the room"
        });
    };
    TestPage.prototype.ionViewWillLeave = function () {
        this._chatSubscription.unsubscribe();
        this.db.list(this.username + '/chat').push({
            specialMessage: true,
            message: this.username + " has left the room"
        });
    };
    TestPage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    TestPage.prototype.testGeoLocation = function () {
        /**
        this.dataProvider.getLocation(this.user_json.id).subscribe(data => {
           console.log(data);
        });

         **/
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
            console.log("Res lati : ", resp.coords.latitude);
            console.log("Res longi : ", resp.coords.longitude);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
            console.log("Data lati : ", data.coords.latitude);
            console.log("Data longi : ", data.coords.latitude);
        });
    };
    TestPage.prototype.updateSearchResults = function () {
        var _this = this;
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, function (predictions, status) {
            _this.autocompleteItems = [];
            if (predictions) {
                _this.zone.run(function () {
                    predictions.forEach(function (prediction) {
                        _this.autocompleteItems.push(prediction);
                    });
                });
            }
        });
    };
    TestPage.prototype.selectSearchResult = function (item) {
        var _this = this;
        this.clearMarkers();
        this.autocompleteItems = [];
        this.geocoder.geocode({ 'placeId': item.place_id }, function (results) {
            if (status === 'OK' && results[0]) {
                _this.GooglePlaces.nearbySearch({
                    location: results[0].geometry.location,
                    radius: '10000',
                    types: ['taxi_stand'],
                    key: 'AIzaSyAGrQOvVvD5xm8SjbTikGLVl1L_BgMvRqY'
                }, function (near_places) {
                    _this.zone.run(function () {
                        _this.nearbyItems = [];
                        for (var i = 0; i < near_places.length; i++) {
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: _this.map
                            });
                            _this.markers.push(marker);
                            _this.map.setCenter(results[0].geometry.location);
                            _this.nearbyItems.push(near_places[i]);
                        }
                        _this.loading.dismiss();
                    });
                });
                var position = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng
                };
                console.log(position);
            }
        });
    };
    TestPage.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            console.log(this.markers[i]);
            this.markers[i].setMap(null);
        }
        this.markers = [];
    };
    TestPage.prototype.gonder = function () {
        var _this = this;
        this.loginData = {
            'username': this.username,
            'password': this.password
        };
        this.http.post('http://172.17.197.42:5000/api/users', this.loginData).subscribe(function (data) {
            _this.myData = data;
            console.log(JSON.stringify(_this.myData));
        });
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-test',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/test/test.html"*/'\n<ion-header>\n  <ion-toolbar color="myDark">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'main\')">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Test Page</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<br>\n\n\n<ion-content>\n\n  <ion-grid>\n    <ion-row justify-content-center>\n      <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">\n        <div text-center>\n          <h4>Login Form</h4>\n        </div>\n        <div padding>\n          <ion-item>\n            <ion-input type="text" placeholder="Username"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-input type="password" placeholder="Password"></ion-input>\n          </ion-item>\n        </div>\n\n        <div padding>\n          <button ion-button icon-start block color="myColor" tappable (click)="goToHomePage()">\n            <ion-icon name="log-in"></ion-icon>\n            LOGIN\n          </button>        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<!--\n<ion-content>\n\n <button ion-button (click)="testGeoLocation()">Get Location</button>\n\n\n<button ion-button color="myColor" (click)="findCommon()">find common</button>\n\n\n\n\n\n\n  <ion-list>\n      <ion-item *ngFor="let row of all_users">\n          <h2>{{row.name}}</h2>\n      </ion-item>\n\n      <ion-item *ngIf="all_users.length == 0">\n          <p>Gösterilecek herhangi bir yorum mevcut değil</p>\n      </ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n-->\n\n\n<!--\n\n<ion-content padding>\n\n  <div id="chatMessages">\n    <div *ngFor="let message of messages" [class]="message.specialMessage ? \'message special\' : \'message\'">\n      <div [class]="message.username == username ? \'innerMessage messageRight\' : \'innerMessage messageLeft\'">\n        <div class="username">{{ message.username }}</div>\n        <div class="messageContent">{{ message.message }}</div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <div id="footer">\n      <div class="elem"><ion-input type="text" [(ngModel)]="message"></ion-input></div>\n      <div class="elem"><button ion-button icon-only (click)="sendMessage()"><ion-icon name="send"></ion-icon> </button></div>\n    </div>\n  </ion-toolbar>\n</ion-footer>\n\n-->\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!--\n<ion-content>\n  <ion-item>\n    <ion-input type="text" id="inputum" placeholder="Username" [(ngModel)]="username" ></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-input type="text" id="inputum2" placeholder="Password" [(ngModel)]="password" ></ion-input>\n  </ion-item>\n\n\n  <button ion-button color="secondary" (click)="gonder()">Gonder</button>\n\n</ion-content>\n\n\n-->\n\n\n\n<!--\n<ion-content>\n\n  <button ion-button color="secondary" (click)="kisiListele()">Fetch Data</button>\n  <button ion-button color="primary" (click)="kisiListele2()">Fetch Data2</button>\n\n\n\n  <ion-list *ngFor="let i of myData">\n    <ion-title>\n      {{i}}\n    </ion-title>\n  </ion-list>\n\n</ion-content>\n\n-->\n\n\n<!--\n<ion-content padding class="card-background-page">\n\n\n  <button ion-button full (click)="takePhoto()" >\n    <ion-icon name="camera"></ion-icon>Take Photo\n  </button>\n\n  <ion-col col-6 *ngFor="let photo of photos; let id = index">\n    <ion-card class="block">\n      <ion-icon name="trash" class="deleteIcon" (click)="deletePhoto(id)"></ion-icon>\n      <img [src]="photo" *ngIf="photo" />\n    </ion-card>\n  </ion-col>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 >\n        <ion-card class="block">\n          <ion-icon  name="trash" class="deleteIcon"></ion-icon>\n          <img src="someimage.png" />\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n-->\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/test/test.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__providers_data_service_data_service__["a" /* DataServiceProvider */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_network_service_network_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tab_tab__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_data_service_data_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__interests_interests__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__kisi_ekle_kisi_ekle__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, http, camera, toastCtrl, loadingCtrl, alertCtrl, file, tts, nav, platform, filePath, networkServiceProvider, base64, httpClient, transfer, storage, dataProvider, event, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.tts = tts;
        this.nav = nav;
        this.platform = platform;
        this.filePath = filePath;
        this.networkServiceProvider = networkServiceProvider;
        this.base64 = base64;
        this.httpClient = httpClient;
        this.transfer = transfer;
        this.storage = storage;
        this.dataProvider = dataProvider;
        this.event = event;
        this.geolocation = geolocation;
        this.users = [];
        this.lastImage = null;
        //AES256
        this.secureKey = '5f35604280b44d"d1073f7ee83e346d8'; // Any string, the length should be 32
        this.secureIV = 'heF9BATUfWuISyO8'; // Any string, the length should be 16
        this.segment = "login";
        this.ip = this.navParams.get('ip');
        console.log('login_ip : ', this.ip);
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.takePicture = function () {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 1000,
            targetHeight: 1000,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            _this.uploadImage();
        }, function (err) {
            _this.presentToast('Resim Seçerken Hata');
        });
    };
    // Create a new name for the image
    LoginPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    LoginPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Dosyayi Kaydederken Hata');
        });
    };
    LoginPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    LoginPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    LoginPage.prototype.uploadImage = function () {
        var _this = this;
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
            params: { 'file': filename }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Yükleniyor...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        this.dataProvider.loginFaceRecognition(targetPath, options).then(function (data) {
            _this.loading.dismissAll();
            var myParse = JSON.parse(data.response);
            console.log('myParse : ', myParse);
            var face_found = myParse.face_found;
            var person_name = myParse.person_name;
            if (person_name != 0 && face_found == 1) {
                var alert_1 = _this.alertCtrl.create({
                    title: "Hoşgeldin " + person_name,
                    buttons: ['OK']
                });
                alert_1.present();
                _this.tts.speak({
                    text: "Hoşgeldin " + person_name,
                    rate: 0.55,
                    locale: _this.locale
                })
                    .then(function () { return console.log('Success'); })
                    .catch(function (reason) { return console.log(reason); });
                //this.storage.set('login:status',true);
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__tab_tab__["a" /* TabPage */]);
            }
            else if (face_found == 0) {
                var alert_2 = _this.alertCtrl.create({
                    title: "Yüz Bulunamadi",
                    subTitle: "Bu fotoğrafta yüz bulunamadi.",
                    buttons: ['OK']
                });
                alert_2.present();
                _this.tts.speak({
                    text: "Yüz Bulunamadi",
                    rate: 0.55,
                    locale: _this.locale
                })
                    .then(function () { return console.log('Success'); })
                    .catch(function (reason) { return console.log(reason); });
            }
            else if (person_name == 0) {
                var alert_3 = _this.alertCtrl.create({
                    title: "Kişi Bulunamadi",
                    subTitle: "Bu kişiyi  bulamadım.",
                    buttons: ['OK']
                });
                alert_3.present();
                _this.tts.speak({
                    text: "Kişi Bulunamadi",
                    rate: 0.55,
                    locale: _this.locale
                })
                    .then(function () { return console.log('Success'); })
                    .catch(function (reason) { return console.log(reason); });
            }
            //console.log(data);
            _this.presentToast('Resim başarılı bir şekilde yüklendi.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Resim yüklenirken hata!!');
        });
    };
    LoginPage.prototype.goToHomePage = function () {
        //this.nav.setRoot(TabPage);
        var _this = this;
        if (this.networkServiceProvider.getConnectionStatus()) {
            if (this.username != null && this.pass != null) {
                var loading_1 = this.loadingCtrl.create({ content: "Lütfen bekleyiniz..." });
                loading_1.present();
                //var md5Pass = Md5.hashStr(this.pass);
                //console.log("Md5 pass : " + md5Pass);
                var myData = {
                    username: this.username,
                    password: this.pass
                };
                //console.log("Post data : " + JSON.stringify(myData));
                this.dataProvider.login(myData).subscribe(function (data) {
                    //console.log("Dönene data :  " + JSON.stringify(data));
                    _this.myResponse = data;
                    console.log(_this.myResponse);
                    var log_in = _this.myResponse.data.log_in;
                    var error = _this.myResponse.data.error;
                    var pass_control = _this.myResponse.data.pass_control;
                    if (log_in != true) {
                        var alert_4 = _this.alertCtrl.create({
                            title: "Wrong!",
                            subTitle: error,
                            buttons: [{ text: 'OK', role: 'cancel' }]
                        });
                        alert_4.present();
                    }
                    else if (log_in == true && pass_control != true) {
                        var alert_5 = _this.alertCtrl.create({
                            title: "Wrong!",
                            subTitle: error,
                            buttons: [{ text: 'OK', role: 'cancel' }]
                        });
                        alert_5.present();
                    }
                    else {
                        var alert_6 = _this.alertCtrl.create({
                            title: "You've logged successfully",
                            subTitle: error,
                            buttons: [{ text: 'OK', role: 'cancel' }]
                        });
                        alert_6.present();
                        var id = _this.myResponse.data.id;
                        var username = _this.myResponse.data.username;
                        var login_check = _this.myResponse.data.log_in;
                        var user_json = {
                            id: id,
                            username: username,
                            login_check: login_check
                        };
                        _this.storage.set('log_user', user_json);
                        _this.event.publish('user_info', user_json);
                        _this.geolocation.getCurrentPosition().then(function (resp) {
                            var MyLat = resp.coords.latitude;
                            var MyLng = resp.coords.longitude;
                            console.log("Res lati : ", resp.coords.latitude);
                            console.log("Res longi : ", resp.coords.longitude);
                            var locData = {
                                latitude: MyLat,
                                longitude: MyLng
                            };
                            _this.dataProvider.setLocation(_this.myResponse.data.id, locData).subscribe(function (data) {
                                console.log(data);
                            });
                        }).catch(function (error) {
                            console.log('Error getting location', error);
                        });
                        var watch = _this.geolocation.watchPosition();
                        watch.subscribe(function (data) {
                            // data can be a set of coordinates, or an error (if an error occurred).
                            // data.coords.latitude
                            // data.coords.longitude
                            console.log("Data lati : ", data.coords.latitude);
                            console.log("Data longi : ", data.coords.latitude);
                        });
                        _this.storage.set('hasLogged', 'true');
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__tab_tab__["a" /* TabPage */]);
                    }
                    loading_1.dismiss();
                });
            }
            else {
                var alert_7 = this.alertCtrl.create({
                    title: "Do not leave empty",
                    subTitle: "Please do not leave space!",
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                alert_7.present();
            }
        }
        else {
            var alert_8 = this.alertCtrl.create({
                title: 'Connection Error!',
                subTitle: 'Please make sure your Internet is connected!',
                buttons: ['OK']
            });
            alert_8.present();
        }
    };
    LoginPage.prototype.goPersonalInfoPage = function () {
        //this.navCtrl.push(PersonalInfoPage);
        var _this = this;
        if (this.networkServiceProvider.getConnectionStatus()) {
            if (this.regUsername != null && this.regPass != null && this.regEmail) {
                var loading_2 = this.loadingCtrl.create({ content: "Lütfen bekleyiniz..." });
                loading_2.present();
                var regData = {
                    email: this.regEmail,
                    username: this.regUsername,
                    password: this.regPass,
                };
                this.dataProvider.register(regData).subscribe(function (data) {
                    //console.log(data);
                    //console.log("Dönene data :  " + JSON.stringify(data));
                    _this.myResponse = data;
                    var status = _this.myResponse.data.success;
                    var error = _this.myResponse.data.error;
                    var exist = _this.myResponse.data.exist;
                    if (status != true) {
                        var alert_9 = _this.alertCtrl.create({
                            title: "There is something wrong",
                            subTitle: error,
                            buttons: [{ text: 'OK', role: 'cancel' }]
                        });
                        alert_9.present();
                    }
                    else if (exist == true) {
                        var alert_10 = _this.alertCtrl.create({
                            title: "Try Again",
                            subTitle: error,
                            buttons: [{ text: 'OK', role: 'cancel' }]
                        });
                        alert_10.present();
                    }
                    else {
                        var alert_11 = _this.alertCtrl.create({
                            title: "Congrats",
                            subTitle: error,
                            buttons: [{ text: 'OK', role: 'cancel' }]
                        });
                        alert_11.present();
                        var id = _this.myResponse.data.id;
                        var user_json = {
                            id: id,
                            email: _this.regEmail,
                            username: _this.regUsername,
                            password: _this.regPass
                        };
                        //this.users.push(user_json);
                        //console.log(this.users);
                        // set a key/value
                        _this.storage.set('reg_user', user_json);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__interests_interests__["a" /* InterestsPage */], { user_id: id });
                    }
                    loading_2.dismiss();
                });
            }
            else {
                var alert_12 = this.alertCtrl.create({
                    title: "Do not leave empty",
                    subTitle: "Please do not leave space!",
                    buttons: [{ text: 'OK', role: 'cancel' }]
                });
                alert_12.present();
            }
        }
        else {
            var alert_13 = this.alertCtrl.create({
                title: 'Connection Error!',
                subTitle: 'Please make sure your Internet is connected!',
                buttons: ['OK']
            });
            alert_13.present();
        }
    };
    LoginPage.prototype.registerFace = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_16__kisi_ekle_kisi_ekle__["a" /* KisiEklePage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/login/login.html"*/'\n\n<ion-content padding class="animated fadeIn login auth-page">\n\n  <div class="login-content">\n\n    <div padding-horizontal text-center class="animated fadeInDown">\n      <div class="logo"></div>\n      <h2 ion-text class="text-primary">\n        <strong>SPLIT APP</strong>\n      </h2>\n    </div>\n\n  <ion-card box-shadow>\n    <ion-card-content style="background-color: black">\n\n      <ion-segment [(ngModel)]="segment" color="inverse">\n        <ion-segment-button value="login">\n          Login\n        </ion-segment-button>\n        <ion-segment-button value="register">\n          Register\n        </ion-segment-button>\n      </ion-segment>\n\n      <div [ngSwitch]="segment">\n\n        <div *ngSwitchCase="\'login\'" class="list-form">\n          <ion-item>\n            <ion-label floating>\n              <ion-icon name="person" item-start class="text-primary"></ion-icon>\n              Username\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="username" [ngModelOptions]="{standalone: true}"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>\n              <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n              Password\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="pass" [ngModelOptions]="{standalone: true}"></ion-input>\n          </ion-item>\n\n          <br>\n\n          <div>\n            <button ion-button icon-start block color="myColor" tappable (click)="goToHomePage()">\n              <ion-icon name="log-in"></ion-icon>\n              LOGIN\n            </button>\n\n          </div>\n        </div>\n\n        <div *ngSwitchCase="\'register\'" class="list-form">\n\n          <!--\n          <ion-item>\n            <ion-label floating>\n              <ion-icon name="person" item-start class="text-primary"></ion-icon>\n              Name\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="regName" [ngModelOptions]="{standalone: true}"></ion-input>\n          </ion-item>\n\n          -->\n\n          <ion-item>\n            <ion-label floating>\n              <ion-icon name="person" item-start class="text-primary"></ion-icon>\n              Username\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="regUsername" [ngModelOptions]="{standalone: true}"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>\n              <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n              Email\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="regEmail" [ngModelOptions]="{standalone: true}"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>\n              <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n              Password\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="regPass" [ngModelOptions]="{standalone: true}"></ion-input>\n          </ion-item>\n\n\n          <br>\n\n          <div>\n            <button ion-button icon-start block color="myColor" tappable (click)="goPersonalInfoPage()">\n              <ion-icon name="log-in"></ion-icon>\n              REGISTER\n            </button>\n          </div>\n        </div>\n      </div>\n      <button *ngIf="segment == \'login\'" ion-button block clear icon-start color="myWhite" style="background:transparent" (click)="takePicture()"><ion-icon name="camera"></ion-icon>Log in camera </button>\n      <button *ngIf="segment == \'register\' " ion-button block clear icon-start color="myWhite" style="background:transparent" (click)="registerFace()"><ion-icon name="camera"></ion-icon>Register with face </button>\n\n    </ion-card-content>\n  </ion-card>\n\n\n  </div>\n\n</ion-content>\n\n\n\n\n<!--\n<ion-content padding class="animated fadeIn login auth-page">\n  <div class="login-content">\n\n    <div padding-horizontal text-center class="animated fadeInDown">\n      <div class="logo"></div>\n      <h2 ion-text class="text-primary">\n        <strong>Global Hell</strong>\n      </h2>\n    </div>\n\n    <form class="list-form">\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="person" item-start class="text-primary"></ion-icon>\n          Username\n        </ion-label>\n        <ion-input type="text" [(ngModel)]="username" [ngModelOptions]="{standalone: true}"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n          Password\n        </ion-label>\n        <ion-input type="password" [(ngModel)]="pass" [ngModelOptions]="{standalone: true}"></ion-input>\n      </ion-item>\n    </form>\n\n    <p text-right ion-text color="myColor" tappable (click)="forgotPass()"><strong>Forgot Password?</strong></p>\n\n    <div>\n      <button ion-button icon-start block color="myColor" tappable (click)="goToHomePage()">\n        <ion-icon name="log-in"></ion-icon>\n        LOGIN\n      </button>\n\n    </div>\n\n\n    <div text-center margin-top>\n      <span ion-text color="myColor" tappable (click)="register()">New here? <strong>Sign up</strong></span>\n    </div>\n\n    <button ion-button block clear icon-start color="myColor" (click)="takePicture()"><ion-icon name="camera"></ion-icon> Kamera ile giriş</button>\n\n\n  </div>\n</ion-content>\n-->\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_7__providers_network_service_network_service__["a" /* NetworkServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_14__providers_data_service_data_service__["a" /* DataServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatRoomPage = /** @class */ (function () {
    function ChatRoomPage(navCtrl, navParams, socket, toastCtrl, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.messages = [];
        this.nickname = '';
        this.message = '';
        this.receiver = '';
        this.nickname = this.navParams.get('nickname');
        console.log(this.nickname);
        this.receiver = this.navParams.get('receiver');
        this.getMessages().subscribe(function (message) {
            _this.messages.push(message);
            console.log(message);
        });
        this.getUsers().subscribe(function (data) {
            var user = data['user'];
            if (data['event'] === 'left') {
                _this.showToast('User left: ' + user);
            }
            else {
                _this.showToast('User joined: ' + user);
            }
        });
    }
    ChatRoomPage.prototype.sendMessage = function () {
        this.scrollToBottom();
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
    };
    ChatRoomPage.prototype.getMessages = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.getUsers = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('users-changed', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    ChatRoomPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    ChatRoomPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 100);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ChatRoomPage.prototype, "content", void 0);
    ChatRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-room',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/chat-room/chat-room.html"*/'<ion-header>\n  <ion-navbar color="danger" class="messages-page-navbar">\n\n    <img class="chat-picture" src="https://avatars0.githubusercontent.com/u/33656801?s=400&u=bea3678e3a38e22fd29317a00c92c97038e894ac&v=4">\n\n    <ion-title class="chat-title">\n      <a ion-button color="danger">{{receiver}}</a>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n  <ion-grid>\n    <ion-row *ngFor="let message of messages">\n\n      <ion-col col-9 *ngIf="message.from !== nickname" class="message" [ngClass]="{\'my_message\': message.from === nickname,\'other_message\': message.from !== nickname}">\n        <span class="user_name">{{ message.from }}:</span><br>\n        <span>{{ message.text }}</span>\n        <div class="time">{{message.created | date:\'dd.MM hh:MM\'}}</div>\n      </ion-col>\n\n      <ion-col offset-3 col-9 *ngIf="message.from === nickname" class="message" [ngClass]="{\'my_message\': message.from === nickname,\'other_message\': message.from !== nickname}">\n        <span class="user_name">{{ message.from }}:</span><br>\n        <span>{{ message.text }}</span>\n        <div class="time">{{message.created | date:\'dd.MM hh:MM\'}}</div>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-row class="message_row">\n      <ion-col col-9>\n        <ion-item no-lines>\n          <ion-input type="text" placeholder="Message" [(ngModel)]="message"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button clear color="myColor" (click)="sendMessage()" [disabled]="message === \'\'">\n          Send\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/chat-room/chat-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
    ], ChatRoomPage);
    return ChatRoomPage;
}());

//# sourceMappingURL=chat-room.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sohbetler_sohbetler__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_map__ = __webpack_require__(346);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabPage = /** @class */ (function () {
    function TabPage(navCtrl, navParams, events, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.onlypage = false;
        this.tab0root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab1root = __WEBPACK_IMPORTED_MODULE_2__sohbetler_sohbetler__["a" /* SohbetlerPage */];
        this.tab2root = __WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */];
        this.tab3root = __WEBPACK_IMPORTED_MODULE_5__map_map__["a" /* MapPage */];
        menuCtrl.enable(true);
        //this.reg_info = this.navParams.get('reg_info');
        //this.registerdan_id = this.reg_info.registerdan_id;
        //this.register_check = this.reg_info.register_check;
    }
    TabPage.prototype.openMenu = function (evt) {
        if (evt === "main") {
            this.menuCtrl.enable(true, 'menu1');
            this.menuCtrl.enable(false, 'menu2');
        }
        else {
            this.menuCtrl.enable(true, 'menu2');
            this.menuCtrl.enable(false, 'menu1');
        }
        this.menuCtrl.toggle();
    };
    TabPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabPage');
    };
    TabPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tab',template:/*ion-inline-start:"/Users/muratozer/Desktop/helloWorld/src/pages/tab/tab.html"*/'<ion-tabs   tabsHideOnSubPages="true" [selectedIndex]="0">\n  <ion-tab [root]="tab0root" tabTitle="Home Page" tabIcon="home" color="myColor"></ion-tab>\n  <ion-tab [root]="tab1root" tabTitle="Sohbetler" tabIcon="chatbubbles" tabBadge="3" tabBadgeStyle="danger"></ion-tab>\n  <ion-tab [root]="tab2root" tabTitle="Profile" tabIcon="person"></ion-tab>\n  <ion-tab [root]="tab3root" tabTitle="Find Match" tabIcon="map"></ion-tab>\n</ion-tabs>\n\n'/*ion-inline-end:"/Users/muratozer/Desktop/helloWorld/src/pages/tab/tab.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], TabPage);
    return TabPage;
}());

//# sourceMappingURL=tab.js.map

/***/ })

},[364]);
//# sourceMappingURL=main.js.map