import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private apiUrl = `${environment.apiUrl}/upload`;
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<Object> {
    const formData = new FormData();
    formData.append('file', file);

    // Corrige l'option responseType pour être explicitement de type text
    return this.http.post(this.apiUrl, formData, { responseType: 'text' as 'json' });
  }

  deleteFile(key: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${key}`, { responseType: 'text' as 'json' });
  }

  getFile(key: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${key}`, { responseType: 'blob' });
  }
}

