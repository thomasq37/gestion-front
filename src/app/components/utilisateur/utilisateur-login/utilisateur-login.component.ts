import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-utilisateur-login',
  templateUrl: './utilisateur-login.component.html',
  styleUrls: ['./utilisateur-login.component.scss']
})
export class UtilisateurLoginComponent {
  loginForm: FormGroup;
  message: ''
  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authenticationService.connexion({email: username, mdp: password}).then(
        (response) => {
          console.log('Connexion effectué avec succès.');
          localStorage.setItem('auth_token', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.message = error.error
          console.error('Erreur lors de la connexion : ', error);
        }
      );
    }
  }
}
