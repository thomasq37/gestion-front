import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../../../services/v2/contact/contact.service";
import {ContactDTO} from "../../../../models/v2/entites/Contact/ContactDTO.model";
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input-gg";

@Component({
  selector: 'app-contact-creer',
  templateUrl: './contact-creer.component.html',
  styleUrls: ['./contact-creer.component.scss']
})
export class ContactCreerComponent {
  contactForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  loading = false;
  protected readonly SearchCountryField = SearchCountryField;
  protected readonly CountryISO = CountryISO;
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
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerContactPourLogement(): Promise<void> {

    this.loading = true
    const contact: ContactDTO = this.contactForm.value as ContactDTO;
    contact.telephone = this.contactForm.value.telephone?.e164Number
    try {
      await this.contactService.creerContactPourLogement(this.logementMasqueId, contact);
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
}
