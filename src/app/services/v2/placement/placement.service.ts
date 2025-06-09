import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { fetchWithHandling } from '../http-helpers';
import { PlacementVueEnsembleDTO } from '../../../models/v2/entites/Placement/PlacementVueEnsembleDTO.model';
import { SuccessResponse } from '../../../models/v2/exception/SuccessResponse.model';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {
  private apiUrl = `${environment.apiUrl}/placements`;

  async listerPlacements(): Promise<PlacementVueEnsembleDTO[]> {
    return fetchWithHandling<PlacementVueEnsembleDTO[]>(`${this.apiUrl}/lister`, {
      method: 'GET',
    });
  }

  async supprimerPlacement(masqueId: string): Promise<SuccessResponse> {
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${masqueId}/supprimer`, {
      method: 'DELETE',
    });
  }

  async creerPlacement(dto: PlacementVueEnsembleDTO): Promise<PlacementVueEnsembleDTO> {
    return fetchWithHandling<PlacementVueEnsembleDTO>(`${this.apiUrl}/ajouter`, {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  }

  async modifierPlacement(masqueId: string, dto: PlacementVueEnsembleDTO): Promise<PlacementVueEnsembleDTO> {
    return fetchWithHandling<PlacementVueEnsembleDTO>(`${this.apiUrl}/modifier/${masqueId}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
  }
  async creerEtMettreAJourCache(dto: PlacementVueEnsembleDTO): Promise<PlacementVueEnsembleDTO> {
    const created = await this.creerPlacement(dto);
    return created;
  }

  async modifierEtMettreAJourCache(masqueId: string, dto: PlacementVueEnsembleDTO): Promise<PlacementVueEnsembleDTO> {
    const updated = await this.modifierPlacement(masqueId, dto);
    return updated;
  }

  async supprimerEtMettreAJourCache(masqueId: string): Promise<void> {
    await this.supprimerPlacement(masqueId);
  }

  async obtenirPlacement(masqueId: string): Promise<PlacementVueEnsembleDTO> {
    return fetchWithHandling<PlacementVueEnsembleDTO>(`${this.apiUrl}/${masqueId}/obtenir`, {
      method: 'GET',
    });
  }
}
