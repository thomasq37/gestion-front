import { Injectable } from '@angular/core';
import {Appartement} from "../models/appartement";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAppartement  = this.apiUrl + '/api/appartements/'
  constructor(private http: HttpClient) { }

  getAppartements(): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(this.urlAppartement + 'list');
  }
  getAppartementById(appartementId: number): Observable<Appartement> {
    return this.http.get<Appartement>(this.urlAppartement + appartementId)
  }
  getRentabiliteNetteByAppartementId(appartementId: number): Observable<number> {
    return this.http.post<number>(this.urlAppartement + appartementId + '/calcul-rentabilite', null)
  }
  getMoyenneBeneficesByAppartementId(appartementId: number): Observable<number> {
    return this.http.post<number>(this.urlAppartement + appartementId + '/moyenne-benefices', null)
  }
  getTauxVacancesLocativesByAppartementId(appartementId: number): Observable<number> {
    return this.http.get<number>(this.urlAppartement + appartementId + '/taux-vacances-locatives')
  }
}
