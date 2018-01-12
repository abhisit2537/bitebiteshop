import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

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
  // addTime: any = [];
  addTime: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
    this.firstLogin = this.navParams.data;
    // alert(JSON.stringify(this.firstLogin));
    let timenow = new Date();
    // timenow.setHours(timenow.getHours() + 7);
    // alert(timenow);
    this.addTime = {
      detail: "",
      openTime: timenow,
      closeTime: timenow,
      days: [{
        name: 'จันทร์',
        checked: false
      },
      {
        name: 'อังคาร',
        checked: false
      },
      {
        name: 'พุธ',
        checked: false
      },
      {
        name: 'พฤหัสบดี',
        checked: false
      },
      {
        name: 'ศุกร์',
        checked: false
      },
      {
        name: 'เสาร์',
        checked: false
      },
      {
        name: 'อาทิตย์',
        checked: false
      }]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstloginstepModalPage');
  }
  // updateDays() {
  //   alert(JSON.stringify(this.addTime.days));
  // }
  add(data) {
    let newDay = [];
    data.days.forEach(day => {
      if (day.checked === true) {
        newDay.push(day.name);
      }
    });
    // alert(JSON.stringify(this.addTime));
    this.firstLogin.times.push({
      description: data.detail,
      timestart: data.openTime,
      timeend: data.closeTime,
      days: newDay
    });
    if (data.openTime && data.closeTime) {
      this.viewCtrl.dismiss(this.firstLogin);
    } else {
      alert('เกิดข้อผิดพลาด กรุณาเลือดเวลาเปิด-ปิด');
    }
  }
  closeModel() {
    this.viewCtrl.dismiss();
  }

}
