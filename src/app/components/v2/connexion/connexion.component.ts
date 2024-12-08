import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticateUserRequestDTO} from "../../../models/v2/auth/AuthenticateUserRequestDTO.model";
import {AuthentService} from "../../../services/v2/auth/authent.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthentService,
    private router: Router
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

  async connexion(): Promise<void> {
    const { email, mdp } = this.loginForm.value as AuthenticateUserRequestDTO;
    try {
      const response = await this.authenticationService.authenticateUser({ email, mdp });
      localStorage.setItem('auth_token', response.message);
      await this.router.navigate(['/logements'])
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
  }
}
