import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { TabnavPage } from '../tabnav/tabnav';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { ShopServiceProvider } from '../shop/shop-service';

/**
 * Generated class for the Firstloginstep5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firstloginstep5',
  templateUrl: 'firstloginstep5.html',
})
export class Firstloginstep5Page {
  @ViewChild('map') mapref: ElementRef;
  map: GoogleMap;
  lat = 0;
  long = 0;
  address: any = {
    address: '',
    addressdetail: '',
    subdistinct: '',
    distinct: '',
    province: '',
    postcode: '',
    lat: '',
    lng: ''
  }
  firstLogin: any = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation, 
    private googleMaps: GoogleMaps, 
    private nativeGeocoder: NativeGeocoder, 
    public shopServiceProvider: ShopServiceProvider, 
    public loading: LoadingController
  ) {

  }

  ionViewWillEnter() {
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    this.firstLogin = JSON.parse(window.localStorage.getItem('firstlogin'));
    if (this.firstLogin.address.lat && this.firstLogin.address.lng) {
      this.showMap();
      loadingCtrl.dismiss();
    }else{
      loadingCtrl.dismiss();
    }
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
  }

  save() {
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    window.localStorage.setItem('bikebikeshopfirstlogin', 'true');
    console.log(this.firstLogin);
    this.shopServiceProvider.addFirstShop(this.firstLogin).then((data) => {
      loadingCtrl.dismiss();
      this.navCtrl.setRoot('TabnavPage');
    }, (err) => {
      loadingCtrl.dismiss();
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      // alert(JSON.stringify(JSON.parse(err._body).message));
    });

  }
  cancel(){
    window.localStorage.setItem('firstlogin', JSON.stringify(this.firstLogin));
    this.navCtrl.setRoot('Firstloginstep1Page');
  }
  getlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude + '    ' + resp.coords.longitude);
      this.firstLogin.address.lat = resp.coords.latitude;
      this.firstLogin.address.lng = resp.coords.longitude;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  showMap() {

    this.nativeGeocoder.reverseGeocode(this.firstLogin.address.lat, this.firstLogin.address.lng)
      .then((result: NativeGeocoderReverseResult) => {
        // alert(JSON.stringify(result))
        // console.log(result);
        this.address.address = result.subThoroughfare;
        this.address.subdistinct = result.locality;
        this.address.distinct = result.subAdministrativeArea;
        this.address.province = result.administrativeArea;
        this.address.postcode = result.postalCode;

      })
      .catch((error: any) => console.log(error));

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.firstLogin.address.lat,
          lng: this.firstLogin.address.lng
        },
        zoom: 18,
        tilt: 30
      }
    };
    let loadingCtrl = this.loading.create();
    loadingCtrl.present();
    let mapref = this.mapref.nativeElement;
    this.map = this.googleMaps.create(mapref, mapOptions);
    // alert('Map!');

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // alert('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.firstLogin.address.lat,
            lng: this.firstLogin.address.lng
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                this.nativeGeocoder.reverseGeocode(this.firstLogin.address.lat, this.firstLogin.address.lng)
                  .then((result: NativeGeocoderReverseResult) => {
                    // alert(JSON.stringify(result))
                    this.address.address = result.subThoroughfare;
                    this.address.subdistinct = result.locality;
                    this.address.distinct = result.subAdministrativeArea;
                    this.address.province = result.administrativeArea;
                    this.address.postcode = result.postalCode;
                  })
                  .catch((error: any) => console.log(error));
              });
          });
      });
    loadingCtrl.dismiss();
  }
}

