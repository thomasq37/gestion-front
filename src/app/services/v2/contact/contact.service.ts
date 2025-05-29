import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {environment} from "../../../../environments/environment";
import {ContactDTO} from "../../../models/v2/entites/Contact/ContactDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";
import {LogementService} from "../logement/logement.service";
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private logementService: LogementService) {}
  async listerContacts(logementMasqueId: string): Promise<ContactDTO[]> {
    return fetchWithHandling<ContactDTO[]>(`${this.apiUrl}/${logementMasqueId}/contacts/lister`, {
      method: 'GET',
    });
  }

  async creerContactPourLogement(
    logementMasqueId: string,
    contactDTO: ContactDTO
  ): Promise<ContactDTO> {
    return fetchWithHandling<ContactDTO>(`${this.apiUrl}/${logementMasqueId}/contacts/ajouter`, {
      method: 'POST',
      body: JSON.stringify(contactDTO),
    });
  }

  async obtenirContactPourLogement(
    logementMasqueId: string,
    contactMasqueId: string
  ): Promise<ContactDTO> {
    return fetchWithHandling<ContactDTO>(`${this.apiUrl}/${logementMasqueId}/contacts/${contactMasqueId}/obtenir`, {
      method: 'GET',
    });
  }

  async modifierContactPourLogement(
    logementMasqueId: string,
    contactMasqueId: string,
    contactDTO: ContactDTO
  ): Promise<ContactDTO> {
    return fetchWithHandling<ContactDTO>(`${this.apiUrl}/${logementMasqueId}/contacts/${contactMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(contactDTO),
    });
  }

  async supprimerContactPourLogement(
    logementMasqueId: string,
    contactMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/contacts/${contactMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }

  async creerEtMettreAJourCache(logementMasqueId: string, contactDTO: ContactDTO): Promise<ContactDTO> {
    const nouveauContact = await this.creerContactPourLogement(logementMasqueId, contactDTO);
    this.logementService.mettreAJourContactDansLogement(logementMasqueId, nouveauContact);
    return nouveauContact;
  }

  /**
   * Modifie un contact et met à jour le cache du logement
   */
  async modifierEtMettreAJourCache(logementMasqueId: string, contactMasqueId: string, contactDTO: ContactDTO): Promise<ContactDTO> {
    const contactModifie = await this.modifierContactPourLogement(logementMasqueId, contactMasqueId, contactDTO);
    this.logementService.mettreAJourContactDansLogement(logementMasqueId, contactModifie);
    return contactModifie;
  }

  /**
   * Supprime un contact et met à jour le cache du logement
   */
  async supprimerEtMettreAJourCache(logementMasqueId: string, contactMasqueId: string): Promise<SuccessResponse> {
    const res = await this.supprimerContactPourLogement(logementMasqueId, contactMasqueId);
    this.logementService.supprimerContactDansLogement(logementMasqueId, contactMasqueId);
    return res;
  }
}
