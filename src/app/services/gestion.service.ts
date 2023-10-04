import { Injectable } from '@angular/core';
import {Frais, TypeFrais, AdresseDTO, Appartement, PeriodLocation} from "../models/gestion";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAppartements  = this.apiUrl + '/api/appartements/'
  private urlAppartementOverview  = this.urlAppartements +  'adresses'
  private urlTypeFrais = this.apiUrl + '/api/type-frais/'

  constructor(private http: HttpClient) { }

  // APPARTEMENT
  obtenirToutesLesAdressesAppartements(): Observable<AdresseDTO[]> {
    return this.http.get<AdresseDTO[]>(this.urlAppartementOverview);
  }
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
    return this.http.put(this.urlAppartements + 'modifier/' + appartement.id, appartement);
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

  ajouterUnFraisPourPeriode(appartementId: number, periodeId: number, nouveauFrais: Frais) : Observable<any> {
    console.log(appartementId)
    console.log(periodeId)
    console.log(nouveauFrais)
    return this.http.post(this.urlAppartements + appartementId + "/periodes/" + periodeId + "/frais", nouveauFrais)

  }
}
