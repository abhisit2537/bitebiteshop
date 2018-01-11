import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabnavPage } from '../tabnav/tabnav';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private googleMaps: GoogleMaps, private nativeGeocoder: NativeGeocoder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Firstloginstep5Page');
    this.getlocation();
  }

  save() {
    window.localStorage.setItem('bikebikeshopfirstlogin', 'true');
    this.navCtrl.setRoot(TabnavPage);
  }
  getlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude + '    ' + resp.coords.longitude);
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  showMap() {
    this.nativeGeocoder.reverseGeocode(this.lat, this.long)
      .then((result: NativeGeocoderReverseResult) => {
        // alert(JSON.stringify(result))
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
          lat: this.lat,
          lng: this.long
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.long
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                this.nativeGeocoder.reverseGeocode(this.lat, this.long)
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
  }
}

