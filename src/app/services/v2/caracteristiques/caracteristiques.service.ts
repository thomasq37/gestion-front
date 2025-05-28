import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {environment} from "../../../../environments/environment";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {LogementService} from "../logement/logement.service";
@Injectable({
  providedIn: 'root',
})
export class CaracteristiquesService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private logementService: LogementService) {}

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

  async creerEtMettreAJourCache(
    logementMasqueId: string,
    dto: CaracteristiquesDTO
  ): Promise<CaracteristiquesDTO> {
    const created = await this.creerCaracteristiquesPourLogement(logementMasqueId, dto);
    this.logementService.mettreAJourCaracteristiquesDansLogement(logementMasqueId, created);
    return created;
  }

  async modifierEtMettreAJourCache(
    logementMasqueId: string,
    dto: CaracteristiquesDTO
  ): Promise<CaracteristiquesDTO> {
    const updated = await this.modifierCaracteristiquesPourLogement(logementMasqueId, dto);
    this.logementService.mettreAJourCaracteristiquesDansLogement(logementMasqueId, updated);
    return updated;
  }

  async supprimerEtMettreAJourCache(logementMasqueId: string): Promise<void> {
    await this.supprimerCaracteristiquesPourLogement(logementMasqueId);
    this.logementService.supprimerCaracteristiquesDansLogement(logementMasqueId);
  }

}
