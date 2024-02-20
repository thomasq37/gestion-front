import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Mouvement} from "../../../models/mouvement.model";
import {FinancesService} from "../../../services/finances.service";
import {regimesFiscaux} from "../../../models/regime-fiscal.model";
import {Revenu} from "../../../models/revenu.model";
import {Depense} from "../../../models/depense.model";

@Component({
  selector: 'app-impots-calculateur',
  templateUrl: './impots-calculateur.component.html',
  styleUrls: ['./impots-calculateur.component.scss']
})
export class ImpotsCalculateurComponent {

  impotsCalculateurForm: FormGroup;
  currentStep: number = 1;
  allMouvements: Mouvement[] = [];
  regimesFiscaux = regimesFiscaux;
  objectKeys = Object.keys;
  revenus: Revenu[];
  depenses: Depense[];
  depensesVerification: Depense[];

  constructor(private fb: FormBuilder, private financesService: FinancesService) {}

  ngOnInit(): void {
    this.impotsCalculateurForm = this.fb.group({
      revenus: this.fb.array([]),
      depenses: this.fb.array([]),
      depensesVerification: this.fb.array([])
      // Vous pouvez ajouter ici d'autres FormArray ou FormGroup pour les autres étapes, comme les dépenses
    });
    this.financesService.getAllMouvements().subscribe((mouvements: Mouvement[]) => {
      this.allMouvements = mouvements;
      this.allMouvements.filter(e => e.type === true).forEach(mouvement => this.addRevenu(mouvement));
      this.allMouvements.filter(e => e.type === false).forEach(mouvement => this.addDepense(mouvement));
    });
  }

  onSubmit() {
    if(this.impotsCalculateurForm.valid){
    }
  }

