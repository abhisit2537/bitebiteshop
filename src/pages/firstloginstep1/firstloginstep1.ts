import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ShopServiceProvider } from '../shop/shop-service';
import { ShopModel } from "../shop/shop.model";
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the Firstloginstep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-firstloginstep1',
  templateUrl: 'firstloginstep1.html',
})
export class Firstloginstep1Page {
  firstLogin: any = {};
  images: Array<any> = [];
  profileImg: string = '';
  myDate: String = new Date().toISOString();
  shop: ShopModel = new ShopModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public shopServiceProvider: ShopServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private translate: TranslateService,
  ) {
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    this.shopServiceProvider.getShop().then(data => {
      this.shop = data;
      loadingCtrl.dismiss();
    }, (err) => {
      loadingCtrl.dismiss();
    });
    let getfirstLogin = JSON.parse(window.localStorage.getItem('user'));
    let backfirstLogin = JSON.parse(window.localStorage.getItem('firstlogin'));
    getfirstLogin.profileImageURL = getfirstLogin.profileImageURL ? getfirstLogin.profileImageURL : './assets/imgs/Upload-Profile.png';
    getfirstLogin.dateOfBirth = getfirstLogin.dateOfBirth ? getfirstLogin.dateOfBirth : this.myDate;
    if (backfirstLogin) {
      this.firstLogin = backfirstLogin;
    } else if (!backfirstLogin) {
      this.firstLogin = getfirstLogin;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep1Page');
  }
  selectProfile() {
    let language = this.translate.currentLang;
    let textCamera = language === 'th' ? 'กล้อง' : 'Camera';
    let textGallery = language === 'th' ? 'อัลบั้มรูปภาพ' : 'Photo Gallery';
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: textCamera,
          handler: () => {
            this.openCamera('profile');
          }
        },
        {
          text: textGallery,
          handler: () => {
            this.galleryCamera('profile');
          }
        }
      ]
    });
    actionSheet.present();
  }
  openCamera(from) {
    this.images = [];
    const popover: CameraPopoverOptions = {
      x: 0,
      y: 32,
      width: 320,
      height: 480,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    }
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: from !== 'cover' ? 150 : 150,
      targetWidth: from !== 'cover' ? 150 : 450
    }
    let loadingCtrl = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loadingCtrl.present();
      this.noResizeImage(imageData).then((data) => {
        this.images.push(data);
        loadingCtrl.dismiss();
        if (from.toString() === 'profile') {
          this.updateProfile();
        }
      }, (err) => {
        loadingCtrl.dismiss();
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
  galleryCamera(from) {
    this.images = [];
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: from !== 'cover' ? 150 : 150,
      targetWidth: from !== 'cover' ? 150 : 450,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let loadingCtrl = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loadingCtrl.present();
      this.noResizeImage(imageData).then((data) => {
        this.images.push(data);
        loadingCtrl.dismiss();
        if (from.toString() === 'profile') {
          this.updateProfile();
        }
      }, (err) => {
        loadingCtrl.dismiss();
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
  noResizeImage(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uploadImage(fileUri).then((uploadImageData) => {
        resolve(uploadImageData);
      }, (uploadImageError) => {
        reject(uploadImageError)
      });
    });
  }
  uploadImage(imageString): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
      let imageRef = storageRef.child(`images/${filename}.png`);
      let parseUpload: any;
      let metadata = {
        contentType: 'image/png',
      };
      let xhr = new XMLHttpRequest();
      xhr.open('GET', imageString, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        let blob = new Blob([xhr.response], { type: 'image/png' });
        parseUpload = imageRef.put(blob, metadata);
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
      }
      xhr.send();
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
  step2() {
    let backfirstLogin = JSON.parse(window.localStorage.getItem('firstlogin'));
    if (backfirstLogin) {
      this.firstLogin.coverimage = backfirstLogin.coverimage ? backfirstLogin.coverimage : 'no image';
      this.firstLogin.name = backfirstLogin.name ? backfirstLogin.name : '';
      this.firstLogin.name_eng = backfirstLogin.name_eng ? backfirstLogin.name_eng : '';
      this.firstLogin.detail = backfirstLogin.detail ? backfirstLogin.detail : '';
      this.firstLogin.email = backfirstLogin.email ? backfirstLogin.email : '';
      this.firstLogin.tel = backfirstLogin.tel ? backfirstLogin.tel : '';
      this.firstLogin.facebook = backfirstLogin.facebook ? backfirstLogin.facebook : '';
      this.firstLogin.line = backfirstLogin.line ? backfirstLogin.line : '';
      this.firstLogin.times = backfirstLogin.times ? backfirstLogin.times : [];
      this.firstLogin.categories = backfirstLogin.categories ? backfirstLogin.categories : [];
      this.firstLogin.address = backfirstLogin.address ? backfirstLogin.address : {};
      window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
      this.navCtrl.push('Firstloginstep2Page');
    } else if (!backfirstLogin) {
      this.firstLogin.coverimage = this.shop.coverimage ? this.shop.coverimage : 'no image';
      this.firstLogin.name = this.shop.name ? this.shop.name : '';
      this.firstLogin.name_eng = this.shop.name_eng ? this.shop.name_eng : '';
      this.firstLogin.detail = this.shop.detail ? this.shop.detail : '';
      this.firstLogin.email = this.shop.email ? this.shop.email : '';
      this.firstLogin.tel = this.shop.tel ? this.shop.tel : '';
      this.firstLogin.facebook = this.shop.facebook ? this.shop.facebook : '';
      this.firstLogin.line = this.shop.line ? this.shop.line : '';
      this.firstLogin.times = this.shop.times ? this.shop.times : [];
      this.firstLogin.categories = this.shop.categories ? this.shop.categories : [];
      this.firstLogin.address = this.shop.address ? this.shop.address : {};
      window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
      this.navCtrl.push('Firstloginstep2Page');
    }
  }
}
