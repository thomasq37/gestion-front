import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ReservationDTO } from '../../../../models/v2/airbnb/ReservationDTO';
import { PeriodeDeLocationDTO } from '../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model';
import { LocataireDTO } from '../../../../models/v2/entites/Locataire/LocataireDTO.model';
import { TypeDeLocation } from '../../../../models/v2/enumeration/TypeDeLocation.enum';
import { PeriodeDeLocationService } from "../../../../services/v2/periode-de-location/periode-de-location.service";
import { LocataireService } from "../../../../services/v2/locataire/locataire.service";
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  @Input() periodesDeLocation!: PeriodeDeLocationDTO[];
  @Input() logementMasqueId!: string;
  reservations: ReservationDTO[] = [];

  error: string | null = null;
  traitementEnCours = false;
  modaleVisible = false;
  chargementEnCours = false;
  nombreDeLocatairesACreer = 0;
  resultatsTraitement = {
    total: 0,
    existantes: 0,
    nouvelles: 0
  };
  @Output() periodesSontModifies = new EventEmitter<void>();

  constructor(
    private periodeService: PeriodeDeLocationService,
    private locataireService: LocataireService,
  ) {}


  ngOnInit(): void {}

  onCsvSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type !== 'text/csv') {
        this.error = 'Seuls les fichiers CSV sont autorisés.';
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const text = reader.result as string;
        try {
          const reservations = this.parseCsv(text);
          this.reservations = reservations;
          await this.traiterReservationsImportees(reservations);
          this.error = null;
        } catch (err) {
          this.error = 'Erreur lors de la lecture du fichier CSV.';
          console.error(err);
        }
      };
      reader.onerror = () => {
        this.error = 'Erreur de lecture du fichier.';
      };
      reader.readAsText(file, 'utf-8');
    }
  }

  private parseCsv(csvText: string): ReservationDTO[] {
    const lines = csvText.trim().split('\n');
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      return {
        date: values[0],
        type: values[1],
        codeDeConfirmation: values[2],
        dateDeReservation: values[3],
        dateDeDebut: values[4],
        dateDeFin: values[5],
        nuits: Number(values[6]),
        voyageur: values[7],
        logement: values[8],
        details: values[9] || undefined,
        codeDeReference: values[10] || undefined,
        devise: values[11],
        montant: parseFloat(values[12]),
        verse: values[13] ? parseFloat(values[13]) : undefined,
        fraisDeService: values[14] ? parseFloat(values[14]) : undefined,
        fraisDePaiementRapide: values[15] ? parseFloat(values[15]) : undefined,
        fraisDeMenage: parseFloat(values[16]),
        revenusBruts: parseFloat(values[17]),
        taxesDeSejour: parseFloat(values[18]),
        anneeDesRevenus: values[19] ? Number(values[19]) : undefined
      };
    });
  }

  private async traiterReservationsImportees(reservations: ReservationDTO[]): Promise<void> {
    if (!this.periodesDeLocation) return;

    this.traitementEnCours = true;
    this.resultatsTraitement = { total: reservations.length, existantes: 0, nouvelles: 0 };

    for (const resa of reservations) {
      const dateDebut = this.convertirDate(resa.dateDeDebut);
      const dateFin = this.convertirDate(resa.dateDeFin);
      const tarif = resa.montant;
      const periodeExiste = this.periodesDeLocation.some(p =>
        p.dateDeDebut === dateDebut &&
        p.dateDeFin === dateFin &&
        p.tarif === tarif
      );

      if (periodeExiste) {
        this.resultatsTraitement.existantes++;
      } else {
        this.resultatsTraitement.nouvelles++;
      }
    }
    this.nombreDeLocatairesACreer = 0;

    const locatairesExistant = this.getLocataires().map(l =>
      `${l.nom.toLowerCase()}-${l.prenom.toLowerCase()}`
    );
    const locatairesDejaVus = new Set(locatairesExistant);

    for (const resa of reservations) {
      const [prenom, ...reste] = resa.voyageur.trim().split(' ');
      const nom = reste.join(' ');
      const cle = `${nom.toLowerCase()}-${prenom.toLowerCase()}`;

      if (!locatairesDejaVus.has(cle)) {
        this.nombreDeLocatairesACreer++;
        locatairesDejaVus.add(cle);
      }
    }

    this.traitementEnCours = false;
    this.modaleVisible = true;
  }

  async validerImport(): Promise<void> {
    this.chargementEnCours = true;

    try {
      for (const resa of this.reservations) {
        const dateDeDebut = this.convertirDate(resa.dateDeDebut);
        const dateDeFin = this.convertirDate(resa.dateDeFin);
        const tarif = resa.montant;
        const typeDeLocation = TypeDeLocation.JOURNALIERE;

        const [prenom, ...reste] = resa.voyageur.trim().split(' ');
        const nom = reste.join(' ');
        const locataire: LocataireDTO = { nom, prenom };

        let periode = this.periodesDeLocation.find(p =>
          p.dateDeDebut === dateDeDebut &&
          p.dateDeFin === dateDeFin &&
          p.tarif === tarif
        );

        if (!periode) {
          const nouvellePeriode: PeriodeDeLocationDTO = {
            dateDeDebut,
            dateDeFin,
            tarif,
            typeDeLocation,
            locataires: []
          };
          const periodeCreee = await this.periodeService.creerEtMettreAJourCache(this.logementMasqueId!, nouvellePeriode);

          // Ajout au tableau local (et déclenchement d'une nouvelle référence)
          this.periodesDeLocation = [...this.periodesDeLocation, periodeCreee];
          periode = periodeCreee;
        }

        const locataireExiste = this.getLocataires().some(l =>
          l.nom.toLowerCase() === nom.toLowerCase() &&
          l.prenom.toLowerCase() === prenom.toLowerCase()
        );

        if (!locataireExiste && periode?.masqueId) {
          await this.locataireService.creerEtMettreAJourCache(this.logementMasqueId!, periode.masqueId, locataire);
        }
      }
    } catch (error) {
      console.error('Erreur pendant l\'import', error);
      this.error = 'Une erreur est survenue pendant l\'import.';
    } finally {
      this.chargementEnCours = false;
      this.modaleVisible = false;

      // Sécurise le cycle Angular
      this.periodesSontModifies.emit()
    }
  }

  fermerModale(): void {
    this.modaleVisible = false;
    this.chargementEnCours = false;
  }

  private convertirDate(dateFr: string): string {
    const [mois, jour, annee] = dateFr.split('/');
    return `${annee}-${mois.padStart(2, '0')}-${jour.padStart(2, '0')}`;
  }

  private getLocataires(): LocataireDTO[] {
    const locatairesSet = new Set<string>();
    const result: LocataireDTO[] = [];

    this.periodesDeLocation.forEach(p => {
      p.locataires?.forEach(l => {
        const key = `${l.nom?.toLowerCase()}-${l.prenom?.toLowerCase()}`;
        if (!locatairesSet.has(key)) {
          locatairesSet.add(key);
          result.push(l);
        }
      });
    });

    return result;
  }
}
