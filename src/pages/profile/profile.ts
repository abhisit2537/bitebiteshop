import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ShopModel } from '../shop/shop.model';
import { ImagePicker } from '@ionic-native/image-picker';
import { ShopServiceProvider } from '../shop/shop-service';

import * as firebase from 'firebase';
import { Auth } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  firstLogin: any = {};
  images: Array<any> = [];
  profileImg: string = '';
  myDate: String = new Date().toISOString();
  shop: ShopModel = new ShopModel();
  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker, public loading: LoadingController, public shopServiceProvider: ShopServiceProvider, private auth: Auth) {

    this.shopServiceProvider.getShop().then(data => {
      this.shop = data;
      console.log(this.shop);



    }, (err) => {
      // window.localStorage.removeItem('bikebikeshop');
    });

    let getfirstLogin = JSON.parse(window.localStorage.getItem('user'));
    getfirstLogin.profileImageURL = getfirstLogin.profileImageURL ? getfirstLogin.profileImageURL : './assets/imgs/Upload-Profile.png';
    getfirstLogin.dateOfBirth = getfirstLogin.dateOfBirth ? getfirstLogin.dateOfBirth : this.myDate;

    // let getDate = new Date();
    // let month = getDate.getUTCMonth() + 1; //months from 1-12
    // let day = getDate.getUTCDate();
    // let year = getDate.getUTCFullYear();

    this.firstLogin = getfirstLogin;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep1Page');

  }
  selectProfile() {
    this.onUpload('profile', 1);
  }

  onUpload(from, maxImg) {
    let options = {
      maximumImagesCount: maxImg,
      width: 900,
      quality: 30,
      outputType: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      let loading = [];
      let loadingCount = 0;
      for (var i = 0; i < results.length; i++) {
        loading.push(this.loading.create({
          content: (i + 1) + '/' + (results.length),
          cssClass: `loading-upload`,
          showBackdrop: false
        }));
        loading[i].present();
        this.uploadImage(results[i]).then((resUrl) => {
          this.images.push(resUrl);

          setTimeout(() => {
            loading[loadingCount].dismiss();
            loadingCount++;

            if (loadingCount === results.length) {
              if (from.toString() === 'profile') {
                this.updateProfile();
              }
            }
          }, 1000);

        }, (error) => {
          loading[loadingCount].dismiss();
          loadingCount++;
          // alert('Upload Fail. ' + JSON.stringify(error));
        })
      }

    }, (err) => { });
  }
  uploadImage(imageString): Promise<any> {

    let storageRef = firebase.storage().ref();
    let filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
    let imageRef = storageRef.child(`images/${filename}.jpg`);
    let parseUpload: any;

    return new Promise((resolve, reject) => {
      parseUpload = imageRef.putString('data:image/jpeg;base64,' + imageString, 'data_url');
      parseUpload.on('state_changed', (_snapshot) => {
        let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (_snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot.downloadURL);
        });
    });
  }

  updateProfile() {
    this.profileImg = this.images && this.images.length > 0 ? this.images[this.images.length - 1] : '';
    if (this.profileImg) {
      this.firstLogin.profileImageURL = this.profileImg;
    } else {
      this.firstLogin.profileImageURL = '';
    }
  }

  save() {
    this.auth.manageUser(this.firstLogin).then((data) => {
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
    });
  }

  // step2() {
  //   this.firstLogin.coverimage = this.shop.coverimage ? this.shop.coverimage : 'no image';
  //   this.firstLogin.name = this.shop.name ? this.shop.name : '';
  //   this.firstLogin.name_eng = this.shop.name_eng ? this.shop.name_eng : '';
  //   this.firstLogin.detail = this.shop.detail ? this.shop.detail : '';
  //   this.firstLogin.email = this.shop.email ? this.shop.email : '';
  //   this.firstLogin.tel = this.shop.tel ? this.shop.tel : '';
  //   this.firstLogin.facebook = this.shop.facebook ? this.shop.facebook : '';
  //   this.firstLogin.line = this.shop.line ? this.shop.line : '';
  //   this.firstLogin.times = this.shop.times ? this.shop.times : [];
  //   this.firstLogin.categories = this.shop.categories ? this.shop.categories : [];
  //   this.firstLogin.address = this.shop.address ? this.shop.address : {};
  //   // alert(JSON.stringify(this.firstLogin.coverimage));
  //   this.navCtrl.setRoot(Firstloginstep2Page, this.firstLogin);
  // }
}
