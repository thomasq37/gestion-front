import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {environment} from "../../../../environments/environment";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
@Injectable({
  providedIn: 'root',
})
export class CaracteristiquesService {
  private apiUrl = `${environment.apiUrl}/logements`;
  async creerCaracteristiquesPourLogement(
    logementMasqueId: string,
    caracteristiquesDTO: CaracteristiquesDTO
  ): Promise<CaracteristiquesDTO> {
    return fetchWithHandling<CaracteristiquesDTO>(`${this.apiUrl}/${logementMasqueId}/caracteristiques/ajouter`, {
      method: 'POST',
      body: JSON.stringify(caracteristiquesDTO),
    });
  }

  async obtenirCaracteristiquesPourLogement(
    logementMasqueId: string,
  ): Promise<CaracteristiquesDTO> {
    return fetchWithHandling<CaracteristiquesDTO>(`${this.apiUrl}/${logementMasqueId}/caracteristiques/obtenir`, {
      method: 'GET',
    });
  }

  async modifierCaracteristiquesPourLogement(
    logementMasqueId: string,
    caracteristiquesDTO: CaracteristiquesDTO
  ): Promise<CaracteristiquesDTO> {
    console.log(caracteristiquesDTO)
    return fetchWithHandling<CaracteristiquesDTO>(`${this.apiUrl}/${logementMasqueId}/caracteristiques/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(caracteristiquesDTO),
    });
  }

  async supprimerCaracteristiquesPourLogement(
    logementMasqueId: string,
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/caracteristiques/supprimer`, {
      method: 'DELETE',
    });
  }
}
