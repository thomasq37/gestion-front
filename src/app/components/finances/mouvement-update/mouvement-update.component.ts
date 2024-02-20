import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {FinancesService} from "../../../services/finances.service";
import {Mouvement} from "../../../models/mouvement.model";


@Component({
  selector: 'app-mouvement-update',
  templateUrl: './mouvement-update.component.html',
  styleUrls: ['./mouvement-update.component.scss']
})
export class MouvementUpdateComponent implements OnInit {
  mouvementForm: FormGroup;
  frequenceOptions = [
    { label: 'Annuelle', value: 1 },
    { label: 'Semestrielle', value: 2 },
    { label: 'Trimestrielle', value: 4 },
    { label: 'Mensuelle', value: 12 },
    { label: 'Hebdomadaire', value: 52 },
    { label: 'Quotidienne', value: 365 }
  ];
  id: number;
  mouvementWasUpdated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private financesService: FinancesService,
    private route: ActivatedRoute
  ) {
    this.mouvementForm = this.fb.group({
      type: ['', Validators.required],
      nom: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0.01)]],
      frequence: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Obtenez l'ID depuis l'URL
    this.loadMouvement(this.id);
  }

  loadMouvement(id: number): void {
    this.financesService.getMouvementById(id).subscribe((mouvement: Mouvement) => {
      this.mouvementForm.patchValue(mouvement);
    });
  }

  onSubmit(): void {
    if (this.mouvementForm.valid) {
      console.log('Updating mouvement', this.mouvementForm.value);
      // Appeler le service pour mettre à jour le mouvement
      this.financesService.updateMouvement(this.id, this.mouvementForm.value).subscribe(() => {
        console.log('Mouvement updated successfully');
        this.mouvementWasUpdated = true;
        // Redirection ou actions après la mise à jour
      });
    }
  }
}
