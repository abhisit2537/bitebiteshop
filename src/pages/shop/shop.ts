import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShopModel } from "./shop.model";
import { ShopServiceProvider } from "./shop-service"
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
 disabled = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public shopServiceProvider: ShopServiceProvider

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
    this.shopServiceProvider.getShop().then(data => {
      console.log(data);
      this.shop = data;
    });
  }
  selectedCate(index) {
    console.log(index);
    this.index = index;

  }

disable()
{
this.disabled = true;
}
}
