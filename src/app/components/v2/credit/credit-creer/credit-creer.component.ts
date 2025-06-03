import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeDeTaux} from "../../../../models/v2/enumeration/TypeDeTaux.enum";
import {CreditService} from "../../../../services/v2/credit/credit.service";
import {CreditDTO} from "../../../../models/v2/entites/Credit/CreditDTO.model";

@Component({
  selector: 'app-credit-creer',
  templateUrl: './credit-creer.component.html',
  styleUrls: ['./credit-creer.component.scss']
})
export class CreditCreerComponent {
  creditForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  typesDeTaux = Object.values(TypeDeTaux);
  loading = false;

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
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerCreditPourLogement(): Promise<void> {
    this.loading = true
    const credit: CreditDTO = this.creditForm.value as CreditDTO;
    try {
      await this.creditService.creerEtMettreAJourCache(this.logementMasqueId!, credit);
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
}
