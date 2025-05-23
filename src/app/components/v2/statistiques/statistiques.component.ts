import {Component, Input, OnInit} from '@angular/core';
import {LogementDTO} from "../../../models/v2/entites/Logement/LogementDTO.model";
import {Frequence} from "../../../models/v2/enumeration/Frequence.enum";
import {TypeDeLocation} from "../../../models/v2/enumeration/TypeDeLocation.enum";
import {FunctionsUtil} from "../util/functions-util";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  @Input() logement!: LogementDTO;

  totalRevenus: number = 0;
  totalDepenses: number = 0;
  tauxOccupation: number = 0;
  dateActuelle: Date;
  ngOnInit(): void {
    this.dateActuelle = new Date()
    this.calculerTotalRevenus(this.dateActuelle)
    this.calculerTotalDepenses(this.dateActuelle)
    this.calculerTauxOccupation(this.dateActuelle)
  }

  private calculerTotalRevenus(dateActuelle: Date): void {
    this.totalRevenus = 0;
    this.logement.periodesDeLocation.forEach((periode) => {
      const dateDebut = new Date(periode.dateDeDebut);
      const dateFin = periode.dateDeFin ? new Date(periode.dateDeFin) : dateActuelle;

      const revenu = this.calculerRevenuParPeriode(
        periode.tarif,
        periode.typeDeLocation,
        dateDebut,
        dateFin
      );

      this.totalRevenus += revenu;
    });
  }

  private calculerTotalDepenses(dateActuelle: Date): void {
    this.totalDepenses = 0;
    this.logement.frais.forEach((frais) => {
      this.totalDepenses += this.calculerMontantFrais(frais, dateActuelle);
    });

    this.logement.periodesDeLocation.forEach((periode) => {
      periode.frais.forEach((frais) => {
        this.totalDepenses += this.calculerMontantFrais(frais, dateActuelle);
      });
    });
  }

  private calculerTauxOccupation(dateActuelle: Date): void {
    const dateAchat = new Date(this.logement.caracteristiques.dateAchat);
    const periodeTotaleJours = this.calculerDiffJours(dateAchat, dateActuelle);
    let joursOccupes = 0;
    this.logement.periodesDeLocation.forEach((periode) => {
      const dateDebut = new Date(periode.dateDeDebut);
      const dateFin = periode.dateDeFin ? new Date(periode.dateDeFin) : dateActuelle;
      if (dateFin >= dateAchat) {
        const debutEffectif = dateDebut > dateAchat ? dateDebut : dateAchat; // Commence à la date d'achat si applicable
        joursOccupes += this.calculerDiffJours(debutEffectif, dateFin);
      }
    });
    this.tauxOccupation = Math.round((joursOccupes / periodeTotaleJours) * 100);
  }

  private calculerDiffJours(dateDebut: Date, dateFin: Date): number {
    const diffTime = dateFin.getTime() - dateDebut.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Conversion en jours
  }

  private calculerMontantFrais(frais: any, today: Date): number {
    if (frais.frequence === Frequence.PONCTUELLE) {
      return frais.montant;
    }
    const nbOccurrences = FunctionsUtil.calculerOccurrences(frais.frequence, frais.dateDeDebut, frais.dateDeFin);
    return frais.montant * nbOccurrences;
  }

  private calculerRevenuParPeriode(tarif: number, type: TypeDeLocation, dateDebut: Date, dateFin: Date): number {
    switch (type) {
      case TypeDeLocation.JOURNALIERE:
        return tarif;
      case TypeDeLocation.MENSUELLE:
        const diffMonths = this.calculerDiffMois(dateDebut, dateFin);
        return tarif * diffMonths;
      default:
        return 0;
    }
  }

  private calculerDiffMois(dateDebut: Date, dateFin: Date): number {
    const yearDiff = dateFin.getFullYear() - dateDebut.getFullYear();
    const monthDiff = dateFin.getMonth() - dateDebut.getMonth();
    return yearDiff * 12 + monthDiff + 1;
  }
}
