import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // URL de l'API GPT
  private apiKey = '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'; // Remplacez par votre clé API

  constructor(private http: HttpClient) { }

  getGptResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: "gpt-4",
      messages: [{"role": "user", "content": "Donne moi le bareme des impot en france en 2024 pour les revenus de 2023, regarde sur internet"}],
      max_tokens: 150,
      temperature: 0,
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
