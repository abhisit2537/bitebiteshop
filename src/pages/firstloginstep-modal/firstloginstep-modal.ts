import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  cucumber: boolean;
  addTime: any = {
    detail: "",
    openTime: Date,
    closeTime: Date,
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.firstLogin = this.navParams.data;
    // alert(JSON.stringify(this.firstLogin));
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
    this.viewCtrl.dismiss(this.firstLogin);
  }
  closeModel() {
    this.viewCtrl.dismiss();
  }

}
