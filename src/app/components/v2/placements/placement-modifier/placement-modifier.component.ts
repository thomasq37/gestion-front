import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PlacementService } from "../../../../services/v2/placement/placement.service";
import { PlacementVueEnsembleDTO } from "../../../../models/v2/entites/Placement/PlacementVueEnsembleDTO.model";

@Component({
  selector: 'app-placement-modifier',
  templateUrl: './placement-modifier.component.html',
  styleUrls: ['./placement-modifier.component.scss']
})
export class PlacementModifierComponent implements OnInit {
  placementForm: FormGroup;
  placementMasqueId: string | null = null;
  loading = false;
  error: string | null = null;
  isModalVisible = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer le placement ?";

  constructor(
    private formBuilder: FormBuilder,
    private placementService: PlacementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.placementForm = this.formBuilder.group({
      nom: ['', Validators.required],
      capital: ['', [Validators.required, Validators.pattern(/^\d+([.,]\d+)?$/)]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.placementMasqueId = params.get('placementMasqueId');
      if (this.placementMasqueId) {
        this.chargerPlacement();
      }
    });
  }

  private async chargerPlacement(): Promise<void> {
    this.loading = true;
    try {
      const placement = await this.placementService.obtenirPlacement(this.placementMasqueId!);
      this.placementForm.patchValue(placement);
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Impossible de charger le placement.';
    } finally {
      this.loading = false;
    }
  }

  async modifierPlacement(): Promise<void> {
    this.loading = true;
    const dto: PlacementVueEnsembleDTO = this.placementForm.value;
    try {
      await this.placementService.modifierEtMettreAJourCache(this.placementMasqueId!, dto);
      await this.router.navigate(['/placements']);
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Une erreur est survenue.';
    } finally {
      this.loading = false;
    }
  }

  async supprimerPlacement(): Promise<void> {
    try {
      await this.placementService.supprimerEtMettreAJourCache(this.placementMasqueId!);
      await this.router.navigate(['/placements']);
    } catch (error: any) {
      console.error('Erreur lors de la suppression du placement :', error);
    }
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  confirmDelete(): void {
    this.isModalVisible = false;
    this.supprimerPlacement();
  }
}
