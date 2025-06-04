import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FraisService} from "../../../../services/v2/frais/frais.service";
import {FraisDTO} from "../../../../models/v2/entites/Frais/FraisDTO.model";
import {Frequence} from "../../../../models/v2/enumeration/Frequence.enum";
import {CategorieFrais} from "../../../../models/v2/enumeration/CategorieFrais.enum";

@Component({
  selector: 'app-frais-creer',
  templateUrl: './frais-creer.component.html',
  styleUrls: ['./frais-creer.component.scss']
})
export class FraisCreerComponent {
  fraisForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  periodeMasqueId: string | null = null;
  creditMasqueId: string | null = null;
  loading = false;
  frequences = Object.values(Frequence);
  isPonctuelle: boolean = false;
  categoriesFrais = Object.keys(CategorieFrais).map((key) => ({
    key,
    label: CategorieFrais[key as keyof typeof CategorieFrais],
  }));
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
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.periodeMasqueId = queryParams.get('periodeMasqueId');
    });
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.creditMasqueId = queryParams.get('creditMasqueId');
    });
    this.fraisForm.get('frequence')?.valueChanges.subscribe((value) => {
      this.isPonctuelle = value === Frequence.PONCTUELLE;
    });
  }

  async creerFraisPourLogement(): Promise<void> {

    this.loading = true
    const frais: FraisDTO = this.fraisForm.value as FraisDTO;
    try {
      await this.fraisService.creerEtMettreAJourCache(
        this.logementMasqueId!,
        frais,
        this.periodeMasqueId ?? undefined,
        this.creditMasqueId ?? undefined
      );

      let tab = 3;
      const queryParams: any = {};

      if (this.creditMasqueId) {
        tab = 9;
        queryParams.creditMasqueId = this.creditMasqueId;
      } else if (this.periodeMasqueId) {
        tab = 4;
        queryParams.periodeMasqueId = this.periodeMasqueId;
      }

      queryParams.tab = tab;

      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams
      });
    }catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }
}
