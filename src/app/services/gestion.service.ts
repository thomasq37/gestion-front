import { Injectable } from '@angular/core';
import {Frais, TypeFrais, Appartement, PeriodLocation, Contact, AppUserDTO} from "../models/gestion";
import { Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAppartements  = this.apiUrl + '/appartements/'
  contactAddedSubject = new Subject<Contact>();
  contactUpdatedSubject = new Subject<Contact>();
  fraisAddedSubject = new Subject<Frais>();
  fraisUpdatedSubject = new Subject<Frais>();
  periodeAddedSubject = new Subject<PeriodLocation>();
  periodeUpdatedSubject = new Subject<PeriodLocation>();

  constructor(private http: HttpClient) { }

  // ---------------------- UTILISATEURS ---------------------- //

  obtenirAdressesAppartementsParUserId(userId: string | null): Observable<Appartement[]> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements`;
    return this.http.get<Appartement[]>(url)
  }

  // ---------------------- APPARTEMENTS ---------------------- //

  getAppartmentByUserIdAndApartmentId(userId: string | null, apartmentId: number): Observable<Appartement> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${apartmentId}`;
    return this.http.get<Appartement>(url);
  }


  // ---------------------- CONTACTS ---------------------- //


  obtenirContactsPourAppartement(userId: number | null, appartementId: number): Observable<Contact[]>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/contacts`;
    return this.http.get<Contact[]>(url)
  }

  ajouterUnContactPourAppartement(userId: number | null, appartementId: number | null, nouveauContact: Contact): Observable<Contact>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/contacts`;
    return this.http.post<Contact>(url, nouveauContact)
  }

  mettreAJourUnContactPourAppartement(userId: number | null, appartementId: number | null, contactId: number | undefined, modifieContact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/contacts/${contactId}`;
    return this.http.put<Contact>(url, modifieContact)
  }

  supprimerUnContactPourAppartement(userId: number | null, appartementId: number | null, contactId: number | undefined): Observable<Object> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/contacts/${contactId}`;
    return this.http.delete(url);
  }

  // ---------------------- FRAIS ---------------------- //

  obtenirFraisFixePourAppartement(userId: number | null, appartementId: number): Observable<Frais[]> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/frais`;
    return this.http.get<Frais[]>(url)
  }

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

  obtenirPeriodeLocationPourAppartement(userId: number | null, appartementId: number) : Observable<PeriodLocation[]> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes`;
    return this.http.get<PeriodLocation[]>(url)
  }

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


  obtenirFraisFixePourPeriode(userId: number | null, appartementId: number, periodeId): Observable<Frais[]> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}/frais`;
    return this.http.get<Frais[]>(url)
  }

  ajouterUnFraisFixePourPeriode(userId: number | null, appartementId: number | null, periodeId,  nouveauFrais: Frais) :Observable<Frais>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}/frais`;
    return this.http.post<Frais>(url, nouveauFrais)
  }

  mettreAJourUnFraisPourPeriode(userId: number | null, appartementId: number | null, periodeId: number, fraisId: number | null, modifieFrais: Frais) :Observable<any>{
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/periodes/${periodeId}/frais/${fraisId}`;
    return this.http.put<Frais>(url, modifieFrais)
  }

  // ---------------------- TYPE FRAIS ---------------------- //

  obtenirTousLesTypesDeFrais(): Observable<TypeFrais[]>{
    const url = `${this.apiUrl}/type-frais/liste`;
    return this.http.get<TypeFrais[]>(url);
  }

  mettreAJourUnAppartementPourUtilisateur(userId: number | null, appartementId: number | null, appartModifie: Appartement): Observable<Appartement> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}`;
    return this.http.put<Appartement>(url, appartModifie);
  }

  // ---------------------- GESTIONNAIRES ---------------------- //

  obtenirGestionnairesPourAppartement(userId: number | null, appartementId: number) : Observable<AppUserDTO[]> {
    const url = `${this.apiUrl}/utilisateurs/${userId}/appartements/${appartementId}/gestionnaires`;
    return this.http.get<AppUserDTO[]>(url)
  }


  // ---------------------- PAYS ---------------------- //

  obtenirListePays(): Observable<string[]> {
    const url = `${this.apiUrl}/pays`;
    return this.http.get<string[]>(url);
  }
  // PAS A JOUR

  obtenirUnAppartementParId(id: number): Observable<Appartement>{
    return this.http.get<Appartement>(this.urlAppartements + id)
  }
  supprimerUnAppartement(appartementId: number): Observable<any> {
    return this.http.delete(this.urlAppartements + appartementId, { responseType: 'text' });
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
}
