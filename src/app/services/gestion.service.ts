import { Injectable } from '@angular/core';
import {Appartement} from "../models/appartement";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private apiUrl = '/api/appartements'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAppartements(): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(this.apiUrl);
  }
}
