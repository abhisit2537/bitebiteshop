import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Firstloginstep5Page } from '../firstloginstep5/firstloginstep5';
import { FirstloginstepModalPage } from '../firstloginstep-modal/firstloginstep-modal';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.firstLogin = this.navParams.data;
    // alert(JSON.stringify(this.firstLogin.times));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep4Page');
  }
  addTime() {
    this.isAdd = true;
  }
  openModal() {
    let modalopen = this.modalCtrl.create(FirstloginstepModalPage, this.firstLogin);


    modalopen.onDidDismiss(datadismiss => {
      // this.images = [];
      // if (datadismiss) {
      //   this.shopServiceProvider.addCate(this.shop._id, datadismiss).then((data) => {
      //     this.shopService();
      //   }, (err) => {
      //     alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      //     // alert(JSON.stringify(JSON.parse(err._body).message));
      //   });
      // }

    });
    modalopen.present();
  }

  add() {
    this.isAdd = false;
  }

  cancel() {
    this.isAdd = false;
  }

  step5() {
    this.navCtrl.setRoot(Firstloginstep5Page);
  }

}
