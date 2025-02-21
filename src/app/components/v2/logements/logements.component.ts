import { Component, OnInit } from '@angular/core';
import {LogementService} from "../../../services/v2/logement/logement.service";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {Router} from "@angular/router";
import {FunctionsUtil} from "../util/functions-util";
import {LogementVueEnsembleDTO} from "../../../models/v2/entites/Logement/LogementVueEnsembleDTO.model";
@Component({
  selector: 'app-logements',
  templateUrl: './logements.component.html',
  styleUrls: ['./logements.component.scss'],
})
export class LogementsComponent implements OnInit {
  logements: LogementVueEnsembleDTO[] = [];
  loading = false;
  error: string | null = null;
  protected statistiquesIsVisible: boolean = false;

  constructor(
    private logementService: LogementService
  , private router: Router) {}

  ngOnInit(): void {
    this.listerLogementsVueEnsemble();
  }

  async listerLogementsVueEnsemble(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.logements = await this.logementService.listerLogementsVueEnsemble();
    } catch (err) {
      this.error = 'Erreur lors du chargement des logements.';
    } finally {


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

  toggleStatistiques(event: Event) {
    event.preventDefault();
    this.statistiquesIsVisible = !this.statistiquesIsVisible
  }
}
