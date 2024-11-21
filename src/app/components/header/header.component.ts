import { Component, Input, OnInit, HostListener } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NavigationService } from "../../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuOpen: boolean = false;
  isFixed: boolean = false; // Propriété pour le header fixe
  lastScrollPosition: number = 0; // Garde en mémoire la dernière position de scroll

  @Input() goBackIsHidden: boolean = false;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) { }

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
    const host = window.location.origin;
    if (new RegExp(`${host}/appartement/\\d+/\\w+`).test(currentUrl)) {
      const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      if (lastSegment === 'description') {
        this.navigationService.sendNavigationConfirmation();
      } else {
        window.location.href = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
      }
    }
    else if (new RegExp(`${host}/appartement/\\d+`).test(currentUrl)) {
      window.location.href = host;
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    this.isFixed = currentScrollPosition > this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition;
  }
}
