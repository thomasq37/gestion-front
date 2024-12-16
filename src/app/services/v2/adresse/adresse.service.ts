import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {AdresseDTO} from "../../../models/v2/entites/Adresse/AdresseDTO.model";
import {environment} from "../../../../environments/environment";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  private apiUrl = `${environment.apiUrl}/logements`;
  async creerAdressePourLogement(
    logementMasqueId: string,
    adresseDTO: AdresseDTO
  ): Promise<AdresseDTO> {
    return fetchWithHandling<AdresseDTO>(`${this.apiUrl}/${logementMasqueId}/adresse/ajouter`, {
      method: 'POST',
      body: JSON.stringify(adresseDTO),
    });
  }

  async obtenirAdressePourLogement(
    logementMasqueId: string,
  ): Promise<AdresseDTO> {
    return fetchWithHandling<AdresseDTO>(`${this.apiUrl}/${logementMasqueId}/adresse/obtenir`, {
      method: 'GET',
    });
  }

  async modifierAdressePourLogement(
    logementMasqueId: string,
    adresseDTO: AdresseDTO
  ): Promise<AdresseDTO> {
    return fetchWithHandling<AdresseDTO>(`${this.apiUrl}/${logementMasqueId}/adresse/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(adresseDTO),
    });
  }

  async supprimerAdressePourLogement(
    logementMasqueId: string,
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/adresse/supprimer`, {
      method: 'DELETE',
    });
  }
}