  private calculateRevenusTotalNetApresAbattementEtDeduction(revenus: Revenu[]) {
    let revenusTotalNetApresAbattementEtDeduction = 0;
    let detailsRevenus = [];

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
      } else if (revenu.regimeFiscal === 'reel') {
        // Pour le régime réel, utiliser 'sommeReelle' pour la déduction
        const sommeReelle = revenu.sommeReelle || 0;
        const revenuNetApresDeduction = revenuAnnuelBrut - sommeReelle;
        revenusTotalNetApresAbattementEtDeduction += revenuNetApresDeduction;
      } else {
        // Si aucun cas ne correspond, inclure le revenu brut dans le total et la description
        revenusTotalNetApresAbattementEtDeduction += revenuAnnuelBrut;
      }
      detailsRevenus.push(revenu);

    });

    // Ajouter une ligne de conclusion pour le total net
    detailsRevenus.push({total: `Total net après abattement et déduction: ${revenusTotalNetApresAbattementEtDeduction.toFixed(2)}€.`});

    return {
      revenusTotalNetApresAbattementEtDeduction,
      detailsRevenus
    };
  }

  private calculateChargesDeductibleHorsReel(depenses: Depense[]){
    this.depensesVerification = depenses.filter(e => e.deductible);
    return depenses.filter(e => e.deductible);
  }

  private calculateMontantDeductibleDependingDeductibleType(depensesVerification){
    let sommeDeductible= 0;
    let descriptions = ''
    depensesVerification.forEach((depense, i) => {
      switch (depense.typeDeductible){
        case 'per':
          const dataPer = this.calculateMontantDeductiblePER(depense)
          sommeDeductible += dataPer.montantDeductible
          descriptions += "Dépense " + (i+1) + " (" + depense.nom + ") : " +  dataPer.description + "\n"
        break;
        case 'dons':
          console.log('Don')
        break;
        default:
          console.log('Non renseigné')
      }
    })
    return {
      sommeDeductible: sommeDeductible,
      descriptions: descriptions
    };
  }

  private calculateMontantDeductiblePER(depense){
    const dataPER = {
      "revenuAnnuelActivite": depense.revenuAnnuelPrecedent,
      "contributionPERAnnuelle": depense.montant * depense.frequence,
      "PASS": 41136,
      "typeContribuable": "salarié",
      "plafondDeductionPER": {
        "pourcentageRevenuActivite": 0.10,
        "plafondMaximum": 329088,
        "montantForfaitaireMinimum": 4114
      }
    }
    // Calcul du montant basé sur le pourcentage des revenus d'activité
    let deductionSurRevenu = dataPER.revenuAnnuelActivite * dataPER.plafondDeductionPER.pourcentageRevenuActivite;

    // Vérification et application du montant forfaitaire minimum si nécessaire
    deductionSurRevenu = Math.max(deductionSurRevenu, dataPER.plafondDeductionPER.montantForfaitaireMinimum);
    // Limitation de la déduction au montant des contributions annuelles au PER
    const montantDeductible = Math.min(deductionSurRevenu, dataPER.contributionPERAnnuelle);

    // Retourne le montant déductible pour utilisation ultérieure
    return {
      montantDeductible: montantDeductible,
      description: `Montant déductible pour le PER: ${montantDeductible}€`
    };
  }

  get revenusFormArray(): FormArray {
    return this.impotsCalculateurForm.get('revenus') as FormArray;
  }

  get depensesFormArray(): FormArray {
    return this.impotsCalculateurForm.get('depenses') as FormArray;
  }

  get depensesVerificationFormArray(): FormArray {
    return this.impotsCalculateurForm.get('depensesVerification') as FormArray;
  }

  addRevenu(mouvement: Mouvement): void {
    const mouvementGroup = this.fb.group({
      nom: [mouvement.nom],
      montant: [mouvement.montant],
      frequence: [mouvement.frequence],
      typeRevenu: [],
      regimeFiscal: [],
      sommeReelle: [{value: '', disabled: true}]
    });

    mouvementGroup.get('regimeFiscal').valueChanges.subscribe(value => {
      if (value === 'reel') {
        mouvementGroup.get('sommeReelle').enable();
      } else {
        mouvementGroup.get('sommeReelle').disable();
      }
    });

    this.revenusFormArray.push(mouvementGroup);
  }

  addDepense(mouvement: Mouvement): void {
    const mouvementGroup = this.fb.group({
      nom: [mouvement.nom],
      montant: [mouvement.montant],
      frequence: [mouvement.frequence],
      deductible: [false],
    });
    this.depensesFormArray.push(mouvementGroup);
  }

  addDepenseVerification(depense: Depense): void {
    const depenseGroup = this.fb.group({
      nom: [depense.nom],
      montant: [depense.montant],
      frequence: [depense.frequence],
      deductible: [depense.deductible],
      typeDeductible: [],
      revenuAnnuelPrecedent: [{value: null, disabled: true}] // Commence désactivé et vide
    });
    this.depensesVerificationFormArray.push(depenseGroup);
  }

  nextStep() {
    this.currentStep += 1;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep -= 1;
  }

  navigateToStepTwo() {
    console.log(this.calculateRevenusTotalNetApresAbattementEtDeduction(this.impotsCalculateurForm.value.revenus))
    this.currentStep += 1;

  }

  navigateToStepThree() {
    this.depensesVerification = this.calculateChargesDeductibleHorsReel(this.impotsCalculateurForm.value.depenses)
    this.depensesVerification.forEach(depense => this.addDepenseVerification(depense));
    this.currentStep += 1;
  }

  navigateToValidate() {
    console.log(this.impotsCalculateurForm.value.depensesVerification)
    console.log(this.calculateMontantDeductibleDependingDeductibleType(this.impotsCalculateurForm.value.depensesVerification))
  }

  onTypeDeductibleChange(index: number): void {
    const depenseGroup = this.depensesVerificationFormArray.at(index);
    if (depenseGroup.get('typeDeductible').value === 'per') {
      depenseGroup.get('revenuAnnuelPrecedent').enable();
    } else {
      depenseGroup.get('revenuAnnuelPrecedent').disable();
    }
  }

}
