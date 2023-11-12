import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';

import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';


(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGFhbjk4IiwiYSI6ImNsb2oxZ2h4ODA3Y2oya3MyaG00eTV4cHoifQ.47fiUvjLNqqryVi-5C-PUA';

@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CounterAloneComponent,
    CommonModule,
    MapsRoutingModule,
    SideMenuComponent
  ]
})
export class MapsModule { }
