import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ShoptimeeditPage } from '../shoptimeedit/shoptimeedit';
import { ShopServiceProvider } from '../shop/shop-service';
import { CateModel } from '../shop/shop.model';
import { TabnavPage } from '../tabnav/tabnav';

/**
 * Generated class for the ShopeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopedit',
  templateUrl: 'shopedit.html',
})
export class ShopeditPage {
  editData: any;
  cate: Array<CateModel>;
  categories = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public shopServiceProvider: ShopServiceProvider) {
    this.editData = this.navParams.data;
    this.shopServiceProvider.getCate().then(data => {
      this.cate = data;
      this.editData.categories.forEach(fcate => {
        data.forEach(dcate => {
          if (fcate._id.toString() === dcate._id.toString()) {
            this.categories.push(dcate);
          }
        });
      });
      // alert(JSON.stringify(this.cate));
      // this.firstLogin.name = this.shop.name ? this.shop.name : '';
      // alert(JSON.stringify(this.categories));


    }, (err) => {

      // window.localStorage.removeItem('bikebikeshop');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopeditPage');
    console.log(this.editData);

  }
  shopTimeEditPage() {
    console.log('shopTimeEditPage');
    let ShoptimeModal = this.modalCtrl.create(ShoptimeeditPage,this.editData);
    ShoptimeModal.onDidDismiss(data => {
      console.log(data);
    });
    ShoptimeModal.present();
  }
  save(){
    this.shopServiceProvider.editShop(this.editData._id,this.editData).then((data) => {
      this.navCtrl.setRoot(TabnavPage);
    }, (err) => {
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      // alert(JSON.stringify(JSON.parse(err._body).message));
    });
  }

}
