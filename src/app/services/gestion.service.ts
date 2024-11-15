import { Injectable } from '@angular/core';
import {
  Frais,
  TypeFrais,
  Appartement,
  PeriodLocation,
  Contact,
  Pays,
  AppartementCCDTO
} from "../models/gestion";
import {PageableResponse} from "../models/pageable";
import {environment} from "../../environments/environment";
import {authFetch} from "./http-helpers";
import {Subject} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.apiUrl}`;
  contactAddedSubject = new Subject<Contact>();
  contactUpdatedSubject = new Subject<Contact>();


  fraisAddedSubject = new Subject<Frais>();
  fraisUpdatedSubject = new Subject<Frais>();
  periodeAddedSubject = new Subject<PeriodLocation>();
  periodeUpdatedSubject = new Subject<PeriodLocation>();

  constructor() { }

  // utilise v2 GET
  async obtenirAdressesAppartementsParUserId(): Promise<Appartement[]> {
    const response = await authFetch(`${this.apiUrl}/appartements/adresses`);
    return await response.json();
  }
  async obtenirCCAppartementsParUserId(): Promise<AppartementCCDTO[]> {
    const response = await authFetch(`${this.apiUrl}/appartements/chiffres-cles`);
    return await response.json();
  }
  async obtenirCCAppartementParId(apartmentId: number): Promise<AppartementCCDTO> {
    const response = await authFetch(`${this.apiUrl}/appartements/${apartmentId}/chiffres-cles`);
    return await response.json();
  }

  async obtenirAppartmentParUtilisateurIdEtAppartementId(apartmentId: number): Promise<Appartement> {
    const response = await authFetch(`${this.apiUrl}/appartements/${apartmentId}`);
    return await response.json();
  }
  async obtenirFraisFixePourAppartement(appartementId: number, currentPage: number): Promise<PageableResponse<Frais>> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('size', '5');

    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/frais?${params.toString()}`);
    return await response.json();
  }
  async obtenirPeriodeLocationPourAppartement(appartementId: number, currentPage: number): Promise<PageableResponse<PeriodLocation>> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('size', '5');

    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes?${params.toString()}`);
    return await response.json();
  }
  async obtenirTousLesTypesDeFrais(): Promise<TypeFrais[]>{
    const response = await authFetch(`${this.apiUrl}/type-frais/liste`);
    return await response.json();
  }
  async obtenirListePays(): Promise<Pays[]> {
    const response = await authFetch(`${this.apiUrl}/pays`);
    return await response.json();
  }
  async obtenirFraisFixePourPeriode(appartementId: number, periodeId, currentPage: number): Promise<PageableResponse<Frais>> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('size', '5');
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes/${periodeId}/frais?${params.toString()}`);
    return await response.json();
  }
  async obtenirContactsPourAppartement(appartementId: number): Promise<Contact[]>{
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/contacts`);
    return await response.json()
  }

  // utilise v2 POST
  async ajouterUnContactPourAppartement(appartementId: number, nouveauContact: Contact): Promise<Contact>{
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nouveauContact),
    });
    return await response.json();
  }
  async ajouterUnFraisFixePourAppartement(appartementId: number, nouveauFrais: Frais) :Promise<Frais>{
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/frais`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nouveauFrais),
    });
    return await response.json();
  }
  async ajouterUnFraisFixePourPeriode(appartementId: number, periodeId,  nouveauFrais: Frais) :Promise<Frais>{
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes/${periodeId}/frais`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nouveauFrais),
    });
    return await response.json();
  }
  async ajouterUnePeriodeLocationPourAppartement(appartementId: number, newPeriode: PeriodLocation) : Promise<PeriodLocation> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPeriode),
    });
    return await response.json();
  }
  async ajouterUnAppartementPourUtilisateur(appartement: Appartement): Promise<Appartement> {
    const response = await authFetch(`${this.apiUrl}/appartements/ajouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appartement),
    });
    return await response.json();
  }

  // utilise v2 PUT //
  async mettreAJourUnContactPourAppartement(appartementId: number, contactId: number, modifieContact: Contact): Promise<Contact> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifieContact),
    });
    return await response.json();
  }
  async mettreAJourUnFraisPourAppartement(appartementId: number, fraisId: number, modifieFrais: Frais): Promise<Frais> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/frais/${fraisId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifieFrais),
    });
    return await response.json();
  }
  async mettreAJourUnFraisPourPeriode(appartementId: number, periodeId: number, fraisId: number, modifieFrais: Frais) :Promise<Frais>{
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes/${periodeId}/frais/${fraisId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifieFrais),
    });
    return await response.json();
  }
  async mettreAJourUnePeriodePourAppartement(appartementId: number, periodeId: number, modifiePeriode: PeriodLocation): Promise<PeriodLocation> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes/${periodeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiePeriode),
    });
    return await response.json();
  }
  async mettreAJourUnAppartementPourUtilisateur(appartementId: number, appartModifie: Appartement): Promise<Appartement> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appartModifie),
    });
    return await response.json();
  }

  // utilise v2 DELETE //
  async supprimerUnContactPourAppartement(appartementId: number, contactId: number): Promise<string> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/contacts/${contactId}`, {
      method: 'DELETE',
    });
    return await response.text();
  }
  async supprimerUnFraisPourAppartement(appartementId: number, fraisId: number): Promise<string> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/frais/${fraisId}`, {
      method: 'DELETE',
    });
    return await response.text();
  }
  async supprimerUnePeriodePourAppartement(appartementId: number, periodeId: number): Promise<string> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/periodes/${periodeId}`, {
      method: 'DELETE',
    });
    return await response.text();

  }
  async supprimerUnAppartementPourUtilisateur(appartementId: number): Promise<string> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}`, {
      method: 'DELETE',
    });
    return await response.text();
  }
}
