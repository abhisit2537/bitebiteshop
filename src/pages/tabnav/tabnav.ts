import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { BikerPage } from '../biker/biker';
import { OrderPage } from '../order/order';
import { StatusPage } from '../status/status';
import { MorePage } from '../more/more';

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
  @ViewChild('myTabs') tabRef: Tabs;
  shopRoot = ShopPage;
  bikerRoot = BikerPage;
  orderRoot = OrderPage;
  statusRoot = StatusPage;
  moreRoot = MorePage;


  constructor(public navCtrl: NavController) {}
  ordertab(){
    this.tabRef.select(2);
  }
  getSelectedTab(){
    return 0;
  }
}
