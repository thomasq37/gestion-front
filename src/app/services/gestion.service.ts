import { Injectable } from '@angular/core';
import {
  Frais,
  TypeFrais,
  Appartement,
  PeriodLocation,
  Contact,
  AppUserDTO,
  Pays,
  AppartementCCDTO
} from "../models/gestion";
import {PageableResponse} from "../models/pageable";

import { Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {authFetch} from "./http-helpers";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAppartements  = this.apiUrl + '/appartements/'
  contactAddedSubject = new Subject<Contact>();
  contactUpdatedSubject = new Subject<Contact>();
  gestionnaireAddedSubject = new Subject<AppUserDTO>()
  gestionnaireUpdatedSubject = new Subject<AppUserDTO>()
  fraisAddedSubject = new Subject<Frais>();
  fraisUpdatedSubject = new Subject<Frais>();
  periodeAddedSubject = new Subject<PeriodLocation>();
  periodeUpdatedSubject = new Subject<PeriodLocation>();

  constructor(private http: HttpClient) { }



  // ---------------------- CONTACTS ---------------------- //

  // ---------------------- FRAIS ---------------------- //



  ajouterUnFraisFixePourAppartement(userId: number | null, appartementId: number | null, nouveauFrais: Frais) :Observable<Frais>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/frais`;
    return this.http.post<Frais>(url, nouveauFrais)
  }

  supprimerUnFraisPourAppartement(userId: number | null, appartementId: number | null, fraisId: number | undefined): Observable<Object> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/frais/${fraisId}`;
    return this.http.delete(url);
  }

  mettreAJourUnFraisPourAppartement(userId: number | null, appartementId: number | null, fraisId: number | undefined, modifieFrais: Frais): Observable<Frais> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/frais/${fraisId}`;
    return this.http.put<Frais>(url, modifieFrais)
  }

  // ---------------------- PERIODES ---------------------- //



  ajouterUnePeriodeLocationPourAppartement(userId: number | null, appartementId: number | null, newPeriode: PeriodLocation) : Observable<PeriodLocation> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes`;
    return this.http.post<PeriodLocation>(url, newPeriode)
  }

  mettreAJourUnePeriodePourAppartement(userId: number | null, appartementId: number | null, periodeId: number | undefined, modifiePeriode: PeriodLocation): Observable<any> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}`;
    return this.http.put(url, modifiePeriode)
  }

  supprimerUnePeriodePourAppartement(userId: number | null, appartementId: number | null, periodeId: number | undefined) {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}`;
    return this.http.delete(url);
  }

  // ---------------------- PERIODES-FRAIS ---------------------- //
  ajouterUnFraisFixePourPeriode(userId: number | null, appartementId: number | null, periodeId,  nouveauFrais: Frais) :Observable<Frais>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}/frais`;
    return this.http.post<Frais>(url, nouveauFrais)
  }

  mettreAJourUnFraisPourPeriode(userId: number | null, appartementId: number | null, periodeId: number, fraisId: number | null, modifieFrais: Frais) :Observable<any>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}/frais/${fraisId}`;
    return this.http.put<Frais>(url, modifieFrais)
  }

  // ---------------------- TYPE FRAIS ---------------------- //

  mettreAJourUnAppartementPourUtilisateur(userId: number | null, appartementId: number | null, appartModifie: Appartement): Observable<Appartement> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}`;
    return this.http.put<Appartement>(url, appartModifie);
  }

  // ---------------------- GESTIONNAIRES ---------------------- //

  obtenirGestionnairesPourAppartement(userId: number | null, appartementId: number) : Observable<AppUserDTO[]> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/gestionnaires`;
    return this.http.get<AppUserDTO[]>(url)
  }

  mettreAJourUnGestionnairePourAppartement(userId: number | null, appartementId: number | null, gestionnaireId: number | undefined, modifieGestionnaire: AppUserDTO): Observable<AppUserDTO> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/gestionnaires/${gestionnaireId}`;
    return this.http.put<AppUserDTO>(url, modifieGestionnaire)
  }

  supprimerUnGestionnairePourAppartement(userId: number, appartementId: number, gestionnaireId) {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/gestionnaires/${gestionnaireId}`;
    return this.http.delete(url);
  }
  // ---------------------- PAYS ---------------------- //

  // PAS A JOUR
  supprimerUnAppartement(appartement: Appartement): Observable<any> {
    const url = `${this.apiUrl}/utilisateurs/${appartement.appUser.id}/appartements/${appartement.id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  ajouterAppartement(appartement: Appartement): Observable<any> {
    const url = `${this.apiUrl}/utilisateurs/${appartement.appUser.id}/appartements/ajouter`;
    return this.http.post<Appartement[]>(url, appartement)
  }
  modifierAppartement(appartement: Appartement): Observable<any> {
    const url = `${this.apiUrl}/utilisateurs/${appartement.appUser.id}/appartements/${appartement.id}/gestionnaires`;
    return this.http.put<Appartement[]>(url, appartement)
  }

  // PERIODES

  ajouterUnFraisPourPeriode(periodeId: number, nouveauFrais: Frais) : Observable<any> {
    return this.http.post(this.urlAppartements + "periodes/" + periodeId + "/frais", nouveauFrais)
  }


  supprimerUnFraisPourPeriode(periodeId: number, fraisId: number): Observable<any> {
    return this.http.delete(this.urlAppartements  +"periodes/" + periodeId + "/frais/" + fraisId);
  }

  // utilise v2 GET
  async obtenirAdressesAppartementsParUserId(): Promise<Appartement[]> {
    const response = await authFetch(`${this.apiUrl}/appartements/adresses`);
    return await response.json();
  }
  async obtenirCCAppartementsParUserId(): Promise<AppartementCCDTO[]> {
    const response = await authFetch(`${this.apiUrl}/appartements/chiffres-cles`);
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

  // utilise v2 DELETE //
  async supprimerUnContactPourAppartement(appartementId: number, contactId: number): Promise<string> {
    const response = await authFetch(`${this.apiUrl}/appartements/${appartementId}/contacts/${contactId}`, {
      method: 'DELETE',
    });
    return await response.text();
  }
}
