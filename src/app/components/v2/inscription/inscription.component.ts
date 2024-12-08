import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequestDTO } from '../../../models/v2/auth/RegisterUserRequestDTO.model';
import {CountryISO, SearchCountryField} from "ngx-intl-tel-input-gg";
import {AuthentService} from "../../../services/v2/auth/authent.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthentService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
      ]],
      confirmMdp: ['', [Validators.required]],
      nom: [''],
      prenom: [''],
      telephone: ['']
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  async inscription(): Promise<void> {
    const telephone = this.registerForm.value.telephone?.e164Number;
    const { email, mdp, nom, prenom } = this.registerForm.value;
    try {
      await this.authenticationService.registerUser({ email, mdp, telephone, nom, prenom } as RegisterUserRequestDTO);
      await this.router.navigate(['/connexion']);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('mdp')?.value;
    const confirmPassword = group.get('confirmMdp')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  protected readonly CountryISO = CountryISO;
  protected readonly SearchCountryField = SearchCountryField;
}
