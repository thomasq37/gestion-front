import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AlerteDTO} from "../../../models/v2/entites/Alerte/AlerteDTO.model";
import {fetchWithHandling} from "../http-helpers";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  private apiUrl = `${environment.apiUrl}/logements`;

  async listerAlertes(logementMasqueId: string): Promise<AlerteDTO[]> {
    return fetchWithHandling<AlerteDTO[]>(`${this.apiUrl}/${logementMasqueId}/alertes/lister`, {
      method: 'GET',
    });
  }

  async creerAlertePourLogement(
    logementMasqueId: string,
    alerteDTO: AlerteDTO
  ): Promise<AlerteDTO> {
    return fetchWithHandling<AlerteDTO>(`${this.apiUrl}/${logementMasqueId}/alertes/ajouter`, {
      method: 'POST',
      body: JSON.stringify(alerteDTO),
    });
  }

  async obtenirAlertePourLogement(
    logementMasqueId: string,
    alerteMasqueId: string
  ): Promise<AlerteDTO> {
    return fetchWithHandling<AlerteDTO>(`${this.apiUrl}/${logementMasqueId}/alertes/${alerteMasqueId}/obtenir`, {
      method: 'GET',
    });
  }

  async modifierAlertePourLogement(
    logementMasqueId: string,
    alerteMasqueId: string,
    alerteDTO: AlerteDTO
  ): Promise<AlerteDTO> {
    return fetchWithHandling<AlerteDTO>(`${this.apiUrl}/${logementMasqueId}/alertes/${alerteMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(alerteDTO),
    });
  }

  async supprimerAlertePourLogement(
    logementMasqueId: string,
    alerteMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/alertes/${alerteMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
}
