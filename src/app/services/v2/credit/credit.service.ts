import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {LogementService} from "../logement/logement.service";
import {fetchWithHandling} from "../http-helpers";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {CreditDTO} from "../../../models/v2/entites/Credit/CreditDTO.model";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private logementService: LogementService) {}

  async creerCreditPourLogement(
    logementMasqueId: string,
    creditDTO: CreditDTO
  ): Promise<CreditDTO> {
    return fetchWithHandling<CreditDTO>(`${this.apiUrl}/${logementMasqueId}/credit/ajouter`, {
      method: 'POST',
      body: JSON.stringify(creditDTO),
    });
  }

  async obtenirCreditPourLogement(
    logementMasqueId: string,
  ): Promise<CreditDTO> {
    return fetchWithHandling<CreditDTO>(`${this.apiUrl}/${logementMasqueId}/credit/obtenir`, {
      method: 'GET',
    });
  }

  async modifierCreditPourLogement(
    logementMasqueId: string,
    creditDTO: CreditDTO
  ): Promise<CreditDTO> {
    return fetchWithHandling<CreditDTO>(`${this.apiUrl}/${logementMasqueId}/credit/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(creditDTO),
    });
  }

  async supprimerCreditPourLogement(
    logementMasqueId: string,
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/credit/supprimer`, {
      method: 'DELETE',
    });
  }

  async creerEtMettreAJourCache(
    logementMasqueId: string,
    dto: CreditDTO
  ): Promise<CreditDTO> {
    const created = await this.creerCreditPourLogement(logementMasqueId, dto);
    this.logementService.mettreAJourCreditDansLogement(logementMasqueId, created);
    return created;
  }

  async modifierEtMettreAJourCache(
    logementMasqueId: string,
    dto: CreditDTO
  ): Promise<CreditDTO> {
    const updated = await this.modifierCreditPourLogement(logementMasqueId, dto);
    this.logementService.mettreAJourCreditDansLogement(logementMasqueId, updated);
    return updated;
  }

  async supprimerEtMettreAJourCache(logementMasqueId: string): Promise<void> {
    await this.supprimerCreditPourLogement(logementMasqueId);
    this.logementService.supprimerCreditDansLogement(logementMasqueId);
  }
}
