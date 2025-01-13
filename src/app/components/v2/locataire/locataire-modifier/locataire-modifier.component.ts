import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocataireService} from "../../../../services/v2/locataire/locataire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PeriodeDeLocationService} from "../../../../services/v2/periode-de-location/periode-de-location.service";
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {LocataireDTO} from "../../../../models/v2/entites/Locataire/LocataireDTO.model";
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input-gg";
import {TelephoneUtil} from "../../util/telephone-util";

@Component({
  selector: 'app-locataire-modifier',
  templateUrl: './locataire-modifier.component.html',
  styleUrls: ['./locataire-modifier.component.scss']
})
export class LocataireModifierComponent implements OnInit {
  locataireForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  locataireMasqueId: string | null = null;
  periodesDeLocation: PeriodeDeLocationDTO[] = [];
  locataireActuel!: LocataireDTO;
  periodeDeLocationActuel!: PeriodeDeLocationDTO;
  loading = false;
  protected readonly SearchCountryField = SearchCountryField;
  protected readonly CountryISO = CountryISO;
  protected selectedCountryISO: CountryISO;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer le locataire ?"
  isModalVisible = false;
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
      telephone: new FormControl('', []),
      dateDeNaissance: new FormControl('', []),
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      this.locataireMasqueId = params.get('locataireMasqueId');
    });
  }
  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      if (this.logementMasqueId) {
        this.listerPeriodesDeLocation(this.logementMasqueId);
        this.obtenirPeriodeDeLocationPourLocataire(this.logementMasqueId, this.locataireMasqueId)
      }
    });
  }
  private async listerPeriodesDeLocation(logementMasqueId: string,): Promise<void> {
    try {
      this.periodesDeLocation = await this.periodeDeLocationService.listerPeriodesDeLocation(logementMasqueId);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger l’adresse.');
    }
  }
  private async obtenirPeriodeDeLocationPourLocataire(logementMasqueId: string, locataireMasqueId: string): Promise<void> {
    try {
      this.periodeDeLocationActuel = await this.locataireService.obtenirPeriodeDeLocationPourLocataire(logementMasqueId, locataireMasqueId);
      this.locataireForm.patchValue({periodeDeLocation: this.periodeDeLocationActuel.masqueId});
      this.obtenirLocatairePourPeriodeDeLocation(this.logementMasqueId, this.periodeDeLocationActuel.masqueId, this.locataireMasqueId);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger l’adresse.');
    }
  }
  private async obtenirLocatairePourPeriodeDeLocation(logementMasqueId: string, periodeMasqueId: string, locataireMasqueId: string): Promise<void> {
    try {
      this.locataireActuel = await this.locataireService.obtenirLocatairePourPeriodeDeLocation(logementMasqueId, periodeMasqueId, locataireMasqueId);
      this.selectedCountryISO = TelephoneUtil.obtenirCountryISO(this.locataireActuel.telephone)
      this.locataireForm.patchValue(this.locataireActuel);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger l’adresse.');
    }
    finally {
      this.loading = false;
    }
  }
  async modifierLocatairePourPeriodeDeLocation(): Promise<void> {
    this.loading = true;
    const locataire: LocataireDTO = this.locataireForm.value as LocataireDTO;
    locataire.telephone = this.locataireForm.value.telephone?.e164Number
    try {
      await this.locataireService.modifierLocatairePourPeriodeDeLocation(this.logementMasqueId, this.locataireForm.get('periodeDeLocation').value, this.locataireActuel.masqueId, locataire);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 5 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }
  supprimerLocatairePourPeriodeDeLocation() {
    this.locataireService.supprimerLocatairePourPeriodeDeLocation(this.logementMasqueId, this.periodeDeLocationActuel.masqueId, this.locataireMasqueId).then(() => {
      this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 5 },
      });
    }).catch(error => {
      console.error('Erreur lors de la suppression du locataire:', error);
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
    this.supprimerLocatairePourPeriodeDeLocation()
  }
}

