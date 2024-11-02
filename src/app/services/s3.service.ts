import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private apiUrl = `${environment.apiUrl}/api/upload`;
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<Object> {
    const formData = new FormData();
    formData.append('file', file);

    // Corrige l'option responseType pour être explicitement de type text
    return this.http.post(this.apiUrl, formData, { responseType: 'text' as 'json' });
  }
}
