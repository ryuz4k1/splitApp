import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Transfer, TransferObject } from '@ionic-native/transfer';


@Injectable()
export class DataServiceProvider {


  BASE_URL = 'http://localhost:5000';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  HAS_LOGGED = 'hasLogged';


    constructor(public httpClient: HttpClient,
              private transfer: Transfer,
              public storage : Storage) {
  }

    ionViewDidLoad() {
        console.log('Hello DataServiceProvider Provider');
    }

    loginFaceRecognition(targetPath,options){
      const fileTransfer: TransferObject = this.transfer.create();
      return fileTransfer.upload(targetPath, this.BASE_URL+'/sifresiztanima', options)
    }


    registerFace(targetPath,options){
        const fileTransfer: TransferObject = this.transfer.create();
        return fileTransfer.upload(targetPath, this.BASE_URL+'/kisiekle', options)
    }


    login(loginDATA){
        return this.httpClient.post(this.BASE_URL+'/login',loginDATA);
    }

    register(registerDATA){
        return this.httpClient.post(this.BASE_URL+'/register',registerDATA);
    }


    addPost(postDATA){
        return this.httpClient.post(this.BASE_URL+'/add_posts',postDATA)
    }


    editPost(editPostDATA,editPostID){
        return this.httpClient.post(this.BASE_URL+'/edit_post'+'/'+editPostID, editPostDATA)
    }

    removePost(removePostID){
        return this.httpClient.post(this.BASE_URL+'/delete_post'+'/'+removePostID,JSON.stringify(removePostID))
    }

    getUserPosts(userID){
        return this.httpClient.get(this.BASE_URL+'/get_user_posts'+'/'+userID)
    }


    getAllPosts(){
        return this.httpClient.get(this.BASE_URL+'/get_posts')
    }

    updateProfile(updateProfileDATA,profileID){
      return this.httpClient.post(this.BASE_URL+'/edit_profile'+'/'+profileID,updateProfileDATA)
    }

    getUsers(){
      return this.httpClient.get(this.BASE_URL+'/users')
    }


    getAllLocation(userID){
        return this.httpClient.get(this.BASE_URL+'/lokasyonlaricek'+'/'+userID)
    }


    getUserProfile(userID){
      return this.httpClient.get(this.BASE_URL+'/user_info'+'/'+userID)
    }



    checkHasSeenTutorial(): Promise<string> {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
            return value;
        });
    };


    checkHasLogged(): Promise<string> {
        return this.storage.get(this.HAS_LOGGED).then((value) => {
            return value;
        });
    };

    sendInterest(userID,interestDATA){
        return this.httpClient.post(this.BASE_URL + '/interests'+'/'+userID,interestDATA)
    }


    setLocation(userID,locDATA){
        return this.httpClient.post(this.BASE_URL+'/setUserLocation'+'/'+userID,locDATA);
    }
}












