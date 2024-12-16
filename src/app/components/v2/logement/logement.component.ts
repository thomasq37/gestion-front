import { Component } from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {LogementService} from "../../../services/v2/logement/logement.service";
import {ActivatedRoute} from "@angular/router";
import {CaracteristiquesDTO} from "../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.scss']
})
export class LogementComponent {
  logement!: LogementDTO;
  loading = false;
  error: string | null = null;
  menuItems = ['Adresse', 'Caractéristiques', 'Frais fixes', 'Périodes de locations', 'Contacts'];
  activeIndex = 0;

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
}
