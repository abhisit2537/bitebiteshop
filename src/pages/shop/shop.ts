import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { ShopModel } from "./shop.model";
import { ShopServiceProvider } from "./shop-service"
import { LoginPage } from '../login/login';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  shop: ShopModel = new ShopModel();
  index: Number = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public shopServiceProvider: ShopServiceProvider,
    public app: App

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ShopPage');
    this.shopService();
  }
  shopService() {
    let loading = this.loading.create();
    loading.present();
    this.shopServiceProvider.getShop().then(data => {
      this.shop = data;
      setTimeout(function () {
        loading.dismiss();
      }, 500);

    }, (err) => {
      window.localStorage.removeItem('bikebikeshop');
      loading.dismiss();
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  selectedCate(index) {
    console.log(index);
    this.index = index;

  }

  changeStatus(status) {
    // console.log(status);
    if (status === 'open') {
      this.shop.isopen = false;
    } else {
      this.shop.isopen = true;
    }
  }

}
