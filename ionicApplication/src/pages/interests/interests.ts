import { Component } from '@angular/core';
import {Events,NavController, NavParams, ToastController} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {TabPage} from "../tab/tab";
import {LoginPage} from "../login/login";
import {InterestSuccessPage} from "../interest-success/interest-success";
import {EditProfilePage} from "../edit-profile/edit-profile";


@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {


    //interest_select = false;


    choosen_name:any = [];
    choosen_name_json:any = {};

    myResponseData:any;


    interests = [
        {
            id : 1,
            name : "Sport",
            photo : "https://i.hizliresim.com/1pm6mB.jpg",
            interest_select : false
        },
        {
            id : 2,
            name : "Art",
            photo : "https://i.hizliresim.com/2Om6mE.jpg",
            interest_select : false
        },
        {
            id : 3,
            name : "Music",
            photo : "https://i.hizliresim.com/vad6dr.png",
            interest_select : false

        },
        {
            id : 4,
            name : "Fashion",
            photo : "https://i.hizliresim.com/gPzrzN.jpg",
            interest_select : false
        },
        {
            id : 5,
            name : "Technology",
            photo : "https://i.hizliresim.com/M15VY9.jpg",
            interest_select : false
        },
        {
            id : 6,
            name : "Math",
            photo : "https://i.hizliresim.com/bvAV8j.jpg",
            interest_select : false
        },
        {
            id : 7,
            name : "Physics",
            photo : "https://i.imgyukle.com/2019/05/23/kxwXWo.jpg",
            interest_select : false
        },
        {
            id : 8,
            name : "Engineering",
            photo : "https://i.imgyukle.com/2019/05/23/kxw2Yt.jpg",
            interest_select : false
        },
        {
            id : 9,
            name : "Economy",
            photo : "https://i.imgyukle.com/2019/05/23/kxw6ax.jpg",
            interest_select : false
        },
        {
            id : 10,
            name : "Research",
            photo : "https://i.imgyukle.com/2019/05/23/kx0VaU.png",
            interest_select : false
        },
        {
            id : 11,
            name : "Design",
            photo : "https://i.imgyukle.com/2019/05/23/kx0YHQ.jpg",
            interest_select : false
        },
        {
            id : 12,
            name : "Social Media",
            photo : "https://i.imgyukle.com/2019/05/23/kx0sk0.jpg",
            interest_select : false
        }


    ];

    user_id:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl : ToastController,
                public dataProvider : DataServiceProvider,
                public event : Events
    )

    {


        this.user_id = this.navParams.get('user_id');
        console.log(this.user_id);


    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');
  }



    get_selected(id){

        for (var i = 0; i < this.interests.length; i++) {
            if (this.interests[i].id === id) {
                this.interests[i].interest_select = !this.interests[i].interest_select;
                if (this.interests[i].interest_select){

                    this.choosen_name_json = {
                        int_name : this.interests[i].name,
                        int_id : this.interests[i].id
                    };
                    this.choosen_name.push(this.choosen_name_json );

                }
                else{
                    this.choosen_name_json = {
                        int_name : this.interests[i].name,
                        int_id : this.interests[i].id
                    };
                    this.choosen_name.pop( this.choosen_name_json );
                }

                console.log(this.interests[i].interest_select);
            }

        }
        console.log(this.choosen_name);




    }


    tamamla(){

        var extra_json = {
            interests : this.choosen_name
        };

        if (extra_json != null){
            this.dataProvider.sendInterest(this.user_id,extra_json).subscribe(data => {
                console.log(data);

                this.myResponseData = data;
                console.log(this.myResponseData.data.interests);


                var reg_info = {
                    registerdan_id : this.user_id,
                    register_check: true
                };

                //this.navCtrl.setRoot(TabPage,{reg_info : reg_info});
                this.navCtrl.setRoot(InterestSuccessPage);


            });
        }
        else {
            const toast = this.toastCtrl.create({
                message: 'You need to select interest at least one',
                duration: 2000
            });
            toast.present();
        }


    }





    follow() {
        const toast = this.toastCtrl.create({
            message: 'Follow user clicked.',
            duration: 2000
        });
        toast.present();
    }

}
