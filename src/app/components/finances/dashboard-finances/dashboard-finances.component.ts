import {Component, OnInit} from '@angular/core';
import {FinancesService, Mouvement} from "../../../services/finances.service";

@Component({
  selector: 'app-dashboard-finances',
  templateUrl: './dashboard-finances.component.html',
  styleUrls: ['./dashboard-finances.component.scss']
})
export class DashboardFinancesComponent implements OnInit{
  mouvements: Mouvement[] = []
  resteAVivre: number = -1

  constructor(private financesService: FinancesService) { }

  ngOnInit(): void {
    this.loadMouvements();
  }


  loadMouvements(): void {
    this.financesService.getAllMouvements().subscribe(mouvements => {
      this.mouvements = mouvements;
      this.resteAVivre = this.calculerResteAVivre(this.mouvements)
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
    // Vous pouvez également recalculer le reste à vivre ou d'autres valeurs dépendantes ici
  }

}
