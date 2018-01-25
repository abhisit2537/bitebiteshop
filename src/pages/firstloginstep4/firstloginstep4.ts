import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
// import { Firstloginstep5Page } from '../firstloginstep5/firstloginstep5';
// import { FirstloginstepModalPage } from '../firstloginstep-modal/firstloginstep-modal';

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
  firstLogin: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loading: LoadingController) {
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    this.firstLogin = this.navParams.data;
    loadingCtrl.dismiss();
    // alert(JSON.stringify(this.firstLogin.times));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep4Page');
  }
  // addTime() {
  //   this.isAdd = true;
  // }
  openModal() {
    let modalopen = this.modalCtrl.create('FirstloginstepModalPage');


    modalopen.onDidDismiss(datadismiss => {
      if (datadismiss) {
        this.firstLogin.times.push(datadismiss);
      }
    });
    modalopen.present();
  }

  // add() {
  //   this.isAdd = false;
  // }

  // cancel() {
  //   this.isAdd = false;
  // }
  deleteTimes(index) {
    this.firstLogin.times.splice(index, 1);
  }
  editTimes(item, i) {
    item.editMode = true;
    let modalopen = this.modalCtrl.create('FirstloginstepModalPage', item);

    modalopen.onDidDismiss(datadismiss => {
      // this.firstLogin
      // alert(JSON.stringify(datadismiss));
      if (datadismiss) {
        this.firstLogin.times[i] = datadismiss;
      }
    });
    modalopen.present();
  }
  step5() {
    // this.navCtrl.setRoot('Firstloginstep5Page', this.firstLogin);
    this.navCtrl.push('Firstloginstep5Page', this.firstLogin);
  }

}
