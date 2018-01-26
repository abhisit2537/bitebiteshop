import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateproductPage } from './createproduct';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateproductPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateproductPage),
    TranslateModule.forChild()
  ],
})
export class CreateproductPageModule {}
