import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<Object> {
    const formData = new FormData();
    formData.append('file', file);

    // Corrige l'option responseType pour être explicitement de type text
    return this.http.post('/api/upload', formData, { responseType: 'text' as 'json' });
  }
}
