import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../../../services/v2/contact/contact.service";
import {ContactDTO} from "../../../../models/v2/entites/Contact/ContactDTO.model";
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input-gg";
import {TelephoneUtil} from "../../util/telephone-util";
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
  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.contactForm = this.formBuilder.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
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
    const contact: ContactDTO = this.contactForm.value as ContactDTO;
    contact.telephone = this.contactForm.value.telephone?.e164Number

    try {
      await this.contactService.modifierContactPourLogement(this.logementMasqueId, this.contactMasqueId, contact);
      await this.router.navigate([`/logements/${this.logementMasqueId}`]);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
  }

  supprimerContactPourLogement(logementMasqueId: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer le contact pour ce logement ?');
    if (confirmed) {
      this.contactService.supprimerContactPourLogement(logementMasqueId, this.contactMasqueId).then(() => {
        this.router.navigate([`/logements/${this.logementMasqueId}`]);
      }).catch(error => {
        console.error('Erreur lors de la suppression de le contact:', error);
      });
    } else {
      console.log('Suppression annulée');
    }
  }
}
