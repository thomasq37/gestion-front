import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FinancesService} from "../../../services/finances.service";
import {Mouvement} from "../../../models/mouvement.model";
import {Chart, ChartConfiguration, registerables} from 'chart.js';
@Component({
  selector: 'app-dashboard-finances',
  templateUrl: './dashboard-finances.component.html',
  styleUrls: ['./dashboard-finances.component.scss']
})
export class DashboardFinancesComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  mouvements: Mouvement[] = []
  resteAVivre: number = -1
  progress: number = 0; // Ajoutez cette ligne pour définir le pourcentage de progression
  constructor(private financesService: FinancesService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Montants

  }



  ngOnInit(): void {
    this.loadMouvements();
    this.updateProgress();
  }

  updateProgress(): void {
    const totalRevenus = this.calculerTotalRevenusMensuels(this.mouvements);
    const totalDepenses = this.calculerTotalDepensesMensuelles(this.mouvements);
    this.progress = totalDepenses / totalRevenus * 100;
  }


  loadMouvements(): void {
    this.financesService.getAllMouvements().subscribe(mouvements => {
      this.mouvements = mouvements;
      this.resteAVivre = this.calculerResteAVivre(this.mouvements);
      const objectifTotal = this.calculerTotalRevenusMensuels(this.mouvements);
      const montantAtteint = this.calculerTotalDepensesMensuelles(this.mouvements);

      // Utiliser les montants réels pour le graphique
      const montantRestant = objectifTotal - montantAtteint;

      const chartConfiguration: ChartConfiguration<'doughnut', number[]> = {
        type: 'doughnut',
        data: {
          labels: ['Dépensé', 'Restant'],
          datasets: [{
            label: 'Budget',
            data: [montantAtteint, montantRestant],
            backgroundColor: ['rgb(217,217,217)', 'rgb(255,0,0)'],
            borderColor: ['rgb(217,217,217)', 'rgb(255,0,0)'],
            borderWidth: 1,
          }],
        },
        options: {

          responsive: true,
          rotation: 270, // Démarre à partir du haut
          circumference: 180, // Demi-cercle
          cutout: 100, // Ajustez selon votre version de Chart.js
          plugins: {
            title: {
              display: true,
              text: 'Total du revenu restant après déduction des charges par mois',
              position: 'bottom'
            },
            legend: {
              display: true, // Cache la légende si non désirée

            },
            tooltip: {
              enabled: true
            }
          },
          animation: {
            onComplete: function () {
              const ctx = this.ctx;
              const width = this.width;
              const height = this.height;
              ctx.font = '16px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'black';

              // Texte personnalisé
              const texteTotal = `Revenus : ${objectifTotal}€`;

              // Positionnement du texte sous l'arc de cercle
              ctx.fillText(texteTotal, width / 2, height / 2 + 30);
            }
          },
        },
      };

      // Création du graphique
      const chart = new Chart(this.myChart.nativeElement.getContext('2d'), chartConfiguration);

      // Forcer l'affichage du tooltip par défaut
      chart.update();
      chart.tooltip.setActiveElements([{datasetIndex: 0, index: 1}], {x: 0, y: 0});
      chart.update();
    });
  }


  calculerResteAVivre(mouvements: Mouvement[]): number {
    let totalRevenusMensuels = 0;
    let totalDepensesMensuelles = 0;

    mouvements.forEach(mouvement => {
      let montantMensuel;
      // Pour un paiement annuel, diviser le montant par 12 pour obtenir l'équivalent mensuel
      if (mouvement.frequence === 1) {
        montantMensuel = mouvement.montant / 12.0;
      } else {
        // Pour les paiements plus fréquents que annuels, ajuster le montant à son équivalent mensuel
        montantMensuel = mouvement.montant * mouvement.frequence / 12.0;
      }

      if (mouvement.type) {
        // C'est un revenu
        totalRevenusMensuels += montantMensuel;
      } else {
        // C'est une dépense
        totalDepensesMensuelles += montantMensuel;
      }
    });

    const resteAVivre = totalRevenusMensuels - totalDepensesMensuelles;

    // Arrondir le résultat à 2 décimales et convertir en nombre
    return parseFloat(resteAVivre.toFixed(2));
  }

  calculerTotalDepensesMensuelles(mouvements: Mouvement[]): number {
    let totalDepensesMensuelles = 0;

    mouvements.forEach(mouvement => {
      let montantMensuel;
      // Pour un paiement annuel, diviser le montant par 12 pour obtenir l'équivalent mensuel
      if (mouvement.frequence === 1) {
        montantMensuel = mouvement.montant / 12.0;
      } else {
        // Pour les paiements plus fréquents que annuels, ajuster le montant à son équivalent mensuel
        montantMensuel = mouvement.montant * mouvement.frequence / 12.0;
      }

      if (mouvement.type) {
        return
      } else {
        // C'est une dépense
        totalDepensesMensuelles += montantMensuel;
      }
    });

    // Arrondir le résultat à 2 décimales et convertir en nombre
    return parseFloat(totalDepensesMensuelles.toFixed(2));
  }

  calculerTotalRevenusMensuels(mouvements: Mouvement[]) {
    let totalRevenusMensuels = 0;
    mouvements.forEach(mouvement => {
      let montantMensuel;
      // Pour un paiement annuel, diviser le montant par 12 pour obtenir l'équivalent mensuel
      if (mouvement.frequence === 1) {
        montantMensuel = mouvement.montant / 12.0;
      } else {
        // Pour les paiements plus fréquents que annuels, ajuster le montant à son équivalent mensuel
        montantMensuel = mouvement.montant * mouvement.frequence / 12.0;
      }

      if (mouvement.type) {
        // C'est un revenu
        totalRevenusMensuels += montantMensuel;
      } else {
        return;
      }
    });


    // Arrondir le résultat à 2 décimales et convertir en nombre
    return parseFloat(totalRevenusMensuels.toFixed(2));
  }

  handleMouvementsChange(updatedMouvements: Mouvement[]): void {
    this.mouvements = updatedMouvements;
    this.resteAVivre = this.calculerResteAVivre(this.mouvements)
  }

}
