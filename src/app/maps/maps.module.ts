import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { MapRoutes } from './maps.routing';
import { MapgoogleComponent } from './map-google/map-google.component';
import { MapTripComponent } from './map-trip/map-trip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(MapRoutes), AgmCoreModule, NgbModule],
  declarations: [MapgoogleComponent, MapTripComponent]
})
export class MapsModule {}
