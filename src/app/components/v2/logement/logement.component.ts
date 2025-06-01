import {Component, OnInit} from '@angular/core';
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
  styleUrls: ['./logement.component.scss'],
})
export class LogementComponent implements OnInit {
  logement!: LogementDTO;
  loading = false;
  error: string | null = null;
  menuItems = ['Statistiques', 'Adresse', 'Caractéristiques', 'Frais fixes', 'Périodes de locations', 'Locataires', 'Contacts', 'Alertes', 'Documents', 'Supprimer'];
  menuPeriodesDeLocation = ['Frais périodes de location'];
  activeIndexPeriodeDeLocation = 0;
  activeIndex = 0;
  periodeActuelle: PeriodeDeLocationDTO | null = null;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer ce logement ?"
  isModalVisible = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logementService: LogementService) {}

  ngOnInit(): void {
    const logementMasqueId = this.route.snapshot.paramMap.get('logementMasqueId');
    if (logementMasqueId) {
      this.obtenirLogement(logementMasqueId).then(() => {
        // Une fois que le logement est chargé, on traite les queryParams
        if(this.logement.caracteristiques.typeDeResidence === 'PRINCIPALE'){
          this.activeIndex = 3
          this.menuItems = this.menuItems.filter(item => item !== 'Périodes de locations' && item !== 'Locataires');
        }
        const periodeMasqueId = this.route.snapshot.queryParamMap.get('periodeMasqueId');
        if (periodeMasqueId && this.logement?.periodesDeLocation?.length > 0) {
          const periode = this.logement.periodesDeLocation.find(p => p.masqueId === periodeMasqueId);
          if (periode) {
            this.periodeActuelle = periode;
          }
          this.router.navigate([], {
            queryParams: { periodeMasqueId: null },
            queryParamsHandling: 'merge',
            replaceUrl: true
          });
        }
      });
    } else {
      this.error = 'Aucun identifiant de logement fourni.';
    }

    this.route.queryParams.subscribe(params => {
      const tabIndex = +params['tab'];
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: index },
      queryParamsHandling: 'merge',
    });
  }

  getTarifActuel(periodesDeLocation: PeriodeDeLocationDTO[]): string {
    return FunctionsUtil.getTarifActuel(periodesDeLocation);
  }
  getLocataires(): LocataireDTO[] {
    const locatairesSet = new Set<LocataireDTO>();
    const periodesTriees = this.logement.periodesDeLocation.sort((a, b) =>
      new Date(b.dateDeDebut).getTime() - new Date(a.dateDeDebut).getTime()
    );
    periodesTriees.forEach(periode => {
      if (periode.locataires) {
        periode.locataires.forEach(locataire => locatairesSet.add(locataire));
      }
    });
    return Array.from(locatairesSet);
  }


  supprimerLogement() {
    this.logementService.supprimerLogement(this.logement.masqueId).then(() => {
      this.router.navigate(['/logements']);
    }).catch(error => {
      console.error('Erreur lors de la suppression du logement:', error);
    });
  }
  onPeriodeSelectionnee(periode: PeriodeDeLocationDTO) {
    this.periodeActuelle = periode;
  }
  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  confirmDelete(): void {
    this.isModalVisible = false;
    this.supprimerLogement()
  }
  getTexteDureeSejour(logement: any): string | null {
    return FunctionsUtil.getDureeEtJoursRestantsJournaliere(logement.periodesDeLocation);
  }
}
