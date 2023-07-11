import { Injectable } from '@angular/core';
import {Appartement} from "../models/appartement";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private apiUrl = `${environment.apiUrl}/appartements`;
  constructor(private http: HttpClient) { }

  getAppartements(): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(this.apiUrl);
  }
}
