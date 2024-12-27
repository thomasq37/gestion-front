import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FraisDTO} from "../../../../models/v2/entites/Frais/FraisDTO.model";
import {FraisService} from "../../../../services/v2/frais/frais.service";
import {Frequence} from "../../../../models/v2/enumeration/Frequence.enum";
import {CategorieFrais} from "../../../../models/v2/enumeration/CategorieFrais.enum";

@Component({
  selector: 'app-frais-modifier',
  templateUrl: './frais-modifier.component.html',
  styleUrls: ['./frais-modifier.component.scss']
})
export class FraisModifierComponent {
  fraisForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  periodeMasqueId: string | null = null;
  fraisMasqueId: string | null = null;
  loading = false;
  frequences = Object.values(Frequence);
  categoriesFrais = Object.values(CategorieFrais);

  constructor(
    private formBuilder: FormBuilder,
    private fraisService: FraisService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.fraisForm = this.formBuilder.group({
      nom: [''],
      montant: ['', [Validators.required, Validators.pattern(/^\d+([.,]\d+)?$/)]],
      dateDeDebut: ['', Validators.required],
      dateDeFin: [''],
      frequence: ['', Validators.required],
      categorieFrais: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.periodeMasqueId = queryParams.get('periodeMasqueId');
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      this.fraisMasqueId = params.get('fraisMasqueId');
      if (this.logementMasqueId && this.fraisMasqueId) {
        this.obtenirFrais();
      }
    });
  }
  private async obtenirFrais(): Promise<void> {
    try {
      let frais: FraisDTO;
      if (this.periodeMasqueId) {
        frais = await this.fraisService.obtenirFraisPourPeriodeDeLocation(
          this.logementMasqueId!,
          this.periodeMasqueId,
          this.fraisMasqueId!
        );
      } else {
        frais = await this.fraisService.obtenirFraisPourLogement(this.logementMasqueId!, this.fraisMasqueId!);
      }
      this.fraisForm.patchValue(frais);
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Impossible de charger le frais.';
    } finally {
      this.loading = false;
    }
  }
  async modifierFrais(): Promise<void> {
    this.loading = true;
    const frais: FraisDTO = this.fraisForm.value as FraisDTO;

    try {
      if (this.periodeMasqueId) {
        await this.fraisService.modifierFraisPourPeriodeDeLocation(
          this.logementMasqueId!,
          this.periodeMasqueId,
          this.fraisMasqueId!,
          frais
        );
      } else {
        await this.fraisService.modifierFraisPourLogement(this.logementMasqueId!, this.fraisMasqueId!, frais);
      }

      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 3 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Une erreur inconnue est survenue.';
    } finally {
      this.loading = false;
    }
  }

  supprimerFrais() {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer le frais ?');
    if (!confirmed) return;

    if (this.periodeMasqueId) {
      this.fraisService
        .supprimerFraisPourPeriodeDeLocation(
          this.logementMasqueId!,
          this.periodeMasqueId,
          this.fraisMasqueId!
        )
        .then(() => {
          this.router.navigate([`/logements/${this.logementMasqueId}`], { queryParams: { tab: 3 } });
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du frais :', error);
        });
    } else {
      this.fraisService
        .supprimerFraisPourLogement(this.logementMasqueId!, this.fraisMasqueId!)
        .then(() => {
          this.router.navigate([`/logements/${this.logementMasqueId}`], { queryParams: { tab: 3 } });
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du frais :', error);
        });
    }
  }
}
