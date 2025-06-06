import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-globale',
  templateUrl: './navigation-globale.component.html',
  styleUrls: ['./navigation-globale.component.scss']
})
export class NavigationGlobaleComponent {

  constructor(private router: Router) {}

  // Méthode pour vérifier si une route est active
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  // Méthodes de navigation
  navigateToLogements(): void {
    this.router.navigate(['/logements']);
  }

  navigateToPlacements(): void {
    this.router.navigate(['/placements']);
  }

  navigateToOutils(): void {
    this.router.navigate(['/outils']);
  }
}
