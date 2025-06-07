import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-outils-vue-ensemble',
  templateUrl: './outils-vue-ensemble.component.html',
  styleUrls: ['./outils-vue-ensemble.component.scss']
})
export class OutilsVueEnsembleComponent {
  constructor(private router: Router) {}

  naviguerAOutilCapaciteEmprunt() {
    this.router.navigate(['/outils/ma-capacite-emprunt']);
  }
}
