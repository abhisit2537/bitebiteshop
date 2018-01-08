import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firstloginstep5Page } from '../firstloginstep5/firstloginstep5';

/**
 * Generated class for the Firstloginstep4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep4',
  templateUrl: 'firstloginstep4.html',
})
export class Firstloginstep4Page {
  isAdd = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep4Page');
  }
  addTime() {
    this.isAdd = true;
  }

  add() {
    this.isAdd = false;
  }

  cancel() {
    this.isAdd = false;
  }

  step5(){
    this.navCtrl.setRoot(Firstloginstep5Page);    
  }

}
