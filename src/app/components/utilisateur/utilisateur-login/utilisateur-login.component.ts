import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentService } from '../../../services/auth/authent.service';
import {AuthenticateUserRequestDTO} from "../../../models/v2/auth/AuthenticateUserRequestDTO.model";

@Component({
  selector: 'app-utilisateur-login',
  templateUrl: './utilisateur-login.component.html',
  styleUrls: ['./utilisateur-login.component.scss']
})
export class UtilisateurLoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthentService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)
      ]],
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const { email, mdp } = this.loginForm.value as AuthenticateUserRequestDTO;
    try {
      const response = await this.authenticationService.authenticateUser({ email, mdp });
      localStorage.setItem('auth_token', response);
      this.message = 'Connexion réussie';
    } catch (error: any) {
      console.warn(error);
      this.message = 'Erreur : ' + (error?.message || 'Une erreur inconnue est survenue.');
    }
  }
}
