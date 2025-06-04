import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {fetchWithHandling} from "../http-helpers";
import {FraisDTO} from "../../../models/v2/entites/Frais/FraisDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {LogementService} from "../logement/logement.service";

@Injectable({
  providedIn: 'root',
})
export class FraisService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private logementService: LogementService) {}
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

  // frais pour credit

  async creerFraisPourCredit(
    logementMasqueId: string,
    creditMasqueId: string,
    fraisDTO: FraisDTO
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/credit/${creditMasqueId}/ajouter`, {
      method: 'POST',
      body: JSON.stringify(fraisDTO),
    });
  }
  async obtenirFraisPourCredit(
    logementMasqueId: string,
    creditMasqueId: string,
    fraisMasqueId: string
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/credit/${creditMasqueId}/obtenir`, {
      method: 'GET',
    });
  }
  async modifierFraisPourCredit(
    logementMasqueId: string,
    creditMasqueId: string,
    fraisMasqueId: string,
    fraisDTO: FraisDTO
  ): Promise<FraisDTO> {
    return fetchWithHandling<FraisDTO>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/credit/${creditMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(fraisDTO),
    });
  }
  async supprimerFraisPourCredit(
    logementMasqueId: string,
    creditMasqueId: string,
    fraisMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/frais/${fraisMasqueId}/credit/${creditMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }

  // cache

  async creerEtMettreAJourCache(logementMasqueId: string, fraisDTO: FraisDTO, periodeMasqueId?: string, creditMasqueId?: string): Promise<FraisDTO> {
    let created: FraisDTO | PromiseLike<FraisDTO>;
    if(periodeMasqueId){
      created = await this.creerFraisPourPeriodeDeLocation(logementMasqueId, periodeMasqueId, fraisDTO);
    }
    else if(creditMasqueId){
      created = await this.creerFraisPourCredit(logementMasqueId, creditMasqueId, fraisDTO);

    }
    else {
      created = await this.creerFraisPourLogement(logementMasqueId, fraisDTO);
    }
    this.logementService.mettreAJourFraisDansLogement(logementMasqueId, created, periodeMasqueId, creditMasqueId);
    return created;
  }

  async modifierEtMettreAJourCache(logementMasqueId: string, fraisMasqueId: string, fraisDTO: FraisDTO, periodeMasqueId?: string, creditMasqueId?: string): Promise<FraisDTO> {
    let updated: FraisDTO | PromiseLike<FraisDTO>;
    if(periodeMasqueId){
      updated = await this.modifierFraisPourPeriodeDeLocation(logementMasqueId, periodeMasqueId, fraisMasqueId, fraisDTO)
    }
    else if(creditMasqueId){
      updated = await this.modifierFraisPourCredit(logementMasqueId, creditMasqueId, fraisMasqueId, fraisDTO)
    }
    else {
      updated = await this.modifierFraisPourLogement(logementMasqueId, fraisMasqueId, fraisDTO);
    }
    this.logementService.mettreAJourFraisDansLogement(logementMasqueId, updated, periodeMasqueId, creditMasqueId);
    return updated;
  }

  async supprimerEtMettreAJourCache(logementMasqueId: string, fraisMasqueId: string, periodeMasqueId?: string, creditMasqueId?: string): Promise<void> {
    if(periodeMasqueId){
      await this.supprimerFraisPourPeriodeDeLocation(logementMasqueId, periodeMasqueId, fraisMasqueId);
    }
    else if(creditMasqueId){
      await this.supprimerFraisPourCredit(logementMasqueId, creditMasqueId, fraisMasqueId);
    }
    else {
      await this.supprimerFraisPourLogement(logementMasqueId, fraisMasqueId);
    }

    this.logementService.supprimerFraisDansLogement(logementMasqueId, fraisMasqueId, periodeMasqueId, creditMasqueId);
  }
}
