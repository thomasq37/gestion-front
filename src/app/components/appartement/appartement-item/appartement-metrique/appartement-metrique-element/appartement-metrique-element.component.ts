import {Component, Input} from '@angular/core';
import {Appartement} from "../../../../../models/gestion";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-appartement-metrique-element',
  templateUrl: './appartement-metrique-element.component.html',
  styleUrls: ['./appartement-metrique-element.component.scss'],
  providers: [DecimalPipe]
})
export class AppartementMetriqueElementComponent {
  @Input() appartement: Appartement | null = null;
  formulas = {
    'moyenne_benefice': '(revenus depuis achat - depenses depuis achat) lissés par mois',
    'revenus_nets': '(revenus depuis achat)',
    'depenses_nettes': '(depenses depuis achat)',
    'rentabilite_nette': '(revenus - depenses) depuis achat',
    'taux_vacance_locative': '(jours vacants ÷ jours total) x 100',
    'total_frais_gestion': 'total frais de type frais de gestion',
    'total_honoraires_de_loc': 'total frais de type honoraires de remise en location',
    'total_travaux': 'total frais de type travaux',
    'total_charges_fixes_hors_frais': 'total charges fixes hors frais de gestion'

  };

  showInfo(type: string) {
    let formula: string;
    switch (type) {
      case 'moyenne_benefice':
        formula = 'Moyenne bénéfices : (revenus depuis achat - depenses depuis achat) lissés par mois';
        break;
      case 'revenus_nets':
        formula = 'Revenus depuis achat';
        break;
      case 'depenses_nettes':
        formula = 'Dépenses depuis achat';
        break;
      case 'rentabilite_nette':
        formula = `
        Prix d'achat ${this.appartement.prix}€\n
        Bénéfices :  ${this.appartement.rentabiliteNette}€ \n
        Différence : ${this.appartement.rentabiliteNette - this.appartement.prix}€`
        break;
      case 'total_frais_gestion':
        formula = `total_frais_gestion`
        break;
      case 'total_honoraires_de_loc':
        formula = `total_honoraires_de_loc`
        break;
      case 'total_travaux':
        formula = `total_travaux`
        break;
      case 'total_charges_fixes_hors_frais':
        formula = `total_charges_fixes_hors_frais`
        break;
      case 'taux_vacance_locative':
        formula = 'Taux de vacance locative : (jours vacants ÷ jours total) x 100';
        break;
      default:
        formula = 'Formule non trouvée';
    }
    alert(formula);
  }

}
