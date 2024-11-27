import { Injectable } from '@angular/core';
import {fetchWithHandling} from "../http-helpers";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeneriqueService {
  private apiUrl = `${environment.apiUrl}`;
  async listerElements<T>(apiEntiteUrl: string): Promise<T[]> {
    return fetchWithHandling<T[]>(`${this.apiUrl}/${apiEntiteUrl}/lister`, { method: 'GET' });
  }
}
