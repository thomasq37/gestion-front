import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AdresseService} from "../../../../services/v2/adresse/adresse.service";
import {AdresseDTO} from "../../../../models/v2/entites/Adresse/AdresseDTO.model";
import {Pays} from "../../../../models/v2/enumeration/Pays.enum";

@Component({
  selector: 'app-adresse-creer',
  templateUrl: './adresse-creer.component.html',
  styleUrls: ['./adresse-creer.component.scss']
})
export class AdresseCreerComponent {
  adresseForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  paysList = Object.values(Pays);
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private adresseService: AdresseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.adresseForm = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      voie: ['', [Validators.required]],
      complementAdresse: [''],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      ville: ['', [Validators.required]],
      pays: ['', [Validators.required]]
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerAdressePourLogement(): Promise<void> {
    this.loading = true
    const adresse: AdresseDTO = this.adresseForm.value as AdresseDTO;
    try {
      await this.adresseService.creerAdressePourLogement(this.logementMasqueId, adresse);
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
