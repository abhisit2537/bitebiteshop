import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Firstloginstep3Page } from '../firstloginstep3/firstloginstep3';
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
/**
 * Generated class for the Firstloginstep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep2',
  templateUrl: 'firstloginstep2.html',
})
export class Firstloginstep2Page {
  firstLogin: any = {};
  images: Array<any> = [];
  coverImg: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker, public loading: LoadingController) {
    this.firstLogin = this.navParams.data;
    // alert(this.firstLogin.coverimage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep2Page');
  }
  selectCover() {
    this.onUpload('cover', 1);
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
              if (from.toString() === 'cover') {
                this.updateCover();
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

  updateCover() {
    this.coverImg = this.images && this.images.length > 0 ? this.images[this.images.length - 1] : '';
    if (this.coverImg) {
      this.firstLogin.coverimage = this.coverImg;
    } else {
      this.firstLogin.coverimage = '';
    }
  }

  step3() {
    // alert(JSON.stringify(this.firstLogin));
    this.navCtrl.setRoot(Firstloginstep3Page, this.firstLogin);
  }

}
