import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapsRoutingModule } from './maps-routing.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGNlcm9tZXJvIiwiYSI6ImNseDlzM245azFmZDAyaW9qaGhyZTFkbWoifQ.AQ6jHD5wzUXPem5e_y6Y0w';

import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';




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
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent
  ]
})
export class MapsModule { }
