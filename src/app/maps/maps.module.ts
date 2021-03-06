import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { MapRoutes } from './maps.routing';
import { MapgoogleComponent } from './map-google/map-google.component';
import { MapTripComponent } from './map-trip/map-trip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapOnlineComponent } from './map-online/map-online.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(MapRoutes), AgmCoreModule, NgbModule],
  declarations: [MapgoogleComponent, MapTripComponent, MapOnlineComponent]
})
export class MapsModule {}
