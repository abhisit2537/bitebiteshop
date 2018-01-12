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
  editData: any = {};
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
  // private day: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.editData = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoptimeeditPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  add(data) {
    let newDay = [];
    data.days.forEach(day => {
      if (day.checked === true) {
        newDay.push(day.name);
      }
    });
    // alert(JSON.stringify(this.addTime));
    this.editData.times.push({
      description: data.detail,
      timestart: data.openTime,
      timeend: data.closeTime,
      days: newDay
    });
    this.viewCtrl.dismiss(this.editData);
  }

}
