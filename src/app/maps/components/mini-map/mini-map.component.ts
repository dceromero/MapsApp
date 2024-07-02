import { Map, Marker } from 'mapbox-gl';
import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{

  @Input() lngLat?: [number, number];  
  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;
  public zoom: number = 14;

  ngAfterViewInit(): void {
    if(!this.lngLat) throw new Error('lngLat no fue encontrado');
    if(!this.divMap) throw new Error('El div Mapa no fue encontrado');
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
      interactive: false
    });

    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }
}
