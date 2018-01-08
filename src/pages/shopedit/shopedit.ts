import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ShoptimeeditPage } from '../shoptimeedit/shoptimeedit';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.editData = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopeditPage');
    console.log(this.editData);

  }
  shopTimeEditPage() {
    console.log('shopTimeEditPage');
    let ShoptimeModal = this.modalCtrl.create(ShoptimeeditPage);
    ShoptimeModal.onDidDismiss(data => {
      console.log(data);
    });
    ShoptimeModal.present();
  }

}
