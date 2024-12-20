import {
  Component,
  ElementRef,
  OnInit, Pipe, PipeTransform,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Appartement} from "../../../models/gestion";
import {GestionService} from "../../../services/gestion.service";
import {hasProprietaireRole} from "../../../services/v2/http-helpers";

@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit{
  images: string[] = [];
  appartement!: Appartement;
  @ViewChild('pictureElement') pictureElement!: ElementRef;
  @ViewChild('descElement') descElement!: ElementRef;

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  // Adjust the height of the description element based on the picture element's height
  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const appartementId = Number(params.get('id'));
        this.gestionService.obtenirAppartmentParUtilisateurIdEtAppartementId(appartementId)
          .then(appartement => {
              this.appartement = appartement;
              this.images = this.appartement.images;
            },
            error => {
              this.router.navigate(['/dashboard']);
            });
      });
  }

  supprimerUnAppartement(appartementId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet appartement ?")) {
      this.gestionService.supprimerUnAppartementPourUtilisateur(appartementId).then(
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
  protected readonly hasProprietaireRole = hasProprietaireRole;
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
