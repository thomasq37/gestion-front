import {Component, Input, OnInit} from '@angular/core';
import {FormArray} from "@angular/forms";
import {regimesFiscaux} from "../../../../models/regime-fiscal.model";
import {Revenu} from "../../../../models/revenu.model";

@Component({
  selector: 'app-revenus',
  templateUrl: './revenus.component.html',
  styleUrls: ['./revenus.component.scss']
})
export class RevenusComponent implements OnInit {
  @Input() revenusFormArray: FormArray;
  regimesFiscaux = regimesFiscaux;
  objectKeys = Object.keys;

  constructor(
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.revenusFormArray.valid) {
      // Assurez-vous d'accéder correctement au FormArray de mouvements dans votre formulaire
      const revenusFormArray = this.revenusFormArray.get('mouvements') as FormArray;
      // Utilisez la propriété 'value' du FormArray pour obtenir un tableau des valeurs de revenus
      const revenus: Revenu[] = revenusFormArray.value;
      console.log(this.getRevenusTotalNetApresAbattementEtDeduction(revenus));
    }
  }

  private getRevenusTotalNetApresAbattementEtDeduction(revenus: Revenu[]) {
    let revenusTotalNetApresAbattementEtDeduction = 0;
    let descriptionPourCompteRendu = '';

    revenus.forEach((revenu, index) => {
      // Calcul du revenu annuel brut en multipliant le montant par la fréquence
      const revenuAnnuelBrut = revenu.montant * revenu.frequence;

      // Récupérer l'objet de régime fiscal correspondant à partir de regimesFiscaux
      const regime = this.regimesFiscaux[revenu.regimeFiscal];

      // Vérifier si le régime fiscal a une propriété 'abattement'
      if (regime && regime.abattement) {
        // Appliquer l'abattement
        const revenuNetApresAbattement = revenuAnnuelBrut * (1 - regime.abattement / 100);
        revenusTotalNetApresAbattementEtDeduction += revenuNetApresAbattement;
        descriptionPourCompteRendu += `Revenu ${index + 1} (${revenu.nom}): Revenu brut (${revenuAnnuelBrut.toFixed(2)}€) - Revenu net annuel après abattement de ${regime.abattement}% est de ${revenuNetApresAbattement.toFixed(2)}€.\n`;
      } else if (revenu.regimeFiscal === 'reel') {
        // Pour le régime réel, utiliser 'sommeReelle' pour la déduction
        const sommeReelle = revenu.sommeReelle || 0;
        const revenuNetApresDeduction = revenuAnnuelBrut - sommeReelle;
        revenusTotalNetApresAbattementEtDeduction += revenuNetApresDeduction;
        descriptionPourCompteRendu += `Revenu ${index + 1} (${revenu.nom}): Revenu brut (${revenuAnnuelBrut.toFixed(2)}€) - Revenu net annuel après déduction est de ${revenuNetApresDeduction.toFixed(2)}€.\n`;
      } else {
        // Si aucun cas ne correspond, inclure le revenu brut dans le total et la description
        revenusTotalNetApresAbattementEtDeduction += revenuAnnuelBrut;
        descriptionPourCompteRendu += `Revenu ${index + 1} (${revenu.nom}): Revenu brut annuel est de ${revenuAnnuelBrut.toFixed(2)}€ sans abattement spécifique.\n`;
      }
    });

    // Ajouter une ligne de conclusion pour le total net
    descriptionPourCompteRendu += `Total net après abattement et déduction: ${revenusTotalNetApresAbattementEtDeduction.toFixed(2)}€.`;

    return {
      revenusTotalNetApresAbattementEtDeduction,
      descriptionPourCompteRendu
    };
  }
}
