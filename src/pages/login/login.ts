import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabnavPage } from '../tabnav/tabnav';
import { Auth } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private credentials: any = {};
  constructor(private auth: Auth, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    let loading = this.loading.create();
    loading.present()
    this.auth.login(this.credentials).then((res) => {
      console.log(res);
      window.localStorage.setItem('bikebikeshop', JSON.stringify(res));
      loading.dismiss();
      this.navCtrl.setRoot(TabnavPage);
    }, (err) => {
      console.log(err);
      loading.dismiss();
    });
  }
}
