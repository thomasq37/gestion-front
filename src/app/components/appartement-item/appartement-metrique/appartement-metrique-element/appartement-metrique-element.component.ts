import {Component, Input} from '@angular/core';
import {Appartement} from "../../../../models/gestion";

@Component({
  selector: 'app-appartement-metrique-element',
  templateUrl: './appartement-metrique-element.component.html',
  styleUrls: ['./appartement-metrique-element.component.scss']
})
export class AppartementMetriqueElementComponent {
  @Input() appartement: Appartement | null = null;
  formulas = {
    'moyenne_benefice': '(renvenus annuels - dépenses annuels) ÷ 12',
    'rentabilite_nette': '((renvenus annuels - dépenses annuels) ÷ prix) x 100',
    'taux_vacance_locative': '(jours vacants ÷ jours total) x 100'
  };

  showInfo(type: string) {
    let formula: string;
    switch (type) {
      case 'moyenne_benefice':
        formula = 'Moyenne bénéfices : (renvenus annuels - dépenses annuels) ÷ 12';
        break;
      case 'rentabilite_nette':
        formula = `Bénéfices :  ${this.appartement.rentabiliteNette}€ \nDifférence : ${this.appartement.rentabiliteNette - this.appartement.prix}€ (prix d'achat (${this.appartement.prix}€) - ${this.appartement.rentabiliteNette}€)`;
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
