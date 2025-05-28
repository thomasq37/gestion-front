import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {environment} from "../../../../environments/environment";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {LogementService} from "../logement/logement.service";

@Injectable({
  providedIn: 'root',
})
export class PeriodeDeLocationService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private logementService: LogementService) {}

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
  async modifierEtMettreAJourCache(
    logementMasqueId: string,
    periodeMasqueId: string,
    dto: PeriodeDeLocationDTO
  ): Promise<PeriodeDeLocationDTO> {
    const updated = await this.modifierPeriodeDeLocationPourLogement(logementMasqueId, periodeMasqueId, dto);
    this.logementService.mettreAJourPeriodeDansLogement(logementMasqueId, updated);
    return updated;
  }

  async creerEtMettreAJourCache(
    logementMasqueId: string,
    periodeDTO: PeriodeDeLocationDTO
  ): Promise<PeriodeDeLocationDTO> {
    const created = await this.creerPeriodeDeLocationPourLogement(logementMasqueId, periodeDTO);
    this.logementService.mettreAJourPeriodeDansLogement(logementMasqueId, created);
    return created;
  }

  async supprimerEtMettreAJourCache(logementMasqueId: string, periodeMasqueId: string): Promise<void> {
    await this.supprimerPeriodeDeLocationPourLogement(logementMasqueId, periodeMasqueId);
    this.logementService.supprimerPeriodeDansLogement(logementMasqueId, periodeMasqueId);
  }

}
