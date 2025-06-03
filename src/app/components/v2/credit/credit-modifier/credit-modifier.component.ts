import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {CreditService} from "../../../../services/v2/credit/credit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CreditDTO} from "../../../../models/v2/entites/Credit/CreditDTO.model";
import {TypeDeTaux} from "../../../../models/v2/enumeration/TypeDeTaux.enum";

@Component({
  selector: 'app-credit-modifier',
  templateUrl: './credit-modifier.component.html',
  styleUrls: ['./credit-modifier.component.scss']
})
export class CreditModifierComponent {
  creditForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  typesDeTaux = Object.values(TypeDeTaux);
  loading = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer le crédit pour ce logement ?"
  isModalVisible = false;
  constructor(
    private formBuilder: FormBuilder,
    private creditService: CreditService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.creditForm = this.formBuilder.group({
      montantEmprunte: ['', Validators.required],
      tauxAnnuelEffectifGlobal: ['', Validators.required],
      dureeMois: ['', Validators.required],
      typeDeTaux: ['', Validators.required],
      jourDePaiementEcheance: ['', Validators.required],
      dateDebut: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      if (this.logementMasqueId) {
        this.obtenirCreditPourLogement(this.logementMasqueId);
      }
    });
  }

  private async obtenirCreditPourLogement(logementMasqueId: string): Promise<void> {
    try {
      const credit = await this.creditService.obtenirCreditPourLogement(logementMasqueId);
      this.creditForm.patchValue(credit);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger les credit.');
    } finally {
      this.loading = false;
    }
  }

  async modifierCreditPourLogement(): Promise<void> {
    this.loading = true
    const credit: CreditDTO = this.creditForm.value as CreditDTO;
    try {
      await this.creditService.modifierEtMettreAJourCache(this.logementMasqueId!, credit);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 9 },
      });

    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }
  async supprimerCreditPourLogement(): Promise<void> {
    try {
      await this.creditService.supprimerEtMettreAJourCache(this.logementMasqueId!);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 9 },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression des caractéristiques:', error);
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
    this.supprimerCreditPourLogement()
  }
}
