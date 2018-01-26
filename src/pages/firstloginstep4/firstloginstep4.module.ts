import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Firstloginstep4Page } from './firstloginstep4';
import { PipesPipe } from '../../pipes/pipes/pipes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Firstloginstep4Page,
    PipesPipe
  ],
  imports: [
    IonicPageModule.forChild(Firstloginstep4Page),
    TranslateModule.forChild(),
  ],
})
export class Firstloginstep4PageModule {}
