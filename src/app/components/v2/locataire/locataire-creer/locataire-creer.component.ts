import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LocataireService} from "../../../../services/v2/locataire/locataire.service";
import {LocataireDTO} from "../../../../models/v2/entites/Locataire/LocataireDTO.model";
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {PeriodeDeLocationService} from "../../../../services/v2/periode-de-location/periode-de-location.service";
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input-gg";

@Component({
  selector: 'app-locataire-creer',
  templateUrl: './locataire-creer.component.html',
  styleUrls: ['./locataire-creer.component.scss']
})
export class LocataireCreerComponent implements OnInit {
  locataireForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  periodesDeLocation: PeriodeDeLocationDTO[] = [];
  loading = false;

  protected readonly SearchCountryField = SearchCountryField;
  protected readonly CountryISO = CountryISO;
  constructor(
    private formBuilder: FormBuilder,
    private locataireService: LocataireService,
    private periodeDeLocationService: PeriodeDeLocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.locataireForm = this.formBuilder.group({
      periodeDeLocation: new FormControl('', [Validators.required]),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email]),
      telephone: new FormControl('', [
      ])
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      if (this.logementMasqueId) {
        this.listerPeriodesDeLocation(this.logementMasqueId);
      }
    });
  }
  private async listerPeriodesDeLocation(logementMasqueId: string): Promise<void> {
    try {
      this.periodesDeLocation = await this.periodeDeLocationService.listerPeriodesDeLocation(logementMasqueId)
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger les périodes de location.');
    }
  }
  async creerLocatairePourPeriodeDeLocation(): Promise<void> {
    this.loading = true;
    const locataire: LocataireDTO = this.locataireForm.value as LocataireDTO;
    locataire.telephone = this.locataireForm.value.telephone?.e164Number

    try {
      await this.locataireService.creerLocatairePourPeriodeDeLocation(this.logementMasqueId, this.locataireForm.get('periodeDeLocation').value, locataire);
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
}
