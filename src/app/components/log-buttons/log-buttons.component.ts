import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-log-buttons',
  templateUrl: './log-buttons.component.html',
  styleUrls: ['./log-buttons.component.scss']
})
export class LogButtonsComponent {
  constructor(private authService: AuthService) { }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
  onLogout(): void {
    this.authService.logout();
  }

  onLogin() {
    this.authService.loginRedirection();
  }
}
