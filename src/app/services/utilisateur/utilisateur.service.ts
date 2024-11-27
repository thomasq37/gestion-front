import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { fetchWithHandling } from '../http-helpers';
import { UtilisateurDTO } from '../../models/v2/entites/Utilisateur/UtilisateurDTO.model';
import { SuccessResponse } from '../../models/v2/exception/SuccessResponse.model';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/utilisateurs`;
  async obtenirCompte(): Promise<UtilisateurDTO> {
    return fetchWithHandling<UtilisateurDTO>(`${this.apiUrl}/profil`, {
      method: 'GET',
    });
  }
  async modifierCompte(
    utilisateurDTO: UtilisateurDTO
  ): Promise<UtilisateurDTO> {
    return fetchWithHandling<UtilisateurDTO>(`${this.apiUrl}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(utilisateurDTO),
    });
  }
  async supprimerCompte(): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/supprimer`, {
      method: 'DELETE',
    });
  }
  async supprimerUtilisateur(
    email: string,
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/admin/supprimer/${email}`, {
      method: 'DELETE',
    });
  }
}
