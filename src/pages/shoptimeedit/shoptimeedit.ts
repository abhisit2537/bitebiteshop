import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ShoptimeeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoptimeedit',
  templateUrl: 'shoptimeedit.html',
})
export class ShoptimeeditPage {
  private editTime: any = {
    timeDetail: "",
    openTime: Date,
    closeTime: Date,
    day: []
  };
  // private day: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoptimeeditPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  save() {
    this.viewCtrl.dismiss(this.editTime);
  }

}
