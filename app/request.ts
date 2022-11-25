export class Request {
    Username:String='';
    bookTitle:String=''
    bookId:number=0;
    downloadUrl:String=''

    constructor(Username:String,bookTitle:String,bookId:number,downloadUrl:String){
        this.Username=Username;
        this.bookId=bookId;
        this.bookTitle=bookTitle;
        this.downloadUrl=downloadUrl;


    }
}
