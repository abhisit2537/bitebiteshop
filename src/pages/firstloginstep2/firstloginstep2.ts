import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
// import { Firstloginstep3Page } from '../firstloginstep3/firstloginstep3';
// import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    // public imagePicker: ImagePicker, 
    public loading: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep2Page');
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    // this.firstLogin = this.navParams.data;
    this.firstLogin = JSON.parse(window.localStorage.getItem('firstlogin'));
    console.log(this.firstLogin);
    loadingCtrl.dismiss();
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave');
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
    console.log(this.firstLogin);
  }
  selectCover() {
    // this.onUpload('cover', 1);
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.openCamera('cover');
          }
        },
        {
          text: 'Photo Gallery',
          handler: () => {
            this.galleryCamera('cover');
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
      // allowEdit: true,
      // correctOrientation: true,
      targetHeight: from !== 'cover' ? 150 : 150,
      targetWidth: from !== 'cover' ? 150 : 450
    }
    this.camera.getPicture(options).then((imageData) => {
      this.noResizeImage(imageData).then((data) => {
        let loadingCtrl = this.loading.create();
        loadingCtrl.present();
        this.images.push(data);
        if (from.toString() === 'cover') {
          loadingCtrl.dismiss();
          this.updateCover();
        }
      }, (err) => {
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
    this.camera.getPicture(options).then((imageData) => {
      this.noResizeImage(imageData).then((data) => {
        let loadingCtrl = this.loading.create();
        loadingCtrl.present();
        this.images.push(data);
        if (from.toString() === 'cover') {
          loadingCtrl.dismiss();
          this.updateCover();
        }
      }, (err) => {
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
    // this.navCtrl.setRoot('Firstloginstep3Page', this.firstLogin);
    this.navCtrl.push('Firstloginstep3Page', this.firstLogin);
  }

}
