import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopeditPage } from './shopedit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShopeditPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopeditPage),
    TranslateModule.forChild()
  ],
})
export class ShopeditPageModule {}
