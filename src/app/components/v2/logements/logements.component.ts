import { Component, OnInit } from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {LogementService} from "../../../services/v2/logement/logement.service";
@Component({
  selector: 'app-logements',
  templateUrl: './logements.component.html',
  styleUrls: ['./logements.component.scss'],
})
export class LogementsComponent implements OnInit {
  logements: LogementDTO[] = [];
  loading = false;
  error: string | null = null;

  constructor(private logementService: LogementService) {}

  ngOnInit(): void {
    this.listerLogements();
  }

  async listerLogements(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.logements = await this.logementService.listerLogements();
    } catch (err) {
      this.error = 'Erreur lors du chargement des logements.';
    } finally {
      this.loading = false;
    }
  }
  getPhotoPrincipale(logement: LogementDTO): string | null {
    const photoPrincipale = logement.photos.find(photo => photo.isPrincipal);
    if (photoPrincipale && photoPrincipale.image) {
      return `data:image/jpeg;base64,${photoPrincipale.image}`;
    }
    return 'assets/img/v2/no-image.jpg';
  }
}
