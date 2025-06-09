import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PlacementService } from "../../../../services/v2/placement/placement.service";
import { PlacementVueEnsembleDTO } from "../../../../models/v2/entites/Placement/PlacementVueEnsembleDTO.model";

@Component({
  selector: 'app-placement-creer',
  templateUrl: './placement-creer.component.html',
  styleUrls: ['./placement-creer.component.scss']
})
export class PlacementCreerComponent {
  placementForm: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private placementService: PlacementService,
    private router: Router
  ) {
    this.placementForm = this.formBuilder.group({
      nom: ['', Validators.required],
      capital: ['', [Validators.required, Validators.pattern(/^\d+([.,]\d+)?$/)]],
    });
  }

  async creerPlacement(): Promise<void> {
    this.loading = true;
    const dto: PlacementVueEnsembleDTO = this.placementForm.value;

    try {
      await this.placementService.creerEtMettreAJourCache(dto);
      await this.router.navigate(['/placements']);
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Une erreur inconnue est survenue.';
    } finally {
      this.loading = false;
    }
  }
}
