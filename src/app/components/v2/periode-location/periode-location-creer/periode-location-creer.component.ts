import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {PeriodeDeLocationService} from "../../../../services/v2/periode-de-location/periode-de-location.service";
import {TypeDeLocation} from "../../../../models/v2/enumeration/TypeDeLocation.enum";

@Component({
  selector: 'app-periode-location-creer',
  templateUrl: './periode-location-creer.component.html',
  styleUrls: ['./periode-location-creer.component.scss']
})
export class PeriodeLocationCreerComponent {
  periodeDeLocationForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  loading = false;
  typesDeLocation = Object.values(TypeDeLocation);

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
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerPeriodeDeLocationPourLogement(): Promise<void> {

    this.loading = true
    const periodeDeLocation: PeriodeDeLocationDTO = this.periodeDeLocationForm.value as PeriodeDeLocationDTO;
    try {
      await this.periodeDeLocationService.creerPeriodeDeLocationPourLogement(this.logementMasqueId, periodeDeLocation);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab:3 },
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
