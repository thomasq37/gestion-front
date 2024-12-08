import { Component } from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {LogementService} from "../../../services/v2/logement/logement.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.scss']
})
export class LogementComponent {
  logement!: LogementDTO;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private logementService: LogementService) {}

  ngOnInit(): void {
    const masqueId = this.route.snapshot.paramMap.get('masqueId');
    if (masqueId) {
      this.obtenirLogement(masqueId);
    } else {
      this.error = 'Aucun identifiant de logement fourni.';
    }
  }

  async obtenirLogement(masqueId: string): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.logement = await this.logementService.obtenirLogement(masqueId);
    } catch (err) {
      this.error = 'Erreur lors du chargement des logements.';
    } finally {
      this.loading = false;
    }
  }
}
