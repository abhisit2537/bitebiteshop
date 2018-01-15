import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { Firstloginstep4Page } from '../firstloginstep4/firstloginstep4';
import { ShopServiceProvider } from '../shop/shop-service';
import { CateModel } from '../shop/shop.model';

/**
 * Generated class for the Firstloginstep3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep3',
  templateUrl: 'firstloginstep3.html',
})
export class Firstloginstep3Page {
  firstLogin: any = {};
  cate: Array<CateModel>;
  categories = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopServiceProvider: ShopServiceProvider, public loadingCtrl: LoadingController) {
    this.firstLogin = this.navParams.data;
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shopServiceProvider.getCate().then(data => {
      this.cate = data;
      this.firstLogin.categories.forEach(fcate => {
        data.forEach(dcate => {
          if (fcate._id.toString() === dcate._id.toString()) {
            this.categories.push(dcate);
          }
        });
      });
      // alert(JSON.stringify(this.cate));
      // this.firstLogin.name = this.shop.name ? this.shop.name : '';
      // alert(JSON.stringify(this.categories));

      loading.dismiss();


    }, (err) => {
      loading.dismiss();

      // window.localStorage.removeItem('bikebikeshop');
    });
  }
  // onSelect() {
  //   if (this.categories.length > 3) {
  //     alert('4');
  //   }
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep3Page');
  }

  step4() {
    if (this.categories && this.categories.length > 0) {
      let cateIds = [];
      this.firstLogin.categories = [];
      this.categories.forEach(function (data) {
        cateIds.push(data._id);
      })
      this.firstLogin.categories = cateIds;
    }
    // alert(JSON.stringify(this.firstLogin));
    this.navCtrl.setRoot('Firstloginstep4Page', this.firstLogin);
  }

}
