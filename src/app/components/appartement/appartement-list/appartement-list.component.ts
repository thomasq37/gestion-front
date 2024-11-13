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
  appartementListOverview: Appartement[];
  totalALAchat: number = 0;
  totalEstimations: number = 0;
  totalRevenus: number = 0;
  totalDepenses: number = 0;
  totalBenefices: number = 0;
  selectionMode: boolean = false; // Gère si le mode de sélection est actif ou non
  filtreActif: string[] = [];
  filtresList =  [
    { id : 'revenus', nom : 'Revenus', prop: 'revenusNets'},
    { id : 'charges_fixes', nom : 'Charges fixes', prop: 'totalChargesFixesHorsFrais'},
    { id : 'travaux', nom : 'Travaux', prop: 'totalTravaux'},
    { id : 'frais_gestion', nom : 'Frais de gestion', prop: 'totalFraisGestion'},
    { id : 'honoraires', nom : 'Honoraires de location', prop: 'totalHonorairesDeLoc'},
    { id : 'depenses', nom : 'Dépenses', prop: 'depensesNettes'},
    { id : 'benefice_net', nom : 'Bénéfice net', prop: 'rentabiliteNette'},
    { id : 'benefice_mensuel', nom : 'Bénéfice mensuel moyen', prop: 'moyenneBeneficesNetParMois'},
    { id : 'taux_occupation', nom : 'Taux d\'occupation', prop: 'tauxVacanceLocative'}
  ]
  filtresIsVisibles = false;
  CCAppartements : AppartementCCDTO[]
  totalCC: AppartementCCDTO;
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

    this.gestionService.obtenirCCAppartementsParUserId(localStorage.getItem('userId'))
      .subscribe(CCAppartements => {
        this.CCAppartements = CCAppartements
        // Initialiser totalCC avec des valeurs à 0
        this.totalCC = {
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
          totalChargesFixesHorsFrais: 0
        };

        // Agréger chaque propriété
        this.CCAppartements.forEach(appartement => {
          this.totalCC.prixAchat += appartement.prixAchat;
          this.totalCC.estimation += appartement.estimation;
          this.totalCC.revenusNets += appartement.revenusNets;
          this.totalCC.depensesNettes += appartement.depensesNettes;
          this.totalCC.rentabiliteNette += appartement.rentabiliteNette;
          this.totalCC.tauxVacanceLocative += appartement.tauxVacanceLocative;
          this.totalCC.moyenneBeneficesNetParMois += appartement.moyenneBeneficesNetParMois;
          this.totalCC.totalTravaux += appartement.totalTravaux;
          this.totalCC.totalFraisGestion += appartement.totalFraisGestion;
          this.totalCC.totalHonorairesDeLoc += appartement.totalHonorairesDeLoc;
          this.totalCC.totalChargesFixesHorsFrais += appartement.totalChargesFixesHorsFrais;
        });

        // Optionnel : Calculer la moyenne du taux de vacance locative et du bénéfice net par mois
        const totalAppartements = this.CCAppartements.length;
        if (totalAppartements > 0) {
          this.totalCC.tauxVacanceLocative /= totalAppartements;
          this.totalCC.moyenneBeneficesNetParMois /= totalAppartements;
        }
      });
  }

  // Basculer le mode de sélection
  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    if (!this.selectionMode) {
      // Si on désactive le mode sélection, tout désélectionner
      this.appartementListOverview.forEach(appartement => appartement.selected = false);
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
