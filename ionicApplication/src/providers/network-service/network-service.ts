import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Network } from '@ionic-native/network';


@Injectable()
export class NetworkServiceProvider {


    isOnline: boolean;
    private statusChangedObserver: any;
    public statusChanged: any;

    constructor(public http: Http, public network: Network) {
        //console.log('Hello NetworkServiceProvider Provider');

        this.statusChangedObserver = null;
        this.isOnline = true;

        this.statusChanged = Observable.create(observer => {
            this.statusChangedObserver = observer;
        });

        // watch network for a disconnect
        this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.setConnectionStatus(false);
        });

        // watch network for a connection
        this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            this.setConnectionStatus(true);
        });

    }

    setConnectionStatus(status) {
        this.isOnline = status;
        this.statusChangedObserver.next(status);
    }

    getConnectionStatus() {
        return this.isOnline;
        //return false;
        //return !(this.network.type === 'none');
    }

}
