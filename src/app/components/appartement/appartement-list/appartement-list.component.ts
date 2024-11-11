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
  totalALAchat: number = 0;
  totalEstimations: number = 0;
  totalRevenus: number = 0;
  totalDepenses: number = 0;
  totalBenefices: number = 0;
  selectionMode: boolean = false; // Gère si le mode de sélection est actif ou non
  filtreActif: string[] = [];
  filtresIsVisibles = false;

  constructor(private gestionService: GestionService, private router: Router) {
    this.appartementListOverview = [];
  }
  isProprietaire(): boolean {
    return localStorage.getItem('userRole') === "PROPRIETAIRE";
  }
  ngOnInit() {
    this.gestionService.obtenirAdressesAppartementsParUserId(localStorage.getItem('userId'))
      .subscribe(appartementListOverview => {
        this.appartementListOverview = appartementListOverview.map(appartement => ({
          ...appartement,
          selected: false  // Ajoute la propriété selected à chaque appartement
        }));
        this.calculerTotaux();
      });


  }

  // Basculer le mode de sélection
  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    if (!this.selectionMode) {
      // Si on désactive le mode sélection, tout désélectionner
      this.appartementListOverview.forEach(appartement => appartement.selected = false);
      this.calculerTotaux();
    }
    else{
      this.appartementListOverview.forEach(appartement => appartement.selected = true);

    }
  }

  // Basculer la sélection d'un appartement
  toggleSelection(appartement: Appartement) {
    appartement.selected = !appartement.selected;
    this.calculerTotaux();
  }

  // Calcul des totaux pour les appartements sélectionnés
  calculerTotaux() {
    const appartementsSelectionnes = this.appartementListOverview.filter(appartement => appartement.selected);

    if (appartementsSelectionnes.length > 0) {
      this.totalALAchat =
        appartementsSelectionnes.reduce((acc, appartement) => acc + appartement.prix, 0) +
        appartementsSelectionnes.reduce((acc, appartement) => acc + appartement.fraisNotaireEtNegociation, 0);
      this.totalEstimations = appartementsSelectionnes.reduce((acc, appartement) => acc + appartement.estimation, 0);
      this.totalRevenus = appartementsSelectionnes.reduce((acc, appartement) => acc + appartement.revenusNets, 0);
      this.totalDepenses = appartementsSelectionnes.reduce((acc, appartement) => acc + appartement.depensesNettes, 0);
      this.totalBenefices = this.totalRevenus - this.totalDepenses;
    } else {
      // Si aucun appartement n'est sélectionné, affichez les totaux pour tous les appartements
      this.totalALAchat =
        this.appartementListOverview.reduce((acc, appartement) => acc + appartement.prix, 0) +
        this.appartementListOverview.reduce((acc, appartement) => acc + appartement.fraisNotaireEtNegociation, 0);
      this.totalEstimations = this.appartementListOverview.reduce((acc, appartement) => acc + appartement.estimation, 0);
      this.totalRevenus = this.appartementListOverview.reduce((acc, appartement) => acc + appartement.revenusNets, 0);
      this.totalDepenses = this.appartementListOverview.reduce((acc, appartement) => acc + appartement.depensesNettes, 0);
      this.totalBenefices = this.totalRevenus - this.totalDepenses;
    }
  }
  toggleFiltre(filtre: string) {
    const index = this.filtreActif.indexOf(filtre);
    if (index === -1) {
      this.filtreActif.push(filtre); // Ajoute le filtre si non sélectionné
    } else {
      this.filtreActif.splice(index, 1); // Retire le filtre s'il est déjà sélectionné
    }
  }

  viewAppartement(appartementId: number) {
    if (!this.selectionMode) {
      this.router.navigate(['/appartement', appartementId]);
    }
  }

  toggleFiltres() {
    this.filtresIsVisibles = !this.filtresIsVisibles
    this.filtreActif = [];
  }
}
