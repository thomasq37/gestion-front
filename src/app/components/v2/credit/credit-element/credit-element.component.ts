import {Component, Input} from '@angular/core';
import {CreditDTO} from "../../../../models/v2/entites/Credit/CreditDTO.model";
import {Router} from "@angular/router";
import {Frequence} from "../../../../models/v2/enumeration/Frequence.enum";
import {FraisDTO} from "../../../../models/v2/entites/Frais/FraisDTO.model";

@Component({
  selector: 'app-credit-element',
  templateUrl: './credit-element.component.html',
  styleUrls: ['./credit-element.component.scss']
})
export class CreditElementComponent {
  @Input() credit!: CreditDTO;
  @Input() logementMasqueId!: string;
  constructor(private router: Router) {}
  modifierOuCreerCredit(credit: CreditDTO, logementMasqueId: string) {
    if(credit === null || credit === undefined) {
      this.router.navigate([`/logements/${logementMasqueId}/credit/creer`]);
    }
    else{
      this.router.navigate([`/logements/${logementMasqueId}/credit/modifier`]);
    }
  }

  getMensualiteAvecFraisAssocie(): number {
    if (!this.credit) {
      return 0;
    }

    // Mensualité de base du crédit
    let mensualiteTotal = this.credit.mensualite || 0;

    // Ajouter les frais convertis en mensuel
    if (this.credit.frais && this.credit.frais.length > 0) {
      const fraisMensuels = this.credit.frais.reduce((total, frais) => {
        return total + this.convertirFraisEnMensuel(frais);
      }, 0);

      mensualiteTotal += fraisMensuels;
    }

    return Math.round(mensualiteTotal * 100) / 100; // Arrondir à 2 décimales
  }

  private convertirFraisEnMensuel(frais: FraisDTO): number {
    if (!frais || !frais.montant) {
      return 0;
    }

    // Vérifier si le frais est encore actif (pas de date de fin ou date de fin dans le futur)
    if (frais.dateDeFin) {
      const dateFin = new Date(frais.dateDeFin);
      const aujourdhui = new Date();
      if (dateFin < aujourdhui) {
        return 0; // Frais expiré
      }
    }

    switch (frais.frequence) {
      case Frequence.MENSUELLE:
        return frais.montant;

      case Frequence.HEBDOMADAIRE:
        // 1 mois ≈ 4.33 semaines (52 semaines / 12 mois)
        return frais.montant * 4.33;

      case Frequence.BIMESTRIELLE:
        // Tous les 2 mois
        return frais.montant / 2;

      case Frequence.TRIMESTRIELLE:
        // Tous les 3 mois
        return frais.montant / 3;

      case Frequence.SEMESTRIELLE:
        // Tous les 6 mois
        return frais.montant / 6;

      case Frequence.ANNUELLE:
        // Tous les 12 mois
        return frais.montant / 12;

      case Frequence.PONCTUELLE:
        // Ignorer les frais ponctuels
        return 0;

      default:
        return 0;
    }
  }
}
