import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private router: Router) {}

  async connexion(utilisateur: LoginRequest): Promise<string> {
    const response = await fetch(`${this.apiUrl}/auth/connexion`, {
      method: 'POST', // Définir la méthode HTTP sur POST pour envoyer des données.
      headers: {
        'Content-Type': 'application/json', // Préciser le type de contenu envoyé
      },
      body: JSON.stringify(utilisateur), // Convertir l'objet utilisateur en chaîne JSON pour l'envoyer.
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.text(); // Vous pouvez adapter cette ligne si l'API renvoie une structure spécifique que vous souhaitez retourner.
  }

  async inscription(utilisateur: RegisterRequest): Promise<string> {
    const response = await fetch(`${this.apiUrl}/auth/inscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Préciser le type de contenu envoyé
      },
      body: JSON.stringify(utilisateur), // Convertir l'objet utilisateur en chaîne JSON pour l'envoyer.
    });


    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.text();
  }

  getUserDetails(): { email: string, roles: string[] } | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    try {
      const payload = JSON.parse(window.atob(parts[1]));
      const email = payload.sub;
      const roles = payload.roles;
      return { email, roles };
    } catch (error) {
      console.error('Erreur lors de la décodage du JWT:', error);
      return null;
    }
  }


  logout(): void {
    localStorage.removeItem('auth_token'); // Remove the authentication token
    localStorage.removeItem('userToken'); // Remove the authentication token
    localStorage.removeItem('userId'); // Remove the authentication token
    localStorage.removeItem('userRole');

    this.router.navigate(['/login']); // Redirect to login page
  }
  loginRedirection() {
    this.router.navigate(['/login']); // Redirect to login page
  }
}
export interface LoginRequest{
  email: string;
  mdp: string;
}
export interface RegisterRequest{
  pseudo: string;
  email: string;
  mdp: string;
}
