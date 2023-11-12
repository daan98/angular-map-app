import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerInterface, PlainMarkerInterface } from '../../Interface';

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

    // const marker = new Marker({ color }).setLngLat(this.currentLngLat).addTo(this.map);

    this.readFromLocalStorage();
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

    this.saveToLocalStorage();

    marker.on('dragend', (e) => {
      console.log('dragend before saving in local storage: ', e);
      this.saveToLocalStorage()
      console.log('drag ended')
    });
  }

  public deleteMarker(index : number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
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

  public saveToLocalStorage() : void {
    const plainMarkers : PlainMarkerInterface[] = this.markers.map(({color, marker}) => {
      return {
        color: color,
        lngLat : marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarker', JSON.stringify(plainMarkers));
  }

  public readFromLocalStorage(): void {
    const plainMarkersString : string = localStorage.getItem('plainMarker') ?? '[]';
    // '... : PlainMarkerInterface[]' ONLY USED BECAUSE WE KNOW PROPERTIES WILL ALWAYS BE THE ONES PlainMarkerInterface HAS
    const plainMarkers : PlainMarkerInterface[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    });
    console.log('readFromLocalStorage plainMarkers: ', plainMarkers);
  }
}
