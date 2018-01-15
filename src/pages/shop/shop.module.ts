import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SortablejsModule } from "angular-sortablejs";
import { createTranslateLoader } from '../../app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ShopPage,
    PreloadImageComponent
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    TranslateModule.forChild(),
    SortablejsModule
  ],
})
export class ShopPageModule { }
