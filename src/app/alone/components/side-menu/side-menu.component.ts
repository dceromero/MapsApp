import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  route: string;
}
@Component({
  selector: 'side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  imports: [CommonModule, RouterModule],
  styles: `li{
    cursor: pointer;
    transition: 300ms all ease-in-out;
    }`
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {
      name: 'Full Screen',
      route: 'fullscreen'
    },
    {
      name: 'Zoom Range',
      route: 'zoom-range'
    },
    {
      name: 'Properties',
      route: 'properties'
    },
    {
      name: 'Markers',
      route: 'markers'
    },
    {
      name: 'Alone Component',
      route: '/alone/'
    }
  ]
}
