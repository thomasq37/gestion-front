import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { fetchWithHandling } from '../http-helpers';
import { ContactDTO } from '../../models/v2/entites/Contact/ContactDTO.model';
import { SuccessResponse } from '../../models/v2/exception/SuccessResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/logements`;

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
}
