import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabnavPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabnav',
  templateUrl: 'tabnav.html'
})
export class TabnavPage {

  shopRoot = 'ShopPage'
  bikerRoot = 'BikerPage'
  orderRoot = 'OrderPage'
  statusRoot = 'StatusPage'
  moreRoot = 'MorePage'


  constructor(public navCtrl: NavController) {}

}
