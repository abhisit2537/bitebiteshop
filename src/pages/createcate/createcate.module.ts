import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecatePage } from './createcate';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreatecatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecatePage),
    TranslateModule.forChild()
  ],
})
export class CreatecatePageModule {}
