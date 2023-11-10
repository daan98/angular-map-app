import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerInterface } from '../../Interface';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map')
  public  divMap              ?: ElementRef;
  private map                 ?: Map;
  private mapControlContainer ?: HTMLCollectionOf<Element>;
  public  currentZoom          : number                        = 12;
  public currentLngLat         : LngLat                        = new LngLat(-47.92, -15.80);
  public markers               : MarkerInterface[]             = [];
  
  public ngAfterViewInit() {
    if(!this.divMap) {
      throw Error('The map container was not found');
    }
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.currentZoom,
    });
    
    /* this.mapControlContainer = document.getElementsByClassName('mapboxgl-control-container');
    this.mapControlContainer[0].setAttribute('style', 'display: none'); */

    const marker = new Marker({ color }).setLngLat(this.currentLngLat).addTo(this.map);

    // this.addMarker();
  }

  public createMarker() {
    if (!this.map) {
      return;
    }

    const color  : string = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat : LngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  public addMarker(lngLat : LngLat, color: string) {
    if(!this.map) {
      return;
    }

    const marker : Marker = new Marker({ color, draggable: true }).setLngLat(lngLat).addTo(this.map);

    this.markers.push({
      color,
      coordinates: lngLat,
      marker
    });
  }

  public deleteMarker(index : number) {
    console.log('deleteMarker : ', index);
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  public flyTo(pointTo : MarkerInterface) {
    if(!this.map) {
      return;
    }

    this.map.flyTo({
      zoom: 14,
      center: pointTo.marker.getLngLat()
    })
  }
}
