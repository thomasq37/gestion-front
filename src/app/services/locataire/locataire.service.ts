import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { fetchWithHandling } from '../http-helpers';
import { LocataireDTO } from '../../models/v2/entites/Locataire/LocataireDTO.model';
import { SuccessResponse } from '../../models/v2/exception/SuccessResponse.model';

@Injectable({
  providedIn: 'root',
})
export class LocataireService {
  private apiUrl = `${environment.apiUrl}/logements`;

  async listerLocatairesPourPeriodeDeLocation(logementMasqueId: string, periodeMasqueId: string): Promise<LocataireDTO[]> {
    return fetchWithHandling<LocataireDTO[]>(`${this.apiUrl}/${logementMasqueId}/locataires/periodes-de-location/${periodeMasqueId}/lister`, {
      method: 'GET',
    });
  }
  async creerLocatairePourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireDTO: LocataireDTO
  ): Promise<LocataireDTO> {
    return fetchWithHandling<LocataireDTO>(`${this.apiUrl}/${logementMasqueId}/locataires/periodes-de-location/${periodeMasqueId}/ajouter`, {
      method: 'POST',
      body: JSON.stringify(locataireDTO),
    });
  }
  async obtenirLocatairePourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireMasqueId: string
  ): Promise<LocataireDTO> {
    return fetchWithHandling<LocataireDTO>(`${this.apiUrl}/${logementMasqueId}/locataires/${locataireMasqueId}/periodes-de-location/${periodeMasqueId}/obtenir`, {
      method: 'GET',
    });
  }
  async modifierLocatairePourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireMasqueId: string,
    locataireDTO: LocataireDTO
  ): Promise<LocataireDTO> {
    return fetchWithHandling<LocataireDTO>(`${this.apiUrl}/${logementMasqueId}/locataires/${locataireMasqueId}/periodes-de-location/${periodeMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(locataireDTO),
    });
  }
  async supprimerLocatairePourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/locataire/${locataireMasqueId}/periodes-de-location/${periodeMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
}
