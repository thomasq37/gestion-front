import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent {
  constructor(
    private router: Router
  ) {

  }
  deconnexion() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/connexion'])
  }
}
