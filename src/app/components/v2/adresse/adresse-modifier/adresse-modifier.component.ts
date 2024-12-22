import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Pays } from "../../../../models/v2/enumeration/Pays.enum";
import { AdresseService } from "../../../../services/v2/adresse/adresse.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AdresseDTO } from "../../../../models/v2/entites/Adresse/AdresseDTO.model";

@Component({
  selector: 'app-adresse-modifier',
  templateUrl: './adresse-modifier.component.html',
  styleUrls: ['./adresse-modifier.component.scss']
})
export class AdresseModifierComponent implements OnInit {
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
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      if (this.logementMasqueId) {
        this.obtenirAdressePourLogement(this.logementMasqueId);
      }
    });
  }

  private async obtenirAdressePourLogement(logementMasqueId: string): Promise<void> {
    try {
      const adresse = await this.adresseService.obtenirAdressePourLogement(logementMasqueId);
      this.adresseForm.patchValue(adresse);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger l’adresse.');
    }
    finally {
      this.loading = false;
    }
  }

  async modifierAdressePourLogement(): Promise<void> {
    this.loading = true;
    const adresse: AdresseDTO = this.adresseForm.value as AdresseDTO;
    try {
      await this.adresseService.modifierAdressePourLogement(this.logementMasqueId, adresse);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 0 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }

  supprimerAdressePourLogement(logementMasqueId: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer l\'adresse pour ce logement ?');
    if (confirmed) {
      this.adresseService.supprimerAdressePourLogement(logementMasqueId).then(() => {
        this.router.navigate([`/logements/${this.logementMasqueId}`]);
      }).catch(error => {
        console.error('Erreur lors de la suppression de l\'adresse:', error);
      });
    } else {
      console.log('Suppression annulée');
    }
  }
}
