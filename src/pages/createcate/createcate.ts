import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { ShopServiceProvider } from '../shop/shop-service';

/**
 * Generated class for the CreatecatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createcate',
  templateUrl: 'createcate.html',
})
export class CreatecatePage {
  cate: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    public shopServiceProvider: ShopServiceProvider,
    public viewCtrl: ViewController
  ) {
    this.cate.image = this.navParams.data.img;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatecatePage');
  }
  closeDismiss() {
    this.viewCtrl.dismiss();
  }
  save() {
    this.viewCtrl.dismiss(this.cate);
  }
}
