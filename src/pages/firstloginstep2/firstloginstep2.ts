import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firstloginstep3Page } from '../firstloginstep3/firstloginstep3';

/**
 * Generated class for the Firstloginstep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep2',
  templateUrl: 'firstloginstep2.html',
})
export class Firstloginstep2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep2Page');
  }

  step3() {
    this.navCtrl.setRoot(Firstloginstep3Page);
  }

}
