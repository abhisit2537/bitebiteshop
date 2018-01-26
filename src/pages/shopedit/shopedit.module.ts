import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopeditPage } from './shopedit';
import { TranslateModule } from '@ngx-translate/core';
import { PipesPipe } from '../../pipes/pipes/pipes';

@NgModule({
  declarations: [
    ShopeditPage,
    PipesPipe
  ],
  imports: [
    IonicPageModule.forChild(ShopeditPage),
    TranslateModule.forChild()
  ],
})
export class ShopeditPageModule {}
