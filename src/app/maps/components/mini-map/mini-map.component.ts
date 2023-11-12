import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap ?: ElementRef;
  @Input() lngLat ?: [number, number];
  
  public  map ?: Map;
  private currentZoom : number = 15;
  
  ngAfterViewInit(): void {
    if(!this.divMap) {
      throw Error("Map container not found");
    }

    if(!this.lngLat) {
      throw Error("LngLat can't be null.")
    }

    
    // map
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.currentZoom,
      interactive: false,
    });
    
    if(!this.map) {
      throw Error("Map could not be created");
    }
    
    // marker
    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }
}
