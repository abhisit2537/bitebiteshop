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
    console.log(this.firstLogin);
    // alert(JSON.stringify(this.firstLogin));
    let timenow = new Date();
    // timenow.setHours(timenow.getHours() + 7);
    // alert(timenow);
    let days = [{
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
    }];
    if (this.firstLogin) {
      if (this.firstLogin.days && this.firstLogin.days.length > 0) {
        this.firstLogin.days.forEach(fday => {
          days.forEach(dday => {
            if (fday === dday.name) {
              dday.checked = true;
            }
          });
        });
      }
    }

    let data = {
      detail: this.firstLogin.description,
      openTime: this.firstLogin.timestart,
      closeTime: this.firstLogin.timeend,
      days: days
    }
    this.addTime = this.firstLogin ? data : {
      detail: "",
      openTime: timenow,
      closeTime: timenow,
      days: days
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
    // if () {
    //   this.firstLogin.times.push({
    //     description: data.detail,
    //     timestart: data.openTime,
    //     timeend: data.closeTime,
    //     days: newDay
    //   });
    // }
    let resData = {
      description: data.detail,
      timestart: data.openTime,
      timeend: data.closeTime,
      days: newDay
    };


    if (data.openTime && data.closeTime) {
      this.viewCtrl.dismiss(resData);
    } else {
      alert('เกิดข้อผิดพลาด กรุณาเลือดเวลาเปิด-ปิด');
    }
  }
  closeModel() {
    this.viewCtrl.dismiss();
  }

}
