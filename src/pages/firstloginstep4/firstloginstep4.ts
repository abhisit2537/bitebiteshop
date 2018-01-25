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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loading: LoadingController
  ) {

  }

  ionViewWillEnter() {
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    this.firstLogin = JSON.parse(window.localStorage.getItem('firstlogin'));
    loadingCtrl.dismiss();
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
  }
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
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
    this.navCtrl.push('Firstloginstep5Page');
  }

}
