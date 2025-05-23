import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof localStorage !== 'undefined' && this.isLoggedIn()) {
      // Si l'utilisateur est déjà authentifié, on redirige vers /logements
      this.router.navigate(['/logements']);
      return false;
    }
    return true; // Autorise l'accès si l'utilisateur n'est pas connecté
  }

  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      return false; // localStorage n'est pas disponible
    }

    const token = localStorage.getItem('auth_token');
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        try {
          const payload = JSON.parse(window.atob(parts[1]));
          // Vérification de l'expiration du token
          const now = Date.now().valueOf() / 1000;
          if (typeof payload.exp !== 'undefined' && payload.exp < now) {
            console.log('Le token est expiré.');
            return false; // Le token est expiré
          }
          return true; // Le token est valide
        } catch (error) {
          console.error('Erreur de décodage du JWT :', error);
          return false; // Erreur de décodage, pas un JWT valide
        }
      }
    }

    return false; // Pas de token ou pas au format JWT
  }
}
