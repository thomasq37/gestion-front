import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private authService: AuthService, private location: Location) { }
  menuOpen: boolean = false;
  isDragging = false;
  @Input() goBackIsHidden: boolean = false
  onDragStart(event: any): void {
    this.isDragging = true;
  }

  onDragEnd(event: any): void {
    this.isDragging = false;
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }

  ngOnInit(): void {
    // Lors de l'initialisation, vérifiez la position précédemment enregistrée
    this.setButtonPositionFromLocalStorage();
  }

  setButtonPositionFromLocalStorage(): void {
    const button = document.querySelector('button');
    const position = localStorage.getItem('buttonPosition');

    if (button && position === 'right') {
      button.classList.add('switched');
    } else if (button) {
      button.classList.remove('switched');
    }
  }

  onDrop(event: any): void {
    event.preventDefault();
    const button = document.querySelector('button');
    if (this.isDragging && button) {
      if (button.classList.contains('switched')) {
        button.classList.remove('switched');
        localStorage.setItem('buttonPosition', 'left');
      } else {
        button.classList.add('switched');
        localStorage.setItem('buttonPosition', 'right');
      }
    }
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

  goBack(): void {
    this.location.back();
  }
}
