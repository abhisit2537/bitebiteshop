import { NgModule } from '@angular/core';
import { IonUploadImagesComponent } from "../components/ion-upload-image/ion-upload-image";
import { PreloadImageComponent } from './preload-image/preload-image';
@NgModule({
	declarations: [IonUploadImagesComponent,
    PreloadImageComponent],
	imports: [],
	exports: [IonUploadImagesComponent,
    PreloadImageComponent]
})
export class ComponentsModule {}
