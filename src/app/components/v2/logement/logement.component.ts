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
  menuItems = ['Statistiques', 'Adresse', 'Caractéristiques', 'Frais fixes', 'Périodes de locations', 'Locataires', 'Contacts', 'Alertes', 'Documents', 'Crédit', 'Supprimer'];
  menuResidencePrincipaleItems = ['Statistiques', 'Adresse', 'Caractéristiques', 'Frais fixes', 'Contacts', 'Alertes', 'Documents', 'Crédit', 'Supprimer'];

  // Menu affiché (dynamique)
  displayedMenuItems: string[] = [];

  // Mapping des index affichés vers les index réels
  indexMapping: number[] = [];

  menuPeriodesDeLocation = ['Frais périodes de location'];
  menuCredit = ['Frais associés au crédit'];

  activeIndexPeriodeDeLocation = 0;
  activeIndexCredit = 0;

  activeIndex = 0;
  periodeActuelle: PeriodeDeLocationDTO | null = null;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer ce logement ?"
  isModalVisible = false;
  demandeAfficherFrais: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logementService: LogementService) {}

  ngOnInit(): void {
    const logementMasqueId = this.route.snapshot.paramMap.get('logementMasqueId');
    if (logementMasqueId) {
      this.obtenirLogement(logementMasqueId).then(() => {
        this.setupMenus();
        this.handleQueryParams();
      });
    } else {
      this.error = 'Aucun identifiant de logement fourni.';
    }

    this.route.queryParams.subscribe(params => {
      const tabIndex = +params['tab'];
      if (!isNaN(tabIndex) && tabIndex >= 0) {
        this.setActiveByRealIndex(tabIndex);
      }
    });
  }

  private setupMenus(): void {
    if (this.logement.caracteristiques.typeDeResidence === 'PRINCIPALE') {
      this.displayedMenuItems = [...this.menuResidencePrincipaleItems];
      // Créer le mapping : index affiché -> index réel
      this.indexMapping = [0, 1, 2, 3, 6, 7, 8, 9, 10]; // Skip 4 (Périodes) et 5 (Locataires)
    } else {
      this.displayedMenuItems = [...this.menuItems];
      this.indexMapping = this.menuItems.map((_, index) => index); // Mapping 1:1
    }
  }

  private handleQueryParams(): void {
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
  }

  setActive(displayedIndex: number): void {
    this.activeIndex = displayedIndex;
    const realIndex = this.indexMapping[displayedIndex];

    // Mettre à jour l'URL avec l'index réel
    this.router.navigate([], {
      queryParams: { tab: realIndex },
      queryParamsHandling: 'merge'
    });
  }

  private setActiveByRealIndex(realIndex: number): void {
    const displayedIndex = this.indexMapping.indexOf(realIndex);
    if (displayedIndex !== -1) {
      this.activeIndex = displayedIndex;
    }
  }

  // Getter pour obtenir l'index réel actuel
  getRealActiveIndex(): number {
    return this.indexMapping[this.activeIndex];
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
  getLocataireActuel(): LocataireDTO | null {
    const now = new Date();
    const periodeEnCours = this.logement.periodesDeLocation.find(p => {
      const dateDebut = new Date(p.dateDeDebut);
      const dateFin = p.dateDeFin ? new Date(p.dateDeFin) : null;
      return dateDebut <= now && (!dateFin || now <= dateFin);
    });

    if (!periodeEnCours || !periodeEnCours.locataires?.length) {
      return null;
    }

    return periodeEnCours.locataires[0]; // ou choisis un autre critère si nécessaire
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

  onDemandeAfficherFrais($event: any) {
    this.demandeAfficherFrais = true
  }
}
