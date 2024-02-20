import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {FinancesService} from "../../../services/finances.service";
import {Mouvement} from "../../../models/mouvement.model";

@Component({
  selector: 'app-impot-calculator',
  templateUrl: './impot-calculator.component.html',
  styleUrls: ['./impot-calculator.component.scss']
})
export class ImpotCalculatorComponent implements OnInit {
  form: FormGroup;
  currentStep: number = 1;
  allMouvements: Mouvement[] = [];
  constructor(private fb: FormBuilder, private financesService: FinancesService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      revenus: this.fb.array([]),
      depenses: this.fb.array([]),
      // Vous pouvez ajouter ici d'autres FormArray ou FormGroup pour les autres étapes, comme les dépenses
    });
    this.financesService.getAllMouvements().subscribe((mouvements: Mouvement[]) => {
      this.allMouvements = mouvements;
      this.initRevenus();
      this.initDepenses();
    });

  }
  initRevenus() {
    const revenus = this.allMouvements.filter(m => m.type === true);
    revenus.forEach(mouvement => this.addRevenu(mouvement));
  }

  addRevenu(mouvement: Mouvement): void {
    const mouvementGroup = this.fb.group({
      nom: [mouvement.nom],
      montant: [mouvement.montant],
      frequence: [mouvement.frequence],
      typeRevenu: ['locatifsMeubles'],
      regimeFiscal: ['microBIC'],
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

  initDepenses() {
    const depenses = this.allMouvements.filter(m => m.type === false);
    depenses.forEach(mouvement => this.addDepense(mouvement));
  }

  addDepense(mouvement: Mouvement): void {
    const mouvementGroup = this.fb.group({
      nom: [mouvement.nom],
      montant: [mouvement.montant],
      frequence: [mouvement.frequence],
      /*typeRevenu: ['locatifsMeubles'],
      regimeFiscal: ['microBIC'],
      sommeReelle: [{value: '', disabled: true}]*/
    });

    /*mouvementGroup.get('regimeFiscal').valueChanges.subscribe(value => {
      if (value === 'reel') {
        mouvementGroup.get('sommeReelle').enable();
      } else {
        mouvementGroup.get('sommeReelle').disable();
      }
    });*/

    this.depensesFormArray.push(mouvementGroup);
  }

  get revenusFormArray(): FormArray {
    return this.form.get('revenus') as FormArray;
  }
  get depensesFormArray(): FormArray {
    return this.form.get('depenses') as FormArray;
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value)
    }
  }
  // Méthode pour passer à l'étape suivante
  nextStep() {
    this.currentStep += 1;
  }

  // Méthode pour revenir à l'étape précédente
  previousStep() {
    if (this.currentStep > 1) this.currentStep -= 1;
  }

}


