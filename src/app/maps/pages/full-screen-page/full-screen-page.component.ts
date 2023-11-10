import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map')
    public divMap ?: ElementRef;

  public ngAfterViewInit() {
    if(!this.divMap) {
      throw Error('The map container was not found');
    }

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

      /* if (map) {
        const mapControlContainer = document.getElementsByClassName('mapboxgl-control-container');
        mapControlContainer[0].setAttribute('style', 'display: none');
        mapControlContainer[0]
      } */
  }
}
