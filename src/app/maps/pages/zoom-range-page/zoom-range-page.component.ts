import { AfterViewInit, Component, ElementRef, OnDestroy,  ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl'

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public  divMap              ?: ElementRef;
  private map                 ?: Map;
  private mapControlContainer ?: HTMLCollectionOf<Element>;
  public  currentZoom          : number = 8
  public currentLngLat         : LngLat = new LngLat(-47.17237376929572, -15.628305044941754);
  
  public ngAfterViewInit() {
    if(!this.divMap) {
      throw Error('The map container was not found');
    }
    
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.currentZoom,
    });
    
    /* this.mapControlContainer = document.getElementsByClassName('mapboxgl-control-container');
    this.mapControlContainer[0].setAttribute('style', 'display: none'); */
    
    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  public mapListener() : void {
    if (!this.map) {
      throw Error('Map not initialized');
    }

    this.map.on('zoom', (ev) =>  {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) {
        return;
      }

      this.map!.zoomTo(18);
    });

    this.map.on('move',  (ev) => {
      console.log('moveend', ev);
      console.log('map:', this.map);
      this.currentLngLat = this.map!.getCenter();
      this.currentLngLat.lng.toFixed(2);
      this.currentLngLat.lat.toFixed(2);
    });
  }

  public onZoomIn() : void {
    if(this.currentZoom >= 18) {
      return;
    }
    this.map!.zoomIn();
  }

  public onZoomOut() : void {
    if(this.currentZoom <= -2) {
      return;
    }
    this.map!.zoomOut()
  }

  public onZoomRanged(value : string) : void {
    this.currentZoom = Number(value);
    this.map!.zoomTo(this.currentZoom);
  }
}
