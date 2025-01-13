import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PeriodeDeLocationService} from "../../../../services/v2/periode-de-location/periode-de-location.service";
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {TypeDeLocation} from "../../../../models/v2/enumeration/TypeDeLocation.enum";

@Component({
  selector: 'app-periode-location-modifier',
  templateUrl: './periode-location-modifier.component.html',
  styleUrls: ['./periode-location-modifier.component.scss']
})
export class PeriodeLocationModifierComponent {
  periodeDeLocationForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  periodeDeLocationMasqueId: string | null = null;
  loading = false;
  typesDeLocation = Object.values(TypeDeLocation);
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer la période de location pour ce logement ?"
  isModalVisible = false;
  constructor(
    private formBuilder: FormBuilder,
    private periodeDeLocationService: PeriodeDeLocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.periodeDeLocationForm = this.formBuilder.group({
      tarif: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      dateDeDebut: ['', Validators.required],
      dateDeFin: [''],
      typeDeLocation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      this.periodeDeLocationMasqueId = params.get('periodeDeLocationMasqueId');
      if (this.logementMasqueId) {
        this.obtenirPeriodeDeLocationPourLogement(this.logementMasqueId, this.periodeDeLocationMasqueId);
      }
    });
  }

  private async obtenirPeriodeDeLocationPourLogement(logementMasqueId: string, periodeDeLocationMasqueId: string): Promise<void> {
    try {
      const periodeDeLocation = await this.periodeDeLocationService.obtenirPeriodeDeLocationPourLogement(logementMasqueId, periodeDeLocationMasqueId);
      this.periodeDeLocationForm.patchValue(periodeDeLocation);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger la période de location.');
    }
    finally {
      this.loading = false;
    }
  }

  async modifierPeriodeDeLocationPourLogement(): Promise<void> {
    this.loading = true;

    const periodeDeLocation: PeriodeDeLocationDTO = this.periodeDeLocationForm.value as PeriodeDeLocationDTO;
    try {
      await this.periodeDeLocationService.modifierPeriodeDeLocationPourLogement(this.logementMasqueId, this.periodeDeLocationMasqueId, periodeDeLocation);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 4 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }

  supprimerPeriodeDeLocationPourLogement() {
    this.periodeDeLocationService.supprimerPeriodeDeLocationPourLogement(this.logementMasqueId, this.periodeDeLocationMasqueId).then(() => {
      this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 4 },
      });
    }).catch(error => {
      console.error('Erreur lors de la suppression de la période de location:', error);
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
    this.supprimerPeriodeDeLocationPourLogement()
  }
}
