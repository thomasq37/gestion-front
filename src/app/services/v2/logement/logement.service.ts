import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { LogementDTO } from "../../../models/v2/entites/Logement/LogementDTO.model";
import { fetchWithHandling } from "../http-helpers";
import { SuccessResponse } from "../../../models/v2/exception/SuccessResponse.model";
import { LogementVueEnsembleDTO } from "../../../models/v2/entites/Logement/LogementVueEnsembleDTO.model";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {AdresseDTO} from "../../../models/v2/entites/Adresse/AdresseDTO.model";

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  private apiUrl = `${environment.apiUrl}/logements`;

  // --- Cache local en mémoire ---
  private logementCache: Map<string, LogementDTO> = new Map();

  /**
   * Crée un logement (POST)
   */
  async creerLogement(): Promise<LogementDTO> {
    return fetchWithHandling<LogementDTO>(`${this.apiUrl}/ajouter`, {
      method: 'POST',
    });
  }

  /**
   * Liste tous les logements (GET)
   */
  async listerLogements(): Promise<LogementDTO[]> {
    return fetchWithHandling<LogementDTO[]>(`${this.apiUrl}/lister`, {
      method: 'GET',
    });
  }

  /**
   * Liste des logements en vue d’ensemble (GET)
   */
  async listerLogementsVueEnsemble(): Promise<LogementVueEnsembleDTO[]> {
    return fetchWithHandling<LogementDTO[]>(`${this.apiUrl}/lister/vue-ensemble`, {
      method: 'GET',
    });
  }

  /**
   * Récupère un logement en cache si disponible, sinon via l'API (GET)
   * @param logementMasqueId
   * @param forceRefresh si true, force l'appel API même si le cache est rempli
   */
  async obtenirLogement(logementMasqueId: string, forceRefresh = false): Promise<LogementDTO> {
    if (!forceRefresh) {
      const cached = this.logementCache.get(logementMasqueId);
      if (cached) {
        console.log("logement recupere en cache")
        return cached;
      }
    }

    const logement = await fetchWithHandling<LogementDTO>(`${this.apiUrl}/${logementMasqueId}/obtenir`, {
      method: 'GET',
    });
    console.log("logement mis en cache")

    this.logementCache.set(logementMasqueId, logement);
    return logement;
  }

  /**
   * Supprime un logement et invalide son cache (DELETE)
   * @param logementMasqueId
   */
  async supprimerLogement(logementMasqueId: string): Promise<SuccessResponse> {
    const result = await fetchWithHandling<SuccessResponse>(`${this.apiUrl}/${logementMasqueId}/supprimer`, {
      method: 'DELETE',
    });

    this.invalidateLogement(logementMasqueId);
    return result;
  }

  /**
   * Invalide un logement spécifique dans le cache
   * @param logementMasqueId
   */
  invalidateLogement(logementMasqueId: string): void {
    this.logementCache.delete(logementMasqueId);
  }

  /**
   * Vide complètement le cache
   */
  clearCache(): void {
    this.logementCache.clear();
  }

  mettreAJourPeriodeDansLogement(logementMasqueId: string, periode: PeriodeDeLocationDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.periodesDeLocation) return;

    const index = logement.periodesDeLocation.findIndex(p => p.masqueId === periode.masqueId);
    if (index !== -1) {
      logement.periodesDeLocation[index] = periode;
    } else {
      logement.periodesDeLocation.push(periode);
    }
  }

  supprimerPeriodeDansLogement(logementMasqueId: string, periodeMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement || !logement.periodesDeLocation) return;

    logement.periodesDeLocation = logement.periodesDeLocation.filter(
      p => p.masqueId !== periodeMasqueId
    );
  }

  mettreAJourCaracteristiquesDansLogement(logementMasqueId: string, dto: CaracteristiquesDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.caracteristiques = dto;
  }

  supprimerCaracteristiquesDansLogement(logementMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.caracteristiques = undefined;
  }
  mettreAJourAdresseDansLogement(logementMasqueId: string, dto: AdresseDTO): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.adresse = dto;
  }

  supprimerAdresseDansLogement(logementMasqueId: string): void {
    const logement = this.logementCache.get(logementMasqueId);
    if (!logement) return;
    logement.adresse = undefined;
  }


  getLogementDepuisCache(logementMasqueId: string): LogementDTO | undefined {
    return this.logementCache.get(logementMasqueId);
  }
}
