import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-utilisateur-login',
  templateUrl: './utilisateur-login.component.html',
  styleUrls: ['./utilisateur-login.component.scss']
})
export class UtilisateurLoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authenticationService.login(username, password).subscribe(
        (token) => {
          console.log('Connexion effectué avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la connexion : ', error);
        }
      );
    }
  }
}
