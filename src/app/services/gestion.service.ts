import { Injectable } from '@angular/core';
import {Frais, TypeFrais, AdresseDTO, Appartement, PeriodLocation, Contact} from "../models/gestion";
import {BehaviorSubject, Observable, Subject} from "rxjs";
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

  // ---------------------- TYPE FRAIS ---------------------- //

  obtenirTousLesTypesDeFrais(): Observable<TypeFrais[]>{
    const url = `${this.apiUrl}/type-frais/liste`;
    return this.http.get<TypeFrais[]>(url);
  }

  // PAS A JOUR

  obtenirUnAppartementParId(id: number): Observable<Appartement>{
    return this.http.get<Appartement>(this.urlAppartements + id)
  }
  supprimerUnAppartement(appartementId: number): Observable<any> {
    return this.http.delete(this.urlAppartements + appartementId, { responseType: 'text' });
  }
  ajouterAppartement(appartement: Appartement): Observable<any> {
    return this.http.post(this.urlAppartements + 'ajouter', appartement)
  }
  modifierAppartement(appartement: Appartement): Observable<any> {
    return this.http.put(this.urlAppartements + appartement.id, appartement);
  }

  // PERIODES

  ajouterUnFraisPourPeriode(periodeId: number, nouveauFrais: Frais) : Observable<any> {
    return this.http.post(this.urlAppartements + "periodes/" + periodeId + "/frais", nouveauFrais)
  }

  mettreAJourUnFraisPourPeriode(periodeId: number, modifieFrais: Frais) :Observable<any>{
    return this.http.put(this.urlAppartements +"periodes/" + periodeId + "/frais/" + modifieFrais.id, modifieFrais)
  }
  supprimerUnFraisPourPeriode(periodeId: number, fraisId: number): Observable<any> {
    return this.http.delete(this.urlAppartements  +"periodes/" + periodeId + "/frais/" + fraisId);
  }
}
