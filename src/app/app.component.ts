import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Navbar } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'product-management-system';
}
