import { Component,ViewChild  } from '@angular/core';
import {
    App,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    PopoverController,
    Slides,
} from 'ionic-angular';
import { ShopModel } from "./shop.model";
import { ShopServiceProvider } from "./shop-service"
import { LoginPage } from '../login/login';
import { CreatecatePage } from '../createcate/createcate';
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { CreateproductPage } from '../createproduct/createproduct';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
  
})
export class ShopPage {
  shop: ShopModel = new ShopModel();
  index: Number = 0;
  images: Array<any> = [];
  prodIndex: Number = 0;
  cate: any = {};
  isModify: boolean = false;
  slides: Slides;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public shopServiceProvider: ShopServiceProvider,
    public app: App,
    public popoverCtrl: PopoverController,
    public imagePicker: ImagePicker,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  ionViewWillEnter() {

    console.log('ionViewWillEnter ShopPage');
    this.shopService();
  }
  
  shopService() {
    this.images = [];
    let loading = this.loading.create();
    loading.present();
    this.shopServiceProvider.getShop().then(data => {
      this.shop = data;
      if (data.items && data.items.length > 0) {
        this.cate = data.items[0].cate;
        console.log(this.cate);
      }
      setTimeout(function () {
        loading.dismiss();
      }, 500);

    }, (err) => {
      window.localStorage.removeItem('bikebikeshop');
      loading.dismiss();
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  selectedCate(index, cate) {
    this.index = index;
    this.cate = cate;
  }

  productIndex(i) {
    this.prodIndex = i;
    this.onUpload('product', 3);
  }

  changeStatus(status) {
    // console.log(status);
    if (status === 'open') {
      this.shop.isopen = false;
    } else {
      this.shop.isopen = true;
    }
  }

  setModeEdit() {
    this.isModify = true;

  }
  clearMode() {
    this.isModify = false;

  }

  createCate() {
    this.onUpload('cate', 1);
    // this.formCate();

    // let popover = this.popoverCtrl.create(CreatecatePage);
    // popover.present({
    // });
  }

  formCate() {
    let img = this.images && this.images.length > 0 ? this.images[0] : 'noimage';
    let data = {
      shopid: this.shop._id,
      img: img
    };
    let modalopen = this.modalCtrl.create(CreatecatePage, data);


    modalopen.onDidDismiss(datadismiss => {
      this.images = [];
      if (datadismiss) {
        this.shopServiceProvider.addCate(this.shop._id, datadismiss).then((data) => {
          this.shopService();
        }, (err) => {
          alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
          // alert(JSON.stringify(JSON.parse(err._body).message));
        });
      }

    });
    modalopen.present();

    // let popover = this.popoverCtrl.create(CreatecatePage, data);
    // popover.present({

    // });
    // popover.onDidDismiss(data => {
    //   this.shopService();
    // });
  }

  formProduct() {
    let data = {
      shopid: this.shop._id,
      images: this.images,
      cate: this.cate,
      index: this.prodIndex,
      cateindex: this.index
    };
    let modalproduct = this.modalCtrl.create(CreateproductPage, data);
    modalproduct.onDidDismiss(datadismiss => {
      this.images = [];
      // alert(JSON.stringify(datadismiss));
      if (datadismiss) {
        this.shopServiceProvider.addProduct(this.shop._id, datadismiss).then((data) => {
          this.shopService();
        }, (err) => {
          // alert(JSON.stringify(JSON.parse(err._body).message));
          alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        });
      }
    });
    modalproduct.present();
    // let popover = this.popoverCtrl.create(CreateproductPage, data);
    // popover.present({

    // });
    // popover.onDidDismiss(data => {
    //   this.shopService();
    // });
  }

  selectShopBG() {
    this.onUpload('cover', 1);
  }

  updateShopBG() {
    let img = this.images && this.images.length > 0 ? this.images[0] : 'noimage';
    this.shopServiceProvider.setCover(this.shop._id, img).then((data) => {
      this.shopService();
    }, (err) => {
      // alert(JSON.stringify(JSON.parse(err._body).message));
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');

      console.log(err);
    });
  }

  addPromote() {
    this.onUpload('promote', 1);
  }

  updatePromote() {
    let img = this.images && this.images.length > 0 ? this.images[0] : 'noimage';
    this.shopServiceProvider.addPromote(this.shop._id, img).then((data) => {
      this.shopService();
    }, (err) => {
      // alert(JSON.stringify(JSON.parse(err._body).message));
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');      
      console.log(err);
    });
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
            // alert(loadingCount + '===' + results.length);

            if (loadingCount === results.length) {
              if (from.toString() === 'cover') {
                this.updateShopBG();
              } else if (from.toString() === 'promote') {
                this.updatePromote();
              } else if (from.toString() === 'cate') {
                this.formCate();
              } else if (from.toString() === 'product') {
                this.formProduct();
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
  doAlert(itm) {
    console.log(itm.image);
    let alert = this.alertCtrl.create({
      
    });
    alert.present();
  }
  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
  modalPresent(){
    let profileModal = this.modalCtrl.create({});
    profileModal.present();
  }
  myProfile(){
    this.navCtrl.push(ProfilePage);
  }
}
