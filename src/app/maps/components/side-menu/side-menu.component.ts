import { Component } from '@angular/core';
import { MenuItemInterface } from '../../Interface';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  
  public menuItems : MenuItemInterface[] = [
    {name: 'full screen', route: './fullscreen'},
    {name: 'Zoom range', route: './zoom-range'},
    {name: 'Markers', route: './markers'},
    {name: 'Houses', route: './house'},
  ];
}
