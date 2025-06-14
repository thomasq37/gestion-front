import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import { PlacementService } from "../../../../services/v2/placement/placement.service";
import { TotalCompteService } from "../../../../services/v2/total-compte/total-compte.service";
import { PlacementVueEnsembleDTO } from "../../../../models/v2/entites/Placement/PlacementVueEnsembleDTO.model";
import { TotalCompteDTO } from "../../../../models/v2/entites/TotalCompte/TotalCompteDTO.model";

@Component({
  selector: 'app-placement-vue-ensemble',
  templateUrl: './placement-vue-ensemble.component.html',
  styleUrls: ['./placement-vue-ensemble.component.scss']
})
export class PlacementVueEnsembleComponent {
  placements: PlacementVueEnsembleDTO[] = [];
  totalCompteHistorique: TotalCompteDTO[] = [];
  isModalVisible = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer cet enregistrement ?";
  masqueIdASupprimer: string | null = null;
  chartData: any = { labels: [], datasets: [] };
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  loading = false;
  error: string | null = null;
  afficherListe = false;
  msgTotalEnregistrer: string = 'Enregistrer le total';

  constructor(
    private router: Router,
    private placementService: PlacementService,
    private totalCompteService: TotalCompteService
  ) {}

  ngOnInit(): void {
    this.listerPlacements();
    this.chargerEvolution();
  }

  async listerPlacements(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.placements = await this.placementService.listerPlacements();
    } catch (err) {
      this.error = 'Erreur lors du chargement des placements.';
    } finally {
      this.loading = false;
    }
  }

  async chargerEvolution(): Promise<void> {
    try {
      this.totalCompteHistorique = await this.totalCompteService.listerTotalComptes();
      this.totalCompteHistorique.sort((a, b) =>
        a.dateEnregistrement.localeCompare(b.dateEnregistrement)
      );

      const labels = this.totalCompteHistorique.map(tc =>
        new Date(tc.dateEnregistrement).toLocaleDateString('fr-FR')
      );
      const data = this.totalCompteHistorique.map(tc => tc.montant);

      this.chartData = {
        labels,
        datasets: [{
          data,
          label: 'Évolution du capital (€)',
          fill: false,
          tension: 0.2,
          borderWidth: 2
        }]
      };
    } catch (e) {
      this.error = "Erreur lors du chargement des données d'évolution.";
      console.error(e);
    }
  }

  creerPlacement() {
    this.router.navigate(['/placements/creer']);
  }

  modifierPlacement(placementMasqueId: string) {
    this.router.navigate([`/placements/${placementMasqueId}/modifier`]);
  }

  getTotalPlacements(): number {
    return this.placements.reduce((total, placement) => {
      let capital = placement.capital;
      return total + (isNaN(capital) ? 0 : capital);
    }, 0);
  }

  toggleListeEvolutions() {
    this.afficherListe = !this.afficherListe;
  }

  sauvegarderCapitalActuel() {
    const dateAujourdHui = new Date().toISOString().split('T')[0];
    const totalCompte: TotalCompteDTO = {
      montant: this.getTotalPlacements(),
      dateEnregistrement: dateAujourdHui
    };

    this.totalCompteService.creerTotalCompte(totalCompte).then(() => {
      this.msgTotalEnregistrer = 'Total enregistré!';
      this.chargerEvolution();
      setTimeout(() => {
        this.msgTotalEnregistrer = 'Enregistrer le total';
      }, 1000);
    });
  }
  async supprimerTotalCompte(masqueId: string) {
    if (!confirm('Confirmer la suppression de cet enregistrement ?')) return;

    try {
      await this.totalCompteService.supprimerEtMettreAJourCache(masqueId);
      this.totalCompteHistorique = this.totalCompteHistorique.filter(t => t.masqueId !== masqueId);
      this.chargerEvolution(); // met à jour le graphique
    } catch (err) {
      this.error = "Erreur lors de la suppression.";
      console.error(err);
    }
  }
  ouvrirModalSuppression(masqueId: string): void {
    this.masqueIdASupprimer = masqueId;
    this.isModalVisible = true;
  }

  fermerModalSuppression(): void {
    this.isModalVisible = false;
    this.masqueIdASupprimer = null;
  }

  async confirmerSuppression(): Promise<void> {
    if (!this.masqueIdASupprimer) return;

    try {
      await this.totalCompteService.supprimerEtMettreAJourCache(this.masqueIdASupprimer);
      this.totalCompteHistorique = this.totalCompteHistorique.filter(t => t.masqueId !== this.masqueIdASupprimer);
      this.chargerEvolution(); // recharge le graphique
    } catch (err) {
      this.error = "Erreur lors de la suppression.";
      console.error(err);
    } finally {
      this.fermerModalSuppression();
    }
  }
  naviguerVersModificationTotal(masqueId: string) {
    this.router.navigate(['/placements/total-compte', masqueId, 'modifier']);
  }

}
