import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firstloginstep2Page } from '../firstloginstep2/firstloginstep2';

/**
 * Generated class for the Firstloginstep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep1',
  templateUrl: 'firstloginstep1.html',
})
export class Firstloginstep1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep1Page');
  }
  step2(){
    this.navCtrl.setRoot(Firstloginstep2Page);        
  }

}
