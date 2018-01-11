import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FirstloginstepModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep-modal',
  templateUrl: 'firstloginstep-modal.html',
})
export class FirstloginstepModalPage {
  firstLogin: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firstLogin = this.navParams.data;
    alert(JSON.stringify(this.firstLogin));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstloginstepModalPage');
  }

}
