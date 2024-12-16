import { Component } from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {LogementService} from "../../../services/v2/logement/logement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {LocataireDTO} from "../../../models/v2/entites/Locataire/LocataireDTO.model";

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
  activeIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
  getBalconOuTerrasse(caracteristiques: CaracteristiquesDTO): string {
    if (caracteristiques?.balconOuTerrasse) {
      return caracteristiques.typeDeLogement === 'APPARTEMENT' ? 'Balcon(s)' : 'Terrasse(s)';
    }
    return '';
  }
  setActive(index: number): void {
    this.activeIndex = index;
  }
  getTarifActuel(): string {
    const now = new Date();
    const periodeEnCours = this.logement.periodesDeLocation.find(periode => {
      const debut = new Date(periode.dateDeDebut);
      const fin = periode.dateDeFin ? new Date(periode.dateDeFin) : null;
      return debut <= now && (!fin || now <= fin);
    });
    return periodeEnCours
      ? `${periodeEnCours.tarif.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} /mois`
      : 'Non loué';
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

  supprimerLogement(masqueId: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer ce logement ?');
    if (confirmed) {
      this.logementService.supprimerLogement(masqueId).then(() => {
        this.router.navigate(['/logements']);
      }).catch(error => {
        console.error('Erreur lors de la suppression du logement:', error);
      });
    } else {
      console.log('Suppression annulée');
    }
  }

}
