import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reorderArray } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ChatViewModel} from "../../models/ChatViewModel";



@Injectable()
export class ChatViewProvider {

    cards: any[] = [];

  constructor(public http: HttpClient,public storage:Storage) {
    console.log('Hello ChatViewProvider Provider');
  }


    load(): void {

        this.storage.get('permatimerCards').then((cards) => {

            if(cards){

                for(let card of cards){

                    let savedCards = new ChatViewModel(card.name,card.date);
                    this.cards.push(savedCards);

                }

            }

        });

    }


    save(): void {
        this.storage.set('permatimerCards', this.cards);
    }

    reorder(indexes): void {

        this.cards = reorderArray(this.cards, indexes);
        this.save();

    }


    addCards(project): void {

        this.cards.push(project);
        this.save();
    }



    removeCards(project): void {

        let index = this.cards.indexOf(project);

        if(index > -1){
            this.cards.splice(index, 1);
            this.save();
        }

    }


}
