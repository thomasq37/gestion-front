import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../../../services/v2/contact/contact.service";
import {ContactDTO} from "../../../../models/v2/entites/Contact/ContactDTO.model";
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input-gg";
import {TelephoneUtil} from "../../util/telephone-util";
import {Country} from "ngx-intl-tel-input-gg/lib/model/country.model";
@Component({
  selector: 'app-contact-modifier',
  templateUrl: './contact-modifier.component.html',
  styleUrls: ['./contact-modifier.component.scss']
})
export class ContactModifierComponent implements OnInit {
  contactForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  contactMasqueId: string | null = null;
  loading = false;
  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;
  protected selectedCountryISO: CountryISO;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer le contact pour ce logement ?"
  isModalVisible = false;
  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.contactForm = this.formBuilder.group({
      prenom: new FormControl('', Validators.required),
      nom: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      telephone: new FormControl('', [
      ])
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      this.contactMasqueId = params.get('contactMasqueId');
      if (this.logementMasqueId) {
        this.obtenirContactPourLogement(this.logementMasqueId, this.contactMasqueId);
      }
    });
  }

  private async obtenirContactPourLogement(logementMasqueId: string, contactMasqueId: string): Promise<void> {
    try {
      const contact = await this.contactService.obtenirContactPourLogement(logementMasqueId, contactMasqueId);
      this.selectedCountryISO = TelephoneUtil.obtenirCountryISO(contact.telephone)
      this.contactForm.patchValue(contact);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger le contact.');
    }
    finally {
      this.loading = false;
    }
  }

  async modifierContactPourLogement(): Promise<void> {
    this.loading = true;

    const contact: ContactDTO = this.contactForm.value as ContactDTO;
    contact.telephone = this.contactForm.value.telephone?.e164Number

    try {
      await this.contactService.modifierEtMettreAJourCache(this.logementMasqueId, this.contactMasqueId, contact);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 6 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }

  supprimerContactPourLogement() {
    this.contactService.supprimerEtMettreAJourCache(this.logementMasqueId, this.contactMasqueId).then(() => {      this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 6 },
      });
    }).catch(error => {
      console.error('Erreur lors de la suppression de le contact:', error);
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
    this.supprimerContactPourLogement()
  }

  onCountryChange(event: Country): void {
    const phoneData = this.contactForm.get('telephone')?.value;
    if(phoneData !== null){
      let updatedPhone = { ...phoneData };
      const oldDialCode = phoneData.dialCode;
      const numberWithoutPrefix = phoneData.number.replace(oldDialCode, '');
      const newDialCode = event.dialCode;
      updatedPhone.number = `+${newDialCode}${numberWithoutPrefix}`;
      updatedPhone.e164Number = `+${newDialCode}${numberWithoutPrefix}`;
      const firstDigit = numberWithoutPrefix.charAt(0);
      const restOfNumber = numberWithoutPrefix.slice(1);
      const formattedRest = restOfNumber.match(/.{2}/g)?.join(' ') || restOfNumber;
      updatedPhone.internationalNumber = `+${newDialCode} ${firstDigit} ${formattedRest}`;
      updatedPhone.nationalNumber = `0${firstDigit} ${formattedRest}`;
      updatedPhone.countryCode = event.iso2.toUpperCase();
      updatedPhone.dialCode = `+${newDialCode}`;
      this.contactForm.get('telephone')?.setValue(updatedPhone);
    }
  }
}
