import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecatePage } from './createcate';

@NgModule({
  declarations: [
    CreatecatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecatePage),
  ],
})
export class CreatecatePageModule {}
