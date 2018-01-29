import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { ShopServiceProvider } from '../shop/shop-service';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
/**
 * Generated class for the CreatecatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createcate',
  templateUrl: 'createcate.html',
})
export class CreatecatePage {
  cate: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    public shopServiceProvider: ShopServiceProvider,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private loading: LoadingController
  ) {
    if (this.navParams.data._id) {
      this.cate = this.navParams.data;
    } else {
      this.cate.image = this.navParams.data.img;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatecatePage');
  }
  closeDismiss() {
    this.viewCtrl.dismiss();
  }
  openActionSheet(from) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.openCamera(from);
          }
        },
        {
          text: 'Photo Gallery',
          handler: () => {
            this.galleryCamera(from);
          }
        }
      ]
    });
    actionSheet.present();
  }
  openCamera(from) {
    // this.createprod.images = [];
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
    this.camera.getPicture(options).then((imageData) => {
      this.noResizeImage(imageData).then((data) => {
        this.cate.image = data;
      }, (err) => {
        // alert(err);
        console.log(err);
      });

    }, (err) => {
      // Handle error
    });
  }
  galleryCamera(from) {
    // this.createprod.images = [];
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: from !== 'cover' ? 300 : 300,
      targetWidth: from !== 'cover' ? 300 : 600,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }


    this.camera.getPicture(options).then((imageData) => {
      this.noResizeImage(imageData).then((data) => {
        this.cate.image = data;
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      // Handle error
    });
  }
  noResizeImage(fileUri): Promise<any> {
    // alert('resize');
    return new Promise((resolve, reject) => {
      // alert(JSON.stringify(cropData));
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
  deleteCate() {
    this.cate.image = '';
  }
  save() {
    this.viewCtrl.dismiss(this.cate);
  }
}
