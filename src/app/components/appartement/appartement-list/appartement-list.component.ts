import {Component, OnInit} from '@angular/core';
import {GestionService} from "../../../services/gestion.service";
import {Appartement} from "../../../models/gestion";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.scss']
})
export class AppartementListComponent implements OnInit {
  appartementListOverview: Appartement[];
  totalEstimations: number = 0;
  totalRevenus: number = 0;
  totalDepenses: number = 0;
  totalBenefices: number = 0;
  constructor(private gestionService: GestionService, private router: Router) {
    this.appartementListOverview = [];
  }

  ngOnInit() {
    this.gestionService.obtenirAdressesAppartementsParUserId(localStorage.getItem('userId'))
      .subscribe(appartementListOverview => {
        this.appartementListOverview = appartementListOverview;
        this.calculerTotaux();

      });
  }
  calculerTotaux() {
    this.totalEstimations = this.appartementListOverview.reduce((acc, appartement) => acc + appartement.estimation, 0);
    this.totalRevenus = this.appartementListOverview.reduce((acc, appartement) => acc + appartement.revenusNets, 0);
    this.totalDepenses = this.appartementListOverview.reduce((acc, appartement) => acc + appartement.depensesNettes, 0);
    this.totalBenefices = this.totalRevenus - this.totalDepenses;
  }
  viewAppartement(appartementId: number) {
    this.router.navigate(['/appartement', appartementId]);
  }
}
