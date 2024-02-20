import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Mouvement} from "../models/mouvement.model";

// Assurez-vous que l'interface Mouvement correspond à la structure de votre objet Mouvement côté serveur


@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private apiUrl = `${environment.apiUrl}/mouvements`;

  constructor(private http: HttpClient) { }

  getAllMouvements(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.apiUrl);
  }

  getMouvementById(id: number): Observable<Mouvement> {
    return this.http.get<Mouvement>(`${this.apiUrl}/${id}`);
  }

  createMouvement(mouvement: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(this.apiUrl, mouvement);
  }

  updateMouvement(id: number, mouvementDetails: Mouvement): Observable<Mouvement> {
    return this.http.put<Mouvement>(`${this.apiUrl}/${id}`, mouvementDetails);
  }

  deleteMouvement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getResteAVivreParMois(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/reste-a-vivre`);
  }
}
