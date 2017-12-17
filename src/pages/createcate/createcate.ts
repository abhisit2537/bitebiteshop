import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public shopServiceProvider: ShopServiceProvider
  ) {
    this.cate.image = this.navParams.data.img;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatecatePage');
  }
  save() {
    this.shopServiceProvider.addCate(this.navParams.data.shopid, this.cate).then((data)=>{
      this.navCtrl.pop();      
    },(err)=>{
      alert(JSON.stringify(JSON.parse(err._body).message));      
    });
  }
}
