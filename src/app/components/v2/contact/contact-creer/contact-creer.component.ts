import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Pays} from "../../../../models/v2/enumeration/Pays.enum";
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
  paysList = Object.values(Pays);
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
        Validators.pattern('^\\+?[0-9 ]{7,15}$')
      ])
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerContactPourLogement(): Promise<void> {
    const contact: ContactDTO = this.contactForm.value as ContactDTO;
    try {
      await this.contactService.creerContactPourLogement(this.logementMasqueId, contact);
      await this.router.navigate([`/logements/${this.logementMasqueId}`]);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
  }

  protected readonly SearchCountryField = SearchCountryField;
  protected readonly CountryISO = CountryISO;
}
