import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {fetchWithHandling} from "../http-helpers";
import {FraisDTO} from "../../../models/v2/entites/Frais/FraisDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";

@Injectable({
  providedIn: 'root',
})
export class FraisService {
  private apiUrl = `${environment.apiUrl}/logements`;

  async listerFraisPourLogement(logementMasqueId: string): Promise<FraisDTO[]> {
    return fetchWithHandling<FraisDTO[]>(`${this.apiUrl}/${logementMasqueId}/frais/lister`, {
      method: 'GET',
    });
  }
  async creerFraisPourLogement(
    logementMasqueId: string,
    fraisDTO: FraisDTO
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/ajouter`, {
      method: 'POST',
      body: JSON.stringify(fraisDTO),
    });
  }
  async obtenirFraisPourLogement(
    logementMasqueId: string,
    fraisMasqueId: string
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/obtenir`, {
      method: 'GET',
    });
  }
  async modifierFraisPourLogement(
    logementMasqueId: string,
    fraisMasqueId: string,
    fraisDTO: FraisDTO
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(fraisDTO),
    });
  }
  async supprimerFraisPourLogement(
    logementMasqueId: string,
    fraisMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }

  // ----------------------------------------------- //
  // Debut des frais concernant periodes de location //
  // ----------------------------------------------- //

  async listerFraisPourPeriodeDeLocation(logementMasqueId: string, periodeMasqueId: string): Promise<FraisDTO[]> {
    return fetchWithHandling<FraisDTO[]>(`${this.apiUrl}/${logementMasqueId}/frais/periodes-de-location/${periodeMasqueId}/lister`, {
      method: 'GET',
    });
  }
  async creerFraisPourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    fraisDTO: FraisDTO
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/periodes-de-location/${periodeMasqueId}/ajouter`, {
      method: 'POST',
      body: JSON.stringify(fraisDTO),
    });
  }
  async obtenirFraisPourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    fraisMasqueId: string
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/periodes-de-location/${periodeMasqueId}/obtenir`, {
      method: 'GET',
    });
  }
  async modifierFraisPourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    fraisMasqueId: string,
    fraisDTO: FraisDTO
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/periodes-de-location/${periodeMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(fraisDTO),
    });
  }
  async supprimerFraisPourPeriodeDeLocation(
    logementMasqueId: string,
    periodeMasqueId: string,
    fraisMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/periodes-de-location/${periodeMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
}
