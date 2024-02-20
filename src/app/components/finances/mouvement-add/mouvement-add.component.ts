import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FinancesService} from "../../../services/finances.service";
import {Mouvement} from "../../../models/mouvement.model";

@Component({
  selector: 'app-mouvement-add',
  templateUrl: './mouvement-add.component.html',
  styleUrls: ['./mouvement-add.component.scss']
})
export class MouvementAddComponent {
  mouvementForm: FormGroup;
  frequenceOptions = [
    { label: 'Annuelle', value: 1 },
    { label: 'Semestrielle', value: 2 },
    { label: 'Trimestrielle', value: 4 },
    { label: 'Mensuelle', value: 12 },
    { label: 'Hebdomadaire', value: 52 },
    { label: 'Quotidienne', value: 365 }
  ];
  mouvementWasCreated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private financesService: FinancesService) {
    this.mouvementForm = this.fb.group({
      type: ['', Validators.required],
      nom: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0.01)]],
      frequence: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.mouvementForm.valid) {
      this.financesService.createMouvement(this.mouvementForm.value as Mouvement).subscribe(mouvementCreated => {
        console.log('Le mouvement à bien été créé : ')
        console.log(mouvementCreated)
        this.mouvementWasCreated = true;
      }, () => console.log('Une erreur est survenu lors de la création du mouvement'))
    }
  }
}
