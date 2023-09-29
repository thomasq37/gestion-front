import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }
  menuOpen: boolean = false;
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

}
