import { Injectable } from '@angular/core';
import {Appartement, Frais, TypeFrais} from "../models/appartement";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAppartement  = this.apiUrl + '/api/appartements/'
  private urlFrais = this.apiUrl + '/api/frais/'
  private urlTypeFrais = this.apiUrl + '/api/type-frais/'
  constructor(private http: HttpClient) { }

  getAppartements(): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(this.urlAppartement + 'liste');
  }
  addAppartement(appartement: Appartement): Observable<any> {
    return this.http.post(this.urlAppartement + 'ajouter', appartement)
  }
  updateAppartement(appartement: Appartement): Observable<any> {
    return this.http.put(this.urlAppartement + 'modifier/' + appartement.id, appartement);
  }
  getAppartementById(appartementId: number): Observable<Appartement> {
    return this.http.get<Appartement>(this.urlAppartement + appartementId)
  }
  getRentabiliteNetteByAppartementId(appartementId: number): Observable<number> {
    return this.http.get<number>(this.urlAppartement + appartementId + '/calcul-rentabilite')
  }
  getMoyenneBeneficesByAppartementId(appartementId: number): Observable<number> {
    return this.http.get<number>(this.urlAppartement + appartementId + '/moyenne-benefices')
  }
  getTauxVacancesLocativesByAppartementId(appartementId: number): Observable<number> {
    return this.http.get<number>(this.urlAppartement + appartementId + '/taux-vacances-locatives')
  }

  getFraisByAppartementId(appartementId: number): Observable<Frais[]>{
    return this.http.get<Frais[]>(this.urlFrais + 'appartement/' + appartementId)
  }
  addFraisToAppartement(frais: Frais): Observable<any>{
    return this.http.post(this.urlFrais + 'ajouter', frais)
  }


  getTypesFrais(): Observable<TypeFrais[]>{
    return this.http.get<TypeFrais[]>(this.urlTypeFrais + 'liste');
  }
}
