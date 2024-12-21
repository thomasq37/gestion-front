import { Injectable } from '@angular/core';
import { fetchWithHandling } from '../http-helpers';
import {environment} from "../../../../environments/environment";
import {PhotoDTO} from "../../../models/v2/entites/Photo/PhotoDTO.model";
import {SuccessResponse} from "../../../models/v2/exception/SuccessResponse.model";

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = `${environment.apiUrl}/logements`;

  async listerPhotos(logementMasqueId: string): Promise<PhotoDTO[]> {
    return fetchWithHandling<PhotoDTO[]>(`${this.apiUrl}/${logementMasqueId}/photos/lister`, {
      method: 'GET',
    });
  }

  async creerPhotoPourLogement(
    logementMasqueId: string,
    photoDTO: PhotoDTO
  ): Promise<PhotoDTO> {
    return fetchWithHandling<PhotoDTO>(`${this.apiUrl}/${logementMasqueId}/photos/ajouter`, {
      method: 'POST',
      body: JSON.stringify(photoDTO),
    });
  }

  async obtenirPhotoPourLogement(
    logementMasqueId: string,
    photoMasqueId: string
  ): Promise<PhotoDTO> {
    return fetchWithHandling<PhotoDTO>(`${this.apiUrl}/${logementMasqueId}/photos/${photoMasqueId}/obtenir`, {
      method: 'GET',
    });
  }
  async obtenirPhotoPrincipalePourLogement(
    logementMasqueId: string,
  ): Promise<PhotoDTO> {
    return fetchWithHandling<PhotoDTO>(`${this.apiUrl}/${logementMasqueId}/photos/principale`, {
      method: 'GET',
    });
  }

  async modifierPhotoPourLogement(
    logementMasqueId: string,
    photoMasqueId: string,
    photoDTO: PhotoDTO
  ): Promise<PhotoDTO> {
    return fetchWithHandling<PhotoDTO>(`${this.apiUrl}/${logementMasqueId}/photos/${photoMasqueId}/modifier`, {
      method: 'PATCH',
      body: JSON.stringify(photoDTO),
    });
  }

  async supprimerPhotoPourLogement(
    logementMasqueId: string,
    photoMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/photos/${photoMasqueId}/supprimer`, {
      method: 'DELETE',
    });
  }
}
