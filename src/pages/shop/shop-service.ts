import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Server } from '../../providers/server-config/server-config';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';
/*
  Generated class for the ShopServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopServiceProvider {

  constructor(public http: HttpClient,public coreService: CoreserviceProvider, public server: Server) {
    console.log('Hello ShopServiceProvider Provider');

  }


  // getShop(){
  //   // return this.http.get("./assets/Jason/shop.json")
  //   return this.http.get("https://eatsyd-test.herokuapp.com/api/shopshome")
  //     .toPromise()
  //     .then(response => response as any)
  //     .catch(this.handleError);
  // }

  getShop(): Promise<any> {
    let headers = this.coreService.authorizationHeader();
    return this.http.get(this.server.url + 'api/shopshome', { headers: headers })
    .toPromise()
    .then(response => response as any)
    .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
