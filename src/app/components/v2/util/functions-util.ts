import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {Frequence} from "../../../models/v2/enumeration/Frequence.enum";

export class FunctionsUtil {
  static getTarifActuel(periodes: PeriodeDeLocationDTO[]): string {
    const enCours = this.getPeriodeEnCours(periodes);
    if (!enCours) return 'Non loué';

    const typeLocation = enCours.typeDeLocation === 'JOURNALIERE' ? 'le séjour' : '/mois';
    return `${enCours.tarif.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} ${typeLocation}`;
  }
  static getPeriodeEnCours(periodes: PeriodeDeLocationDTO[]): PeriodeDeLocationDTO | undefined {
    const now = new Date();
    return periodes.find(periode => {
      const debut = new Date(periode.dateDeDebut);
      const fin = periode.dateDeFin ? new Date(periode.dateDeFin) : null;
      return debut <= now && (!fin || now <= fin);
    });
  }

  static isPeriodeEnCoursJournaliere(periodes: PeriodeDeLocationDTO[]): boolean {
    const enCours = this.getPeriodeEnCours(periodes);
    return enCours?.typeDeLocation === 'JOURNALIERE';
  }
  static calculerOccurrences(frequence: Frequence, dateDeDebut: string, dateDeFin: string): number {

    if (dateDeFin === null) {
      const dateActuelle = new Date();
      dateDeFin = dateActuelle.toISOString().split('T')[0];
    }
    const jours = Math.floor((new Date(dateDeFin).getTime() - new Date(dateDeDebut).getTime()) / (1000 * 60 * 60 * 24));
    const joursParFrequence: { [key in Frequence]: number } = {
      [Frequence.MENSUELLE]: 30,
      [Frequence.BIMESTRIELLE]: 60,
      [Frequence.TRIMESTRIELLE]: 90,
      [Frequence.SEMESTRIELLE]: 180,
      [Frequence.ANNUELLE]: 365,
      [Frequence.HEBDOMADAIRE]: 7,
      [Frequence.PONCTUELLE]: Infinity, // Cas particulier
    };

    if (frequence === Frequence.PONCTUELLE) {
      return 1;
    }

    return Math.floor(jours / (joursParFrequence[frequence] || Infinity));
  }
  static getDureeEtJoursRestantsJournaliere(periodes: PeriodeDeLocationDTO[]): string | null {
    const now = new Date();
    const periode = this.getPeriodeEnCours(periodes);

    if (!periode || periode.typeDeLocation !== 'JOURNALIERE' || !periode.dateDeFin) return null;

    const debut = new Date(periode.dateDeDebut);
    const fin = new Date(periode.dateDeFin);

    const totalJours = Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24));
    const joursEcoules = Math.ceil((now.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24));
    const joursAffiches = Math.min(joursEcoules, totalJours);

    if (totalJours === 1) {
      return '1 jour';
    }

    return `${joursAffiches}/${totalJours} jours`;
  }
}
