import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {DataServiceProvider} from "../../providers/data-service/data-service";


@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {


    title:string;
    body:string;

    post_id:any;

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public viewCtrl: ViewController,
               public loadingCtrl: LoadingController,
               public httpClient: HttpClient,
               public dataProvider : DataServiceProvider) {

      this.post_id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }

    updatePost() {
        let loader = this.loadingCtrl.create({
            duration: 200
        });

        var post_edit_data = {
            title:this.title,
            body:this.body
        };

        this.dataProvider.editPost(post_edit_data,this.post_id).subscribe( data => {

            console.log(data);

        });

        loader.present().then( () => this.navCtrl.pop());
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


}
