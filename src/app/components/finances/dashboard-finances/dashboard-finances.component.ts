import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FinancesService} from "../../../services/finances.service";
import {Mouvement} from "../../../models/mouvement.model";
import {Chart, ChartConfiguration, registerables} from 'chart.js';

@Component({
  selector: 'app-dashboard-finances',
  templateUrl: './dashboard-finances.component.html',
  styleUrls: ['./dashboard-finances.component.scss']
})
export class DashboardFinancesComponent implements OnInit{
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  mouvements: Mouvement[] = []
  resteAVivre: number = undefined
  totalDepenses: number = undefined
  totalRevenus: number = undefined
  constructor(private financesService: FinancesService) {
    Chart.register(...registerables);
  }


  ngOnInit(): void {
    this.loadMouvements();
  }

  loadMouvements(): void {
    this.financesService.getAllMouvements().subscribe(mouvements => {
      this.mouvements = mouvements;
      this.totalRevenus = this.calculerTotalRevenusMensuels(this.mouvements);
      this.totalDepenses = this.calculerTotalDepensesMensuelles(this.mouvements);
      this.resteAVivre = this.totalRevenus - this.totalDepenses ;
      let couleurRestant;
      if (this.resteAVivre < 600) {
        couleurRestant = 'rgb(255,0,0)'; // Rouge
      } else if (this.resteAVivre < 900) {
        couleurRestant = '#ffbb3e'; // Orange
      } else if (this.resteAVivre < 1100) {
        couleurRestant = 'rgb(96,214,9)'; // Vert
      } else {
        couleurRestant = 'rgb(0,0,255)'; // Bleu pour les valeurs au-delà de 1100
      }

      const chartConfiguration: ChartConfiguration<'doughnut', number[]> = {
        type: 'doughnut',
        data: {
          labels: ['Dépenses fixes', 'Montant restant'],
          datasets: [{
            label: 'Somme',
            data: [Math.round(this.totalDepenses * 100) / 100, Math.round(this.resteAVivre * 100) / 100],
            backgroundColor: ['rgb(217,217,217)', couleurRestant],
            borderColor: ['rgb(217,217,217)', couleurRestant],
          }],
        },
        options: {

          responsive: true,
          rotation: 270, // Démarre à partir du haut
          circumference: 180, // Demi-cercle
          cutout: 85, // Ajustez selon votre version de Chart.js
          plugins: {
            legend: {
              display: true,
              labels: {
                generateLabels: function() {
                  return [
                    {text: 'Dépenses', fillStyle: '#c3c3c3'},
                    {text: 'Restant: < 600€', fillStyle: 'rgb(255,0,0)'},
                    {text: 'Restant: < 900€', fillStyle: '#ffbb3e'},
                    {text: 'Restant: < 1100€', fillStyle: 'rgb(96,214,9)'},
                  ];
                }
              },
              position: 'bottom'
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += `${context.parsed}€`;
                  }
                  return label;
                }
              }
            }
          }
        },
        plugins: [
          {
            id: 'customTitlePlugin',
            afterDraw: function(chart, args, options) {
              const {ctx, chartArea: {bottom}, width} = chart;
              const titleText = 'Total du revenu restant après déduction des charges par mois'; // Le titre que vous voulez afficher
              ctx.save();
              ctx.font = 'bold 13px Arial'; // Adaptez selon vos besoins
              ctx.textAlign = 'center';
              ctx.fillStyle = 'black'; // Adaptez selon vos besoins

              // Calculez la position du titre. Vous pouvez ajuster `bottom - 30` selon vos besoins pour positionner le titre correctement au-dessus des légendes
              const titlePositionY = bottom - 10; // Ajustez cette valeur pour positionner le titre

              ctx.fillText(titleText, width / 2, titlePositionY);
              ctx.restore();
            }
          }
        ]
      };

      // Création du graphique
      const chart = new Chart(this.myChart.nativeElement.getContext('2d'), chartConfiguration);

      // Forcer l'affichage du tooltip par défaut
      chart.update();
      chart.tooltip.setActiveElements([{datasetIndex: 0, index: 1}], {x: 0, y: 0});
      chart.update();
    });
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
    this.resteAVivre = this.totalRevenus - this.totalDepenses
  }

}
