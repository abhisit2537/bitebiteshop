import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Firstloginstep1Page } from './firstloginstep1';
import { PreloadImageComponent } from '../../components/preload-image/preload-image';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Firstloginstep1Page
  ],
  imports: [
    IonicPageModule.forChild(Firstloginstep1Page),
    ComponentsModule
  ],
})
export class Firstloginstep1PageModule {}
