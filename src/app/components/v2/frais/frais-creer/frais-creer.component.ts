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
      montant: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      dateDeDebut: ['', Validators.required],
      dateDeFin: [''],
      frequence: ['', Validators.required],
      categorieFrais: ['', Validators.required],
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerFraisPourLogement(): Promise<void> {

    this.loading = true
    const frais: FraisDTO = this.fraisForm.value as FraisDTO;
    try {
      await this.fraisService.creerFraisPourLogement(this.logementMasqueId, frais);
      await this.router.navigate([`/logements/${this.logementMasqueId}`]);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }
}
