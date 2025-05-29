import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {environment} from "../../../../environments/environment";
import {LocataireDTO} from "../../../models/v2/entites/Locataire/LocataireDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {LogementService} from "../logement/logement.service";
@Injectable({
  providedIn: 'root',
})
export class LocataireService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private logementService: LogementService) {}

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

  async obtenirPeriodeDeLocationPourLocataire(
    logementMasqueId: string,
    locataireMasqueId: string
  ): Promise<PeriodeDeLocationDTO> {
    return fetchWithHandling<PeriodeDeLocationDTO>(`${this.apiUrl}/${logementMasqueId}/locataires/${locataireMasqueId}/periode-de-location/obtenir`, {
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
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/locataires/${locataireMasqueId}/periodes-de-location/${periodeMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
  async creerEtMettreAJourCache(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireDTO: LocataireDTO
  ): Promise<LocataireDTO> {
    const nouveauLocataire = await this.creerLocatairePourPeriodeDeLocation(logementMasqueId, periodeMasqueId, locataireDTO);
    this.logementService.mettreAJourLocataireDansLogement(logementMasqueId, periodeMasqueId, nouveauLocataire);
    return nouveauLocataire;
  }
  async modifierEtMettreAJourCache(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireMasqueId: string,
    locataireDTO: LocataireDTO
  ): Promise<LocataireDTO> {
    const locataireModifie = await this.modifierLocatairePourPeriodeDeLocation(logementMasqueId, periodeMasqueId, locataireMasqueId, locataireDTO);
    this.logementService.mettreAJourLocataireDansLogement(logementMasqueId, periodeMasqueId, locataireModifie);
    return locataireModifie;
  }
  async supprimerEtMettreAJourCache(
    logementMasqueId: string,
    periodeMasqueId: string,
    locataireMasqueId: string
  ): Promise<SuccessResponse> {
    const res = await this.supprimerLocatairePourPeriodeDeLocation(logementMasqueId, periodeMasqueId, locataireMasqueId);
    this.logementService.supprimerLocataireDansLogement(logementMasqueId, periodeMasqueId, locataireMasqueId);
    return res;
  }

}
