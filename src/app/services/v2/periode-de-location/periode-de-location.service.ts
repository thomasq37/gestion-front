import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { fetchWithHandling } from '../http-helpers';
import { PeriodeDeLocationDTO } from '../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model';
import { SuccessResponse } from '../../models/v2/exception/SuccessResponse.model';

@Injectable({
  providedIn: 'root',
})
export class PeriodeDeLocationService {
  private apiUrl = `${environment.apiUrl}/logements`;

  async listerPeriodesDeLocation(logementMasqueId: string): Promise<PeriodeDeLocationDTO[]> {
    return fetchWithHandling<PeriodeDeLocationDTO[]>(`${this.apiUrl}/${logementMasqueId}/periodes-de-location/lister`, {
      method: 'GET',
    });
  }

  async creerPeriodeDeLocationPourLogement(
    logementMasqueId: string,
    periodeDeLocationDTO: PeriodeDeLocationDTO
  ): Promise<PeriodeDeLocationDTO> {
    return fetchWithHandling<PeriodeDeLocationDTO>(`${this.apiUrl}/${logementMasqueId}/periodes-de-location/ajouter`, {
      method: 'POST',
      body: JSON.stringify(periodeDeLocationDTO),
    });
  }

  async obtenirPeriodeDeLocationPourLogement(
    logementMasqueId: string,
    periodeDeLocationMasqueId: string
  ): Promise<PeriodeDeLocationDTO> {
    return fetchWithHandling<PeriodeDeLocationDTO>(`${this.apiUrl}/${logementMasqueId}/periodes-de-location/${periodeDeLocationMasqueId}/obtenir`, {
      method: 'GET',
    });
  }

  async modifierPeriodeDeLocationPourLogement(
    logementMasqueId: string,
    periodeDeLocationMasqueId: string,
    periodeDeLocationDTO: PeriodeDeLocationDTO
  ): Promise<PeriodeDeLocationDTO> {
    return fetchWithHandling<PeriodeDeLocationDTO>(`${this.apiUrl}/${logementMasqueId}/periodes-de-location/${periodeDeLocationMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(periodeDeLocationDTO),
    });
  }

  async supprimerPeriodeDeLocationPourLogement(
    logementMasqueId: string,
    periodeDeLocationMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/periodes-de-location/${periodeDeLocationMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
}
