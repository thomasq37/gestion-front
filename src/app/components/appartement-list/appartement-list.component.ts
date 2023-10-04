import {Component, OnInit} from '@angular/core';
import {GestionService} from "../../services/gestion.service";
import {AdresseDTO} from "../../models/gestion";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.scss']
})
export class AppartementListComponent implements OnInit {
  appartementListOverview: AdresseDTO[];

  constructor(private gestionService: GestionService, private router: Router) {
    this.appartementListOverview = [];
  }

  ngOnInit() {
    this.gestionService.obtenirAdressesAppartementsParUserId(localStorage.getItem('app_user_id'))
      .subscribe(appartementListOverview => {
        this.appartementListOverview = appartementListOverview;

      });
  }
  viewAppartement(appartementId: number) {
    this.router.navigate(['/appartement', appartementId]);
  }
}
