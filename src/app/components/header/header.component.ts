import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        const now = Date.now().valueOf() / 1000;
        this.isLoggedIn = payload.exp > now;
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        this.isLoggedIn = false;
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogout(): void {
    localStorage.removeItem('auth_token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
