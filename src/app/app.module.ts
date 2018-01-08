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
import { CoreserviceProvider } from '../providers/coreservice/coreservice';
import { CreateproductPage } from '../pages/createproduct/createproduct';
import { IonUploadImagesComponent } from '../components/ion-upload-image/ion-upload-image';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { CreatecatePage } from '../pages/createcate/createcate';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ProfilePage } from '../pages/profile/profile';
import { SortablejsModule } from "angular-sortablejs";
import { AgreementPage } from '../pages/agreement/agreement';
import { Firstloginstep1Page } from '../pages/firstloginstep1/firstloginstep1';
import { Firstloginstep2Page } from '../pages/firstloginstep2/firstloginstep2';
import { Firstloginstep3Page } from '../pages/firstloginstep3/firstloginstep3';
import { Firstloginstep4Page } from '../pages/firstloginstep4/firstloginstep4';
import { Firstloginstep5Page } from '../pages/firstloginstep5/firstloginstep5';

import { ShopeditPage } from '../pages/shopedit/shopedit';
import { ShoptimeeditPage } from '../pages/shoptimeedit/shoptimeedit';

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
    LoginPage,
    CreateproductPage,
    IonUploadImagesComponent,
    CreatecatePage,
    ProfilePage,
    AgreementPage,
    Firstloginstep1Page,
    Firstloginstep2Page,
    Firstloginstep3Page,
    Firstloginstep4Page,
    Firstloginstep5Page,
    ShopeditPage,
    ShoptimeeditPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SortablejsModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
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
    LoginPage,
    CreateproductPage,
    CreatecatePage,
    ProfilePage,
    AgreementPage,
    Firstloginstep1Page,
    Firstloginstep2Page,
    Firstloginstep3Page,
    Firstloginstep4Page,
    Firstloginstep5Page,
    ShopeditPage,
    ShoptimeeditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShopServiceProvider,
    Auth,
    Server,
    CoreserviceProvider,
    Base64,
    ImagePicker
  ]
})
export class AppModule {}
