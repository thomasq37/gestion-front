import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { fetchWithHandling } from '../http-helpers';
import { SuccessResponse } from '../../../models/v2/exception/SuccessResponse.model';
import {DocumentDTO} from "../../../models/v2/entites/Document/DocumentDTO.model";

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/logements`;

  /**
   * Liste tous les documents associés à un logement donné.
   */
  async listerDocuments(logementMasqueId: string): Promise<DocumentDTO[]> {
    return fetchWithHandling<DocumentDTO[]>(
      `${this.apiUrl}/${logementMasqueId}/documents/lister`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Ajoute un nouveau document pour un logement donné.
   */
  async ajouterDocument(
    logementMasqueId: string,
    documentDTO: DocumentDTO
  ): Promise<DocumentDTO> {
    return fetchWithHandling<DocumentDTO>(
      `${this.apiUrl}/${logementMasqueId}/documents/ajouter`,
      {
        method: 'POST',
        body: JSON.stringify(documentDTO),
      }
    );
  }

  /**
   * Récupère les détails d'un document spécifique.
   */
  async obtenirDocument(
    documentMasqueId: string
  ): Promise<DocumentDTO> {
    return fetchWithHandling<DocumentDTO>(
      `${this.apiUrl}/documents/${documentMasqueId}/obtenir`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Supprime un document pour un logement donné.
   */
  async supprimerDocument(
    logementMasqueId: string,
    documentMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(
      `${this.apiUrl}/${logementMasqueId}/documents/${documentMasqueId}/supprimer`,
      {
        method: 'DELETE',
      }
    );
  }

  /**
   * Associe un document existant à un logement.
   */
  async associerDocumentExistant(
    logementMasqueId: string,
    documentMasqueId: string
  ): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(
      `${this.apiUrl}/${logementMasqueId}/documents/associer/${documentMasqueId}`,
      {
        method: 'POST',
      }
    );
  }

  /**
   * Liste les documents disponibles pour l'utilisateur connecté.
   */
  async listerDocumentsDisponibles(
    logementMasqueId: string
  ): Promise<DocumentDTO[]> {
    return fetchWithHandling<DocumentDTO[]>(
      `${this.apiUrl}/${logementMasqueId}/documents/disponibles`,
      {
        method: 'GET',
      }
    );
  }
}
