import { Component, Input, OnInit } from '@angular/core';
import { LogementDTO } from "../../../models/v2/entites/Logement/LogementDTO.model";
import { Frequence } from "../../../models/v2/enumeration/Frequence.enum";
import { TypeDeLocation } from "../../../models/v2/enumeration/TypeDeLocation.enum";
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  @Input() logement!: LogementDTO;

  chartData: any;
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };
  chartType: ChartType = 'bar';

  totalRevenus: number = 0;
  totalDepenses: number = 0;
  tauxOccupation: number = 0;
  dateActuelle: Date;

  anneesDisponibles: (number | string)[] = [];
  anneeSelectionnee: number | string = 'tout';

  ngOnInit(): void {
    this.dateActuelle = new Date();
    this.genererListeAnnees();
    this.mettreAJourStats();
    this.calculerTauxOccupation(this.dateActuelle);
  }

  genererListeAnnees(): void {
    const debut = new Date(this.logement.caracteristiques.dateAchat).getFullYear();
    const fin = new Date().getFullYear() + 3; // Projection sur 3 ans dans le futur
    this.anneesDisponibles = ['tout'];
    for (let y = debut; y <= fin; y++) {
      this.anneesDisponibles.push(y);
    }
  }

  mettreAJourStats(): void {
    if (this.anneeSelectionnee === 'tout') {
      // Calculer en additionnant toutes les années pour garantir la cohérence
      this.calculerStatsTotal();
    } else {
      // Pour une année spécifique
      const annee = Number(this.anneeSelectionnee);
      this.calculerStatsAnnee(annee);
    }
    this.mettreAJourGraphique();
  }

  private calculerStatsTotal(): void {
    console.log('=== CALCUL TOTAL (DEPUIS LE DÉBUT) ===');
    this.totalRevenus = 0;
    this.totalDepenses = 0;

    // Calculer pour chaque année et additionner
    const debut = new Date(this.logement.caracteristiques.dateAchat).getFullYear();
    const fin = new Date().getFullYear();

    for (let annee = debut; annee <= fin; annee++) {
      const statsAnnee = this.calculerStatsAnneeRetour(annee);
      console.log(`Année ${annee}: ${statsAnnee.revenus}€ revenus, ${statsAnnee.depenses}€ dépenses`);
      this.totalRevenus += statsAnnee.revenus;
      this.totalDepenses += statsAnnee.depenses;
    }

    console.log(`TOTAL FINAL: ${this.totalRevenus}€ revenus, ${this.totalDepenses}€ dépenses`);
  }

  private calculerStatsAnneeRetour(annee: number): {revenus: number, depenses: number} {
    const dateDebutAnnee = new Date(annee, 0, 1);
    const dateFinAnnee = new Date(annee, 11, 31);

    // Si l'année commence avant la date d'achat, commencer à la date d'achat
    const dateAchat = new Date(this.logement.caracteristiques.dateAchat);
    const dateDebutEffective = dateAchat > dateDebutAnnee ? dateAchat : dateDebutAnnee;

    let revenus = 0;
    let depenses = 0;

    // Calculer les revenus pour l'année
    this.logement.periodesDeLocation.forEach((periode) => {
      const dateDebut = new Date(periode.dateDeDebut);
      const dateFin = periode.dateDeFin ? new Date(periode.dateDeFin) : this.dateActuelle;

      // Vérifier si la période chevauche avec l'année demandée
      if (dateFin >= dateDebutEffective && dateDebut <= dateFinAnnee) {
        if (periode.typeDeLocation === TypeDeLocation.JOURNALIERE) {
          // Pour journalier : compter si le séjour commence dans l'année
          if (dateDebut >= dateDebutEffective && dateDebut <= dateFinAnnee) {
            revenus += periode.tarif;
          }
        } else if (periode.typeDeLocation === TypeDeLocation.MENSUELLE) {
          // Pour mensuel : calculer selon la durée réelle de la période dans l'année
          const debutEffectif = dateDebut > dateDebutEffective ? dateDebut : dateDebutEffective;
          const finEffective = dateFin < dateFinAnnee ? dateFin : dateFinAnnee;

          const joursEffectifs = this.calculerDiffJours(debutEffectif, finEffective);
          const joursPeriodeComplete = this.calculerDiffJours(dateDebut, dateFin);

          const revenu = (periode.tarif * joursEffectifs) / joursPeriodeComplete;
          revenus += revenu;
        }
      }
    });

    // Calculer les dépenses pour l'année
    // Frais généraux du logement
    this.logement.frais.forEach((frais) => {
      depenses += this.calculerMontantFraisAnnee(frais, annee);
    });

    // Frais des périodes de location
    this.logement.periodesDeLocation.forEach((periode) => {
      if (periode.frais) {
        periode.frais.forEach((frais) => {
          depenses += this.calculerMontantFraisAnnee(frais, annee);
        });
      }
    });

    return { revenus, depenses };
  }

  private calculerStatsAnnee(annee: number): void {
    const dateDebutAnnee = new Date(annee, 0, 1);
    const dateFinAnnee = new Date(annee, 11, 31);

    // Si l'année commence avant la date d'achat, commencer à la date d'achat
    const dateAchat = new Date(this.logement.caracteristiques.dateAchat);
    const dateDebutEffective = dateAchat > dateDebutAnnee ? dateAchat : dateDebutAnnee;

    console.log(`Calcul pour ${annee}: ${dateDebutEffective.toLocaleDateString()} au ${dateFinAnnee.toLocaleDateString()}`);

    // Calculer les revenus pour l'année
    this.totalRevenus = 0;
    this.logement.periodesDeLocation.forEach((periode, index) => {
      const dateDebut = new Date(periode.dateDeDebut);
      const dateFin = periode.dateDeFin ? new Date(periode.dateDeFin) : this.dateActuelle;

      // Vérifier si la période chevauche avec l'année demandée
      if (dateFin >= dateDebutEffective && dateDebut <= dateFinAnnee) {
        if (periode.typeDeLocation === TypeDeLocation.JOURNALIERE) {
          // Pour journalier : compter si le séjour commence dans l'année
          if (dateDebut >= dateDebutEffective && dateDebut <= dateFinAnnee) {
            this.totalRevenus += periode.tarif;
          }
        } else if (periode.typeDeLocation === TypeDeLocation.MENSUELLE) {
          // Pour mensuel : calculer selon la durée réelle de la période dans l'année
          const debutEffectif = dateDebut > dateDebutEffective ? dateDebut : dateDebutEffective;
          const finEffective = dateFin < dateFinAnnee ? dateFin : dateFinAnnee;

          const joursEffectifs = this.calculerDiffJours(debutEffectif, finEffective);
          const joursPeriodeComplete = this.calculerDiffJours(dateDebut, dateFin);

          const revenu = (periode.tarif * joursEffectifs) / joursPeriodeComplete;
          this.totalRevenus += revenu;
        }
      }
    });

    // Calculer les dépenses pour l'année
    this.totalDepenses = 0;

    // Frais généraux du logement
    this.logement.frais.forEach((frais) => {
      this.totalDepenses += this.calculerMontantFraisAnnee(frais, annee);
    });

    // Frais des périodes de location
    this.logement.periodesDeLocation.forEach((periode) => {
      if (periode.frais) {
        periode.frais.forEach((frais) => {
          this.totalDepenses += this.calculerMontantFraisAnnee(frais, annee);
        });
      }
    });
  }

  private calculerMontantFraisAnnee(frais: any, annee: number): number {
    const dateDebutAnnee = new Date(annee, 0, 1);
    const dateFinAnnee = new Date(annee, 11, 31);

    // Si l'année commence avant la date d'achat, commencer à la date d'achat
    const dateAchat = new Date(this.logement.caracteristiques.dateAchat);
    const dateDebutEffective = dateAchat > dateDebutAnnee ? dateAchat : dateDebutAnnee;

    const debutFrais = new Date(frais.dateDeDebut);

    // Si pas de date de fin, étendre jusqu'en 2099 pour les projections
    let finFrais: Date;
    if (frais.dateDeFin) {
      finFrais = new Date(frais.dateDeFin);
    } else {
      finFrais = new Date(2099, 11, 31);
    }

    // Si les frais ne touchent pas l'année, retourner 0
    if (finFrais < dateDebutEffective || debutFrais > dateFinAnnee) {
      return 0;
    }

    if (frais.frequence === Frequence.PONCTUELLE) {
      // Frais ponctuel : compter seulement s'il est dans l'année
      return debutFrais.getFullYear() === annee ? frais.montant : 0;
    }

    // Pour les frais récurrents
    const debutEffectif = debutFrais > dateDebutEffective ? debutFrais : dateDebutEffective;
    const finEffective = finFrais < dateFinAnnee ? finFrais : dateFinAnnee;

    let nbOccurrences = 0;

    switch (frais.frequence) {
      case Frequence.HEBDOMADAIRE:
        nbOccurrences = Math.floor(this.calculerDiffJours(debutEffectif, finEffective) / 7);
        break;

      case Frequence.MENSUELLE:
        const moisDebut = debutEffectif.getFullYear() * 12 + debutEffectif.getMonth();
        const moisFin = finEffective.getFullYear() * 12 + finEffective.getMonth();
        nbOccurrences = moisFin - moisDebut + 1;
        break;

      case Frequence.BIMESTRIELLE:
        let currentBi = new Date(debutEffectif);
        while (currentBi <= finEffective) {
          nbOccurrences++;
          currentBi.setMonth(currentBi.getMonth() + 2);
        }
        break;

      case Frequence.TRIMESTRIELLE:
        let currentTri = new Date(debutEffectif);
        while (currentTri <= finEffective) {
          nbOccurrences++;
          currentTri.setMonth(currentTri.getMonth() + 3);
        }
        break;

      case Frequence.SEMESTRIELLE:
        let currentSem = new Date(debutEffectif);
        while (currentSem <= finEffective) {
          nbOccurrences++;
          currentSem.setMonth(currentSem.getMonth() + 6);
        }
        break;

      case Frequence.ANNUELLE:
        // Pour les frais annuels, vérifier si la date anniversaire tombe dans l'année
        let dateAnniversaire = new Date(debutFrais);
        dateAnniversaire.setFullYear(annee);

        if (dateAnniversaire >= debutEffectif && dateAnniversaire <= finEffective) {
          nbOccurrences = 1;
        }
        break;
    }

    return frais.montant * nbOccurrences;
  }

  private calculerTauxOccupation(dateActuelle: Date): void {
    const dateAchat = new Date(this.logement.caracteristiques.dateAchat);
    const periodeTotaleJours = this.calculerDiffJours(dateAchat, dateActuelle);
    let joursOccupes = 0;
    this.logement.periodesDeLocation.forEach((periode) => {
      const dateDebut = new Date(periode.dateDeDebut);
      const dateFin = periode.dateDeFin ? new Date(periode.dateDeFin) : dateActuelle;
      if (dateFin >= dateAchat) {
        const debutEffectif = dateDebut > dateAchat ? dateDebut : dateAchat;
        joursOccupes += this.calculerDiffJours(debutEffectif, dateFin);
      }
    });
    this.tauxOccupation = Math.round((joursOccupes / periodeTotaleJours) * 100);
  }

  private calculerDiffJours(dateDebut: Date, dateFin: Date): number {
    const diffTime = dateFin.getTime() - dateDebut.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private mettreAJourGraphique(): void {
    const labelPeriode = this.anneeSelectionnee === 'tout'
      ? 'Depuis le début'
      : this.anneeSelectionnee.toString();

    const benefice = this.totalRevenus - this.totalDepenses;

    this.chartData = {
      labels: [labelPeriode],
      datasets: [
        {
          label: 'Revenus',
          data: [this.totalRevenus],
          backgroundColor: '#2ecc71'
        },
        {
          label: 'Dépenses',
          data: [this.totalDepenses],
          backgroundColor: '#e74c3c'
        },
        {
          label: 'Bénéfice',
          data: [benefice],
          backgroundColor: benefice >= 0 ? '#3498db' : '#f39c12'
        }
      ]
    };
  }
}
