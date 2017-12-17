import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabnavPage } from '../pages/tabnav/tabnav';
import { ShopServiceProvider } from '../pages/shop/shop-service';
import { ShopPage } from '../pages/shop/shop';
import { BikerPage } from '../pages/biker/biker';
import { OrderPage } from '../pages/order/order';
import { StatusPage } from '../pages/status/status';
import { MorePage } from '../pages/more/more';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { Auth } from '../providers/auth-service/auth-service';
import { Server } from '../providers/server-config/server-config';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShopPage,
    BikerPage,
    OrderPage,
    StatusPage,
    MorePage,
    TabnavPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShopPage,
    BikerPage,
    OrderPage,
    StatusPage,
    MorePage,
    TabnavPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShopServiceProvider,
    Auth,
    Server
  ]
})
export class AppModule {}
