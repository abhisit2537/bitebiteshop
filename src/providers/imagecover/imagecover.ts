import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ImagecoverProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagecoverProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ImagecoverProvider Provider');
  }

  getMeta(url): Promise<any> {
    // alert('resize');
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.onload = function () {
        let w = this["width"];
        let h = this["height"];
        let result = w / h;
        if (result > 1.33 && result < 1.78) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.src = url;
    });
  }
}
