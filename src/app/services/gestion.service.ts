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
  private urlTypeFrais = this.apiUrl + '/api/type-frais/'
  contactAddedSubject = new Subject<Contact>();
  contactUpdatedSubject = new Subject<Contact>();

  constructor(private http: HttpClient) { }

  // UTILISATEURS

  obtenirAdressesAppartementsParUserToken(userToken: string | null): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(this.apiUrl + '/utilisateurs/'+ userToken + "/appartements")
  }

  // APPARTEMENT

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

  // FRAIS

  ajouterUnFraisPourAppartement(appartementId: number, nouveauFrais: Frais): Observable<any>{
    return this.http.post(this.urlAppartements + appartementId + "/frais", nouveauFrais)
  }
  mettreAJourUnFraisPourAppartement(appartementId: number, modifieFrais: Frais): Observable<any> {
    return this.http.put(this.urlAppartements + appartementId + "/frais/" + modifieFrais.id, modifieFrais)
  }
  supprimerUnFraisPourAppartement(appartementId: number, fraisId: number): Observable<any> {
    return this.http.delete(this.urlAppartements + appartementId + "/frais/" + fraisId);
  }

  // TYPE FRAIS
  obtenirTousLesTypesDeFrais(): Observable<TypeFrais[]>{
    return this.http.get<TypeFrais[]>(this.urlTypeFrais + 'liste');
  }

  // PERIODES

  mettreAJourUnePeriodePourAppartement(appartementId: number, modifiePeriode: PeriodLocation): Observable<any> {
    return this.http.put(this.urlAppartements + appartementId + "/periodes/" + modifiePeriode.id, modifiePeriode)
  }

  supprimerUnePeriodePourAppartement(appartementId: number, periodeId: number) {
    return this.http.delete(this.urlAppartements + appartementId + "/periodes/" + periodeId);
  }

  ajouterUnePeriodePourAppartement(appartementId: number, newPeriode: PeriodLocation) : Observable<any> {
    return this.http.post(this.urlAppartements + appartementId + "/periodes", newPeriode)
  }

  ajouterUnFraisPourPeriode(periodeId: number, nouveauFrais: Frais) : Observable<any> {
    return this.http.post(this.urlAppartements + "periodes/" + periodeId + "/frais", nouveauFrais)
  }

  mettreAJourUnFraisPourPeriode(periodeId: number, modifieFrais: Frais) :Observable<any>{
    return this.http.put(this.urlAppartements +"periodes/" + periodeId + "/frais/" + modifieFrais.id, modifieFrais)
  }
  supprimerUnFraisPourPeriode(periodeId: number, fraisId: number): Observable<any> {
    return this.http.delete(this.urlAppartements  +"periodes/" + periodeId + "/frais/" + fraisId);
  }

  // CONTACTS

  obtenirContactsPourAppartement(appartementId: number): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.urlAppartements + appartementId + "/contacts")
  }
  ajouterUnContactPourAppartement(appartementId: number, nouveauContact: Contact): Observable<any>{
    return this.http.post(this.urlAppartements + appartementId + "/contacts", nouveauContact)
  }
  mettreAJourUnContactPourAppartement(appartementId: number, modifieContact: Contact): Observable<any> {
    return this.http.put(this.urlAppartements + appartementId + "/contacts/" + modifieContact.id, modifieContact)
  }

}
