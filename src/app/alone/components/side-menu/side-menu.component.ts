import { Component } from '@angular/core';
import { MenuItemInterface } from '../../interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  
  public menuItems : MenuItemInterface[] = [
    {name: 'full screen', route: '/maps/fullscreen'},
    {name: 'Zoom range', route: '/maps/zoom-range'},
    {name: 'Markers', route: '/maps/markers'},
    {name: 'Houses', route: '/maps/house'},
    {name: 'Alone', route: '/alone'},
  ];
}
