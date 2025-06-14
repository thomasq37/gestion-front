import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TotalCompteService } from "../../../../services/v2/total-compte/total-compte.service";

@Component({
  selector: 'app-total-compte-modifier',
  templateUrl: './total-compte-modifier.component.html',
  styleUrls: ['./total-compte-modifier.component.scss']
})
export class TotalCompteModifierComponent implements OnInit {
  form: FormGroup;
  masqueId: string | null = null;
  loading = false;
  error: string | null = null;
  isModalVisible = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer cet enregistrement ?";

  constructor(
    private fb: FormBuilder,
    private totalCompteService: TotalCompteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      montant: ['', [Validators.required, Validators.pattern(/^\d+([.,]\d+)?$/)]],
      dateEnregistrement: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.masqueId = params.get('masqueId');
      if (this.masqueId) {
        this.chargerEnregistrement();
      }
    });
  }

  private async chargerEnregistrement(): Promise<void> {
    this.loading = true;
    try {
      const total = await this.totalCompteService.obtenirTotalCompte(this.masqueId!);
      this.form.patchValue(total);
    } catch (e: any) {
      this.error = e?.message || "Erreur lors du chargement.";
    } finally {
      this.loading = false;
    }
  }

  async modifier(): Promise<void> {
    if (!this.masqueId || !this.form.valid) return;
    this.loading = true;
    try {
      await this.totalCompteService.modifierEtMettreAJourCache(this.masqueId, this.form.value);
      await this.router.navigate(['/placements']);
    } catch (e: any) {
      this.error = e?.message || "Erreur lors de la modification.";
    } finally {
      this.loading = false;
    }
  }

  async supprimer(): Promise<void> {
    try {
      await this.totalCompteService.supprimerEtMettreAJourCache(this.masqueId!);
      await this.router.navigate(['/placements']);
    } catch (e: any) {
      console.error('Erreur suppression :', e);
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
    this.supprimer();
  }
}
