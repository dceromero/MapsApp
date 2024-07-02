import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, GeolocateControl, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker?: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;
  public zoom: number = 14;
  public lngLat: LngLat = new LngLat(-74.86476414656136, 10.959634537275562);
  public markers: MarkerAndColor[] = [];


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
    this.readFromLocalStorage();
    /*
        const nombre = document.createElement('div');
        nombre.innerHTML = 'Jimmy Romero'
        const Market = new Marker({
          color: 'red', // Color del punto de marcador
          draggable: true, // Mover el punto de marcador
          element: nombre // Elemento HTML para el punto de marcador
        })
          .setLngLat(this.lngLat)
          .addTo(this.map);
          */
  }

  public createMarker() {
    if (!this.map) throw new Error('Mapa no inicializado')
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMaker(lngLat, color);
  }

  private addMaker(lngLat: LngLat, color: string) {
    if (!this.map) throw new Error('Mapa no inicializado')

    const marker = new Marker({
      color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();
    marker.on('dragend', () => this.saveToLocalStorage());
  }

  goMarker(marker: Marker) {
    if (!this.map) throw new Error('Mapa no inicializado')
    this.map.flyTo({
      center: marker.getLngLat()
    })
  }

  deleteMarker(idx: number) {
    this.markers.at(idx)?.marker?.remove();
    this.markers.splice(idx, 1);
  }

  private saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(m => {
      return {
        color: m.color,
        lngLat: m.marker!.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }


  private readFromLocalStorage() {
    const plainMarkers: PlainMarker[] = JSON.parse(localStorage.getItem('plainMarkers') ?? '[]');
    plainMarkers.forEach(m => {
      this.addMaker(new LngLat(m.lngLat[0], m.lngLat[1]), m.color);
    })
  }
}
