import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService) { }
  menuOpen: boolean = false;
  @Input() goBackIsHidden: boolean = false
  ngOnInit(): void {
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
  onLogout(): void {
    this.authService.logout();
  }

  onLogin() {
    this.authService.loginRedirection();
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goBack() {
    const currentUrl = window.location.href;
    const host = window.location.origin; // Récupère l'hôte actuel (http://localhost:4200 ou autre en prod)
    if (new RegExp(`${host}/appartement/\\d+/\\w+`).test(currentUrl)) {
      const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      if (lastSegment === 'description') {
        this.navigationService.sendNavigationConfirmation(); // ou false en fonction de votre logique
      } else {
        window.location.href = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
      }
    }
    else if (new RegExp(`${host}/appartement/\\d+`).test(currentUrl)) {
      window.location.href = host;
    }
  }
}
