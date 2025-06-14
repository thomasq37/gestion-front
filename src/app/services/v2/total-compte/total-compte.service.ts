import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {fetchWithHandling} from "../http-helpers";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {TotalCompteDTO} from "../../../models/v2/entites/TotalCompte/TotalCompteDTO.model";

@Injectable({
  providedIn: 'root'
})
export class TotalCompteService {

  private apiUrl = `${environment.apiUrl}/total-compte`;

  async listerTotalComptes(): Promise<TotalCompteDTO[]> {
    return fetchWithHandling<TotalCompteDTO[]>(`${this.apiUrl}/lister`, {
      method: 'GET',
    });
  }

  async supprimerTotalCompte(masqueId: string): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${masqueId}/supprimer`, {
      method: 'DELETE',
    });
  }

  async creerTotalCompte(dto: TotalCompteDTO): Promise<TotalCompteDTO> {
    return fetchWithHandling<TotalCompteDTO>(`${this.apiUrl}/ajouter`, {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async modifierTotalCompte(masqueId: string, dto: TotalCompteDTO): Promise<TotalCompteDTO> {
    return fetchWithHandling<TotalCompteDTO>(`${this.apiUrl}/modifier/${masqueId}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
  }
  async creerEtMettreAJourCache(dto: TotalCompteDTO): Promise<TotalCompteDTO> {
    const created = await this.creerTotalCompte(dto);
    return created;
  }

  async modifierEtMettreAJourCache(masqueId: string, dto: TotalCompteDTO): Promise<TotalCompteDTO> {
    const updated = await this.modifierTotalCompte(masqueId, dto);
    return updated;
  }

  async supprimerEtMettreAJourCache(masqueId: string): Promise<void> {
    await this.supprimerTotalCompte(masqueId);
  }

  async obtenirTotalCompte(masqueId: string): Promise<TotalCompteDTO> {
    return fetchWithHandling<TotalCompteDTO>(`${this.apiUrl}/${masqueId}/obtenir`, {
      method: 'GET',
    });
  }
}
