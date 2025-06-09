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
    return fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${masqueId}`, {
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
    // tu peux ajouter ici un cache local si besoin
    return created;
  }

}
