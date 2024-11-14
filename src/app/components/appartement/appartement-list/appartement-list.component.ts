import {Component, OnInit} from '@angular/core';
import {GestionService} from "../../../services/gestion.service";
import {Appartement, AppartementCCDTO} from "../../../models/gestion";
import {Router} from "@angular/router";
import {hasProprietaireRole} from "../../../services/http-helpers";

@Component({
  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.scss']
})
export class AppartementListComponent implements OnInit {
  appartementAddresses: Appartement[];
  appartementMetrics : AppartementCCDTO[]
  totalMetrics: any = {};
  isBulkSelectionMode: boolean = false;
  isLoading: boolean = true;
  areAddressesLoaded: boolean = false;
  areMetricsLoaded: boolean = false;
  activeFilters: string[] = [];
  filterOptions: any[] = [];
  isFilterPanelVisible = false;
  constructor(private gestionService: GestionService, private router: Router) {
    this.appartementAddresses = [];
  }
  ngOnInit() {
    this.gestionService.obtenirAdressesAppartementsParUserId()
      .then(appartementAddresses => {
        this.appartementAddresses = appartementAddresses.map(appartement => ({
          ...appartement,
          selected: false
        }));
        this.areAddressesLoaded = true;
        this.checkLoadingStatus();
      });
    this.gestionService.obtenirCCAppartementsParUserId()
      .then(appartementMetrics => {
        this.appartementMetrics= appartementMetrics
        this.calculateTotalMetrics(true)
        if (this.appartementMetrics.length > 0) {
          this.filterOptions = Object.keys(this.appartementMetrics[0]).map(key => ({
            id: key,
            nom: this.formatMetricName(key),
            prop: key
          }));
          this.filterOptions.shift()
        }
        this.areMetricsLoaded = true;
        this.checkLoadingStatus();
      });
  }
  checkLoadingStatus() {
    this.isLoading = !(this.areAddressesLoaded && this.areMetricsLoaded);
  }
  formatMetricName(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
  toggleBulkSelectionMode() {
    this.isBulkSelectionMode = !this.isBulkSelectionMode;
    this.appartementAddresses.forEach(appartement => appartement.selected = this.isBulkSelectionMode);
    this.calculateTotalMetrics(true);
  }
  toggleAppartementSelection(appartement: Appartement) {
    appartement.selected = !appartement.selected;
    this.calculateTotalMetrics(false)
  }
  toggleFilter(filtre: string) {
    this.activeFilters.includes(filtre) ? this.activeFilters.splice(this.activeFilters.indexOf(filtre), 1) : this.activeFilters.push(filtre);
  }
  getAppartementMetricValue(appartementId: number, prop: string): number {
    const appartement = this.appartementMetrics.find(a => a.appartementId === appartementId);
    return appartement ? appartement[prop] || 0 : 0;
  }
  navigateToAppartementDetails(appartementId: number) {
    if (!this.isBulkSelectionMode) {
      this.router.navigate(['/appartement', appartementId]);
    }
  }
  toggleFilterPanel() {
    this.isFilterPanelVisible = !this.isFilterPanelVisible
    this.activeFilters = [];
  }
  calculateTotalMetrics(init: boolean) {
    const selectedAppartementIds = init ?
      this.appartementAddresses.map(a => a.id) :
      this.appartementAddresses.filter(a => a.selected).map(a => a.id);
    const appartementsSelectionnes = this.appartementMetrics.filter(a => selectedAppartementIds.includes(a.appartementId));
    this.totalMetrics = appartementsSelectionnes.reduce((acc, appartement) => {
      Object.keys(acc).forEach(key => {
        acc[key] += appartement[key] || 0;
      });
      return acc;
    }, {
      appartementId: -1,
      prixAchat: 0,
      estimation: 0,
      fraisNotaireEtNegociation:0,
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
      this.totalMetrics.tauxVacanceLocative /= totalSelected;
      this.totalMetrics.moyenneBeneficesNetParMois /= totalSelected;
    }
  }

  protected readonly hasProprietaireRole = hasProprietaireRole;
}
