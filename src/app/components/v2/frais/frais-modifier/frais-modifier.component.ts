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
  creditMasqueId: string | null = null;

  loading = false;
  frequences = Object.values(Frequence);
  categoriesFrais = Object.keys(CategorieFrais).map((key) => ({
    key,
    label: CategorieFrais[key as keyof typeof CategorieFrais],
  }));
  isPonctuelle: boolean = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer le frais ?"
  isModalVisible = false;

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
    this.fraisForm.get('frequence')?.valueChanges.subscribe((value) => {
      this.isPonctuelle = value === Frequence.PONCTUELLE;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.periodeMasqueId = queryParams.get('periodeMasqueId');
    });
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.creditMasqueId = queryParams.get('creditMasqueId');
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
      }
      else if (this.creditMasqueId) {
        frais = await this.fraisService.obtenirFraisPourCredit(
          this.logementMasqueId!,
          this.creditMasqueId,
          this.fraisMasqueId!
        );
      }
      else {
        frais = await this.fraisService.obtenirFraisPourLogement(this.logementMasqueId!, this.fraisMasqueId!);
      }
      this.fraisForm.patchValue(frais);
      this.isPonctuelle = frais.frequence === Frequence.PONCTUELLE;
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
      await this.fraisService.modifierEtMettreAJourCache(
        this.logementMasqueId!,
        this.fraisMasqueId!,
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
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Une erreur inconnue est survenue.';
    } finally {
      this.loading = false;
    }
  }

  supprimerFrais() {
    this.fraisService
      .supprimerEtMettreAJourCache(this.logementMasqueId!, this.fraisMasqueId!, this.periodeMasqueId ?? undefined)
      .then(() => {
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

        this.router.navigate([`/logements/${this.logementMasqueId}`], {
          queryParams
        });
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du frais :', error);
      });
  }
  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  confirmDelete(): void {
    this.isModalVisible = false;
    this.supprimerFrais()
  }
}
