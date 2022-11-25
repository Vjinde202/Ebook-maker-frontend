import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value:any,maxlength:number):any {
    if(value.length>maxlength){
      let RenderVal = value.slice(0,15);
      return RenderVal+"...";
    }
    else{
      return value;
    }
  }

}
