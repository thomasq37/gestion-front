import { Component } from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {LogementService} from "../../../services/v2/logement/logement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {LocataireDTO} from "../../../models/v2/entites/Locataire/LocataireDTO.model";
import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {FunctionsUtil} from "../util/functions-util";

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.scss']
})
export class LogementComponent {
  logement!: LogementDTO;
  loading = false;
  error: string | null = null;
  menuItems = ['Adresse', 'Caractéristiques', 'Frais fixes', 'Périodes de locations', 'Locataires', 'Contacts', 'Supprimer'];
  menuPeriodesDeLocation = ['Frais périodes de location'];
  activeIndexPeriodeDeLocation = 0;
  activeIndex = 0;
  periodeActuelle: PeriodeDeLocationDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logementService: LogementService) {}

  ngOnInit(): void {
    const logementMasqueId = this.route.snapshot.paramMap.get('logementMasqueId');
    if (logementMasqueId) {
      this.obtenirLogement(logementMasqueId);
    } else {
      this.error = 'Aucun identifiant de logement fourni.';
    }
    this.route.queryParams.subscribe(params => {
      const tabIndex = +params['tab']; // Convertir en nombre
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < this.menuItems.length) {
        this.activeIndex = tabIndex;
      }
    });
  }

  async obtenirLogement(logementMasqueId: string): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.logement = await this.logementService.obtenirLogement(logementMasqueId);
    } catch (err) {
      this.error = 'Erreur lors du chargement des logements.';
    } finally {
      this.loading = false;
    }
  }
  getBalconOuTerrasse(caracteristiques: CaracteristiquesDTO): string {
    if (caracteristiques?.balconOuTerrasse) {
      return caracteristiques.typeDeLogement === 'APPARTEMENT' ? 'Balcon(s)' : 'Terrasse(s)';
    }
    return '';
  }
  setActive(index: number): void {
    this.activeIndex = index;
    this.periodeActuelle = null
  }

  getTarifActuel(periodesDeLocation: PeriodeDeLocationDTO[]): string {
    return FunctionsUtil.getTarifActuel(periodesDeLocation);
  }
  getLocataires(): LocataireDTO[] {
    const locatairesSet = new Set<LocataireDTO>();
    this.logement.periodesDeLocation.forEach(periode => {
      if (periode.locataires) {
        periode.locataires.forEach(locataire => locatairesSet.add(locataire));
      }
    });
    return Array.from(locatairesSet);
  }

  supprimerLogement(logementMasqueId: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer ce logement ?');
    if (confirmed) {
      this.logementService.supprimerLogement(logementMasqueId).then(() => {
        this.router.navigate(['/logements']);
      }).catch(error => {
        console.error('Erreur lors de la suppression du logement:', error);
      });
    } else {
      console.log('Suppression annulée');
    }
  }
  onPeriodeSelectionnee(periode: PeriodeDeLocationDTO) {
    this.periodeActuelle = periode;
  }
}
