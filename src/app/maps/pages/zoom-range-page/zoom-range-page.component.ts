import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, GeolocateControl } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;
  public zoom: number = 10;
  public lngLat: LngLat = new LngLat(-74.86476414656136, 10.959634537275562);

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('El elemento HTML no fue encontrado');
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
    });

    this.map.addControl(
      new GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
      })
  );
    this.mapListener();
  }

  ngOnDestroy(): void {
    /*
    Solo para remover un solo metodo
    this.map?.off('zoom', () => {});
     this.map?.off('zoomend', () => {}); 
     this.map?.off('move', () => {});
     */
    this.map?.remove();
  }

  mapListener() {
    if (!this.map) throw new Error('Mapa no inicializado');

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() > 18) {
        this.map!.zoomTo(18);
      }
    });

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    });

  }

  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange(zoom: string) {
    this.zoom = Number(zoom);
    this.map?.zoomTo(this.zoom);
  }
}
