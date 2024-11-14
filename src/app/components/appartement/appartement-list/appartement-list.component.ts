import {Component, OnInit} from '@angular/core';
import {GestionService} from "../../../services/gestion.service";
import {Appartement, AppartementCCDTO} from "../../../models/gestion";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.scss']
})
export class AppartementListComponent implements OnInit {
  adressesAppartement: Appartement[];
  selectionMode: boolean = false;
  filtreActif: string[] = [];
  filtresList: any[] = [];
  filtresIsVisibles = false;
  CCAppartements : AppartementCCDTO[]
  totalCC: any = {};
  constructor(private gestionService: GestionService, private router: Router) {
    this.adressesAppartement = [];
  }
  isUserOwner(): boolean {
    return localStorage.getItem('userRole') === "PROPRIETAIRE";
  }
  ngOnInit() {
    this.gestionService.obtenirAdressesAppartementsParUserId(localStorage.getItem('userId'))
      .subscribe(adressesAppartement => {
        this.adressesAppartement = adressesAppartement.map(appartement => ({
          ...appartement,
          selected: false
        }));
      });
    this.gestionService.obtenirCCAppartementsParUserId(localStorage.getItem('userId'))
      .subscribe(CCAppartements => {
        this.CCAppartements= CCAppartements
        this.calculateTotalMetrics(true)
        if (this.CCAppartements.length > 0) {
          this.filtresList = Object.keys(this.CCAppartements[0]).map(key => ({
            id: key,
            nom: this.formatMetricName(key),
            prop: key
          }));
          this.filtresList.shift()
        }
      });
  }
  formatMetricName(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
  toggleBulkSelectionMode() {
    this.selectionMode = !this.selectionMode;
    this.adressesAppartement.forEach(appartement => appartement.selected = this.selectionMode);
    this.calculateTotalMetrics(true);
  }
  toggleAppartementSelection(appartement: Appartement) {
    appartement.selected = !appartement.selected;
    this.calculateTotalMetrics(false)
  }
  toggleFilter(filtre: string) {
    this.filtreActif.includes(filtre) ? this.filtreActif.splice(this.filtreActif.indexOf(filtre), 1) : this.filtreActif.push(filtre);
  }
  getAppartementMetricValue(appartementId: number, prop: string): number {
    const appartement = this.CCAppartements.find(a => a.appartementId === appartementId);
    return appartement ? appartement[prop] || 0 : 0;
  }
  navigateToAppartementDetails(appartementId: number) {
    if (!this.selectionMode) {
      this.router.navigate(['/appartement', appartementId]);
    }
  }
  toggleFilterPanel() {
    this.filtresIsVisibles = !this.filtresIsVisibles
    this.filtreActif = [];
  }
  calculateTotalMetrics(init: boolean) {
    const selectedAppartementIds = init ?
      this.adressesAppartement.map(a => a.id) :
      this.adressesAppartement.filter(a => a.selected).map(a => a.id);
    const appartementsSelectionnes = this.CCAppartements.filter(a => selectedAppartementIds.includes(a.appartementId));
    this.totalCC = appartementsSelectionnes.reduce((acc, appartement) => {
      Object.keys(acc).forEach(key => {
        acc[key] += appartement[key] || 0;
      });
      return acc;
    }, {
      appartementId: -1,
      prixAchat: 0,
      estimation: 0,
      revenusNets: 0,
      depensesNettes: 0,
      rentabiliteNette: 0,
      tauxVacanceLocative: 0,
      moyenneBeneficesNetParMois: 0,
      totalTravaux: 0,
      totalFraisGestion: 0,
      totalHonorairesDeLoc: 0,
      totalChargesFixesHorsFrais: 0,
    });

    const totalSelected = appartementsSelectionnes.length;
    if (totalSelected > 0) {
      this.totalCC.tauxVacanceLocative /= totalSelected;
      this.totalCC.moyenneBeneficesNetParMois /= totalSelected;
    }
  }
}
