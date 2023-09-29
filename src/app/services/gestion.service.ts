import { Injectable } from '@angular/core';
import {Appartement, Frais, Mouvement, TypeFrais} from "../models/appartement";
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
  private urlMouvements = this.apiUrl + '/api/mouvements/'

  constructor(private http: HttpClient) { }

  // APPARTEMENT
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
  deleteOneAppartement(appartementId: number): Observable<any> {
    return this.http.delete(this.urlAppartement + appartementId, { responseType: 'text' });
  }

  // FRAIS
  getFraisByAppartementId(appartementId: number): Observable<Frais[]>{
    return this.http.get<Frais[]>(this.urlFrais + 'appartement/' + appartementId)
  }
  addFraisToAppartement(frais: Frais): Observable<any>{
    return this.http.post(this.urlFrais + 'ajouter', frais)
  }
  updateFrais(frais: Frais): Observable<any> {
    return this.http.put(this.urlFrais + 'modifier/' + frais.id, frais);
  }
  getFraisById(fraisId: number): Observable<Frais> {
    return this.http.get<Frais>(this.urlFrais + fraisId)
  }
  deleteOneFrais(fraisId: number): Observable<any> {
    return this.http.delete(this.urlFrais + fraisId, { responseType: 'text' });
  }

  // TYPE FRAIS
  getTypesFrais(): Observable<TypeFrais[]>{
    return this.http.get<TypeFrais[]>(this.urlTypeFrais + 'liste');
  }

  getTypeFrais(typeFraisId: number | undefined): Observable<TypeFrais>{
    return this.http.get<TypeFrais>(this.urlTypeFrais + typeFraisId);
  }

  // MOUVEMENTS
  getMouvementById(mouvementId: number): Observable<Mouvement> {
    return this.http.get<Mouvement>(this.urlMouvements + mouvementId)
  }
  updateMouvement(mouvement: Mouvement): Observable<any> {
    return this.http.put(this.urlMouvements + 'modifier/' + mouvement.id, mouvement);
  }

  deleteOneMouvement(mouvementId: number): Observable<any> {
    return this.http.delete(this.urlMouvements + mouvementId, { responseType: 'text' });
  }

  addMouvementToAppartement(nouveauMouvement: Mouvement) {
    return this.http.post(this.urlMouvements + 'ajouter', nouveauMouvement)
  }
}
