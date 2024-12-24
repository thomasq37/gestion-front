import { Component, OnInit } from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {LogementService} from "../../../services/v2/logement/logement.service";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {Router} from "@angular/router";
import {FunctionsUtil} from "../util/functions-util";
@Component({
  selector: 'app-logements',
  templateUrl: './logements.component.html',
  styleUrls: ['./logements.component.scss'],
})
export class LogementsComponent implements OnInit {
  logements: LogementDTO[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private logementService: LogementService
  , private router: Router) {}

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
      this.logements.sort((a, b) => {
        const dateAchatA = a.caracteristiques?.dateAchat ? new Date(a.caracteristiques.dateAchat).getTime() : 0;
        const dateAchatB = b.caracteristiques?.dateAchat ? new Date(b.caracteristiques.dateAchat).getTime() : 0;
        return dateAchatB - dateAchatA;
      });

      this.logements.forEach(logement => {
        logement.periodesDeLocation.sort((a, b) => {
          const dateA = new Date(a.dateDeDebut).getTime();
          const dateB = new Date(b.dateDeDebut).getTime();
          return dateB - dateA;
        });
      });
      this.loading = false;
    }
  }
  getBalconOuTerrasse(caracteristiques: CaracteristiquesDTO): string {
    if (caracteristiques?.balconOuTerrasse) {
      return caracteristiques.typeDeLogement === 'APPARTEMENT' ? '• Balcon(s)' : '• Terrasse(s)';
    }
    return '';
  }

  getTarifActuel(periodesDeLocation: PeriodeDeLocationDTO[]): string {
    return FunctionsUtil.getTarifActuel(periodesDeLocation);
  }

  creerLogement() {
    this.logementService.creerLogement().then(r =>
    this.router.navigate(['/logements', r.masqueId]));
  }
}
