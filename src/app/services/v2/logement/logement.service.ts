import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {fetchWithHandling} from "../http-helpers";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {LogementVueEnsembleDTO} from "../../../models/v2/entites/Logement/LogementVueEnsembleDTO.model";

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  private apiUrl = `${environment.apiUrl}/logements`;

  async creerLogement(): Promise<LogementDTO> {
    return fetchWithHandling<LogementDTO>(`${this.apiUrl}/ajouter`, {
      method: 'POST',
    });
  }

  async listerLogements(): Promise<LogementDTO[]> {
    return fetchWithHandling<LogementDTO[]>(`${this.apiUrl}/lister`, {
      method: 'GET',
    });
  }

  async listerLogementsVueEnsemble(): Promise<LogementVueEnsembleDTO[]> {
    return fetchWithHandling<LogementDTO[]>(`${this.apiUrl}/lister/vue-ensemble`, {
      method: 'GET',
    });
  }

  async obtenirLogement(logementMasqueId: string): Promise<LogementDTO> {
    return fetchWithHandling<LogementDTO>(`${this.apiUrl}/${logementMasqueId}/obtenir`, {
      method: 'GET',
    });
  }

  async supprimerLogement(logementMasqueId: string): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
}
