// src/app/services/mistralai.service.ts
import { Injectable } from '@angular/core';
import MistralClient from '@mistralai/mistralai';

@Injectable({
  providedIn: 'root'
})
export class MistralAiService {
  private client: MistralClient;

  constructor() {
    // Assurez-vous que votre clé API est stockée de manière sécurisée et non en texte brut dans vos fichiers de code.
    const apiKey = "MJYoqgwhUSLjQk9oHbpuSsEvkEecfFez"
    this.client = new MistralClient(apiKey);
  }

  async chatWithMistral(question: string): Promise<string> {
    try {
      const chatResponse = await this.client.chat({
        model: 'mistral-medium',
        messages: [{ role: 'user', content: question }]
      });

      return chatResponse.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la communication avec MistralAI:', error);
      throw error;
    }
  }
}
