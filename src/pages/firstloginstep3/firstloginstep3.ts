import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShopServiceProvider } from '../shop/shop-service';
import { CateModel } from '../shop/shop.model';
import { TranslateService } from '@ngx-translate/core';
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
  validateEmail = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopServiceProvider: ShopServiceProvider,
    public loadingCtrl: LoadingController,
    private translate: TranslateService,
  ) {

  }
  validationEmail() {
    if (this.firstLogin.email.indexOf('@') != -1) {
      this.validateEmail = true;
    } else {
      this.validateEmail = false;
    }
  }
  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.firstLogin = JSON.parse(window.localStorage.getItem('firstlogin'));
    this.shopServiceProvider.getCate().then(data => {
      this.cate = data;
      this.firstLogin.categories.forEach(fcate => {
        data.forEach(dcate => {
          if (fcate._id ? fcate._id.toString() === dcate._id.toString() : fcate === dcate._id.toString()) {
            this.categories.push(dcate);
          }
        });
      });
      this.validationEmail();
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }
  ionViewWillLeave() {
    this.firstLogin.categories = [];
    if (this.categories && this.categories.length > 0) {
      let cateIds = [];
      this.categories.forEach(function (data) {
        cateIds.push(data);
      })
      this.firstLogin.categories = cateIds;
    }
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
  }
  step4() {
    this.firstLogin.categories = [];
    if (this.categories && this.categories.length > 0) {
      let cateIds = [];
      this.categories.forEach(function (data) {
        cateIds.push(data._id);
      })
      this.firstLogin.categories = cateIds;
    }
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
    this.navCtrl.push('Firstloginstep4Page');
  }
}
