import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Appartement, Frais, PeriodLocation} from "../../../models/gestion";
import {GestionService} from "../../../services/gestion.service";

@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit{
  images: string[] = [];
  appartement!: Appartement;
  fraisFixe: Frais[] = [];
  periodLocation: PeriodLocation[] = [];
  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  isProprietaire(): boolean {
    return localStorage.getItem('userRole') === "PROPRIETAIRE";
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));
      this.gestionService.obtenirPeriodeLocationPourAppartement(parseInt(localStorage.getItem('userId')), appartementId, 1).subscribe(periodes => {
        if (periodes && periodes.content) {
          this.periodLocation = periodes.content;
        } else {
          // Gérer le cas où content est vide ou non défini
          this.periodLocation = [];
        }
      })
      this.gestionService.obtenirFraisFixePourAppartement(parseInt(localStorage.getItem('userId')), appartementId, 0).subscribe(fraisFixe => {
        if (fraisFixe && fraisFixe.content) {
          this.fraisFixe = fraisFixe.content;
        } else {
          this.fraisFixe = [];
        }
      })
      this.gestionService.getAppartmentByUserIdAndApartmentId(localStorage.getItem('userId'), appartementId)
        .subscribe(appartement => {
          this.appartement = appartement;
          this.images = this.appartement.images
        },
          error => {
            this.router.navigate(['/dashboard']);
          });
    });
  }

  supprimerUnAppartement(appartement: Appartement) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet appartement ?")) {
      this.gestionService.supprimerUnAppartement(appartement).subscribe(
        () => {
          console.log('Appartement supprimé avec succès.');
          this.router.navigate(['/dashboard']);
        },
        error => {
          alert("Une erreur est survenue lors de la suppression de l'appartement.");
          console.error('Erreur lors de la suppression de l\'appartement :', error);
        }
      );
    }
  }

  determineEntreeOrSortie(estEntree?: boolean): string {
    return estEntree ? "Entrée" : "Sortie";
  }
}


@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
  transform(value: string | null): string {
    if(value === null){
      return "Pas de sortie"
    }
    const date = new Date(value);
    const monthNames = [
      "jan", "fév", "mar", "avr", "mai", "juin",
      "juil", "août", "sept", "oct", "nov", "déc"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
}
