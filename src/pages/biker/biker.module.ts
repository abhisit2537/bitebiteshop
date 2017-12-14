import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikerPage } from './biker';

@NgModule({
  declarations: [
    BikerPage,
  ],
  imports: [
    IonicPageModule.forChild(BikerPage),
  ],
})
export class BikerPageModule {}
