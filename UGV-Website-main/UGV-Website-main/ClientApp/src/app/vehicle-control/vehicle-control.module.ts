import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleControlComponent } from './vehicle-control/vehicle-control.component';
import { LiveStreamComponent } from './live-stream/live-stream.component';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [
    VehicleControlComponent,
    LiveStreamComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleControlModule { }
