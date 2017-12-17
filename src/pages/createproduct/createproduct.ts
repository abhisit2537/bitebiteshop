import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopServiceProvider } from '../shop/shop-service';

/**
 * Generated class for the CreateproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createproduct',
  templateUrl: 'createproduct.html',
})
export class CreateproductPage {
  createprod: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopServiceProvider: ShopServiceProvider
  ) {
    this.createprod.cateindex = this.navParams.data.cateindex;
    this.createprod.index = this.navParams.data.index;
    this.createprod.categories = this.navParams.data.cate;
    this.createprod.images = this.navParams.data.images;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateproductPage');
  }
  save() {
    this.shopServiceProvider.addProduct(this.navParams.data.shopid, this.createprod).then((data) => {
      this.navCtrl.pop();
    }, (err) => {
      alert(JSON.stringify(JSON.parse(err._body).message));
    });
  }

}
