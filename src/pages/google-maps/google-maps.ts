import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { TranslateService } from '@ngx-translate/core';
import { AddressModel } from '../shop/shop.model';
// import { LoadingProvider } from '../../providers/loading/loading';

declare let google: any;

@IonicPage()
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
})
export class GoogleMapsPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('places', { read: ElementRef }) places: ElementRef;
  private map: GoogleMap;
  private location: LatLng;
  private address: string = '';
  fullAddress: AddressModel = new AddressModel();
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    private platform: Platform,
    private googleMaps: GoogleMaps,
    private nativeGeocoder: NativeGeocoder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    // private loading: LoadingProvider
  ) {
  }
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // this.loading.onLoading();
      setTimeout(() => {
        this.initialMap();
        this.initplaces();
        // this.loading.dismiss();
      }, 1000);
    });
  }
  initplaces() {
    let input = this.places.nativeElement.querySelector('.searchbar-input');
    // let input = document.getElementById('places');
    let autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let place = autocomplete.getPlace();
      this.location = new LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      // this.address = place.name + ' ' + place.formatted_address;
      this.map.setCameraTarget(this.location);
      this.reverseGeocode();
      // this.addMarker();
    });

  }
  initialMap() {
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element, {
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true,
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        bearing: 0,
        tilt: 0,
        zoom: 16
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.getMyLocation().then((res) => {
        this.location = res.latLng;
        let camera = {
          target: this.location,
          zoom: 16
        }
        this.map.moveCamera(camera);
        this.reverseGeocode();
        this.onMapMove();
        this.onMyLocationClick();
      });
    });
  }
  onMapMove() {
    this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe((res) => {
      let location = this.map.getCameraTarget();
      this.location = new LatLng(location.lat, location.lng);
      this.reverseGeocode();
    });
  }
  onMyLocationClick() {
    this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(() => {
      this.map.one(GoogleMapsEvent.CAMERA_MOVE_END).then(() => {
        let location = this.map.getCameraTarget();
        this.location = new LatLng(location.lat, location.lng);
        this.reverseGeocode();
      });
    });
  }
  addMarker() {
    let position = {
      lat: this.location.lat,
      lng: this.location.lng
    };
    let markerOption = {
      icon: {
        url: './assets/icon/pin_transparent.png',
        size: {
          width: 40,
          height: 40
        }
      },
      position: position
    }
    this.map.clear();
    this.map.addMarker(markerOption).then((marker) => {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        cssClass: 'loading-hide',
        duration: 1,
      });
      loading.present();
    });
  }
  reverseGeocode() {
    this.nativeGeocoder.reverseGeocode(this.location.lat, this.location.lng)
      .then((result: NativeGeocoderReverseResult) => {
        this.address = '';
        this.address += (result.subThoroughfare ? result.subThoroughfare + ' ' : '');
        this.address += (result.thoroughfare ? result.thoroughfare + ' ' : '')
        this.address += (result.locality ? result.locality + ' ' : '')
        this.address += (result.subLocality ? result.subLocality + ' ' : '')
        this.address += (result.subAdministrativeArea ? result.subAdministrativeArea + ' ' : '')
        this.address += (result.administrativeArea ? result.administrativeArea + ' ' : '')
        this.address += (result.postalCode ? result.postalCode + ' ' : '')
        this.address += (result.countryName ? result.countryName : '');
        this.fullAddress.address = this.address;
        this.fullAddress.addressdetail = (result.subThoroughfare ? result.subThoroughfare : '');
        this.fullAddress.distinct = (result.subAdministrativeArea ? result.subAdministrativeArea : '');
        this.fullAddress.subdistinct = (result.locality ? result.locality : '');
        this.fullAddress.province = (result.administrativeArea ? result.administrativeArea : '');
        this.fullAddress.postcode = (result.postalCode ? result.postalCode : '');
        this.fullAddress.lat = this.location.lat.toString();
        this.fullAddress.lng = this.location.lng.toString();
        // this.addMarker();
      })
      .catch((error: any) => console.log('error ' + error));
  }
  doConfirm() {
    window.localStorage.setItem('shop_location_address', JSON.stringify(this.fullAddress));
    this.navCtrl.pop();
  }
  updateAddress() {
    let language = this.translate.currentLang;
    let title = '';
    let cancel = '';
    let ok = '';
    if (language === 'th') {
      title = "ที่อยู่ของฉัน"
      cancel = 'ยกเลิก'
      ok = 'ยืนยัน'
    } else if (language === 'en') {
      title = "Address"
      cancel = 'Cancal'
      ok = 'Confirm'
    }
    let alert = this.alertCtrl.create({
      title: title,
      mode: 'ios',
      inputs: [
        {
          name: 'address',
          value: this.address
        }
      ],
      buttons: [
        {
          text: ok,
          handler: data => {
            if (data.address) {
              this.fullAddress.address = data.address;
            } else {
              // invalid login
              return false;
            }
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: data => {

          }
        }
      ]
    });
    alert.present();
  }
}
