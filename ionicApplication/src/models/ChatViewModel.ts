export class ChatViewModel {

    constructor(public name: string,
                public date: Date) {

    }

    setIsim(name: string): void {
        this.name = name;
    }

    setAdet(date:Date):void{
        this.date = date;
    }

}