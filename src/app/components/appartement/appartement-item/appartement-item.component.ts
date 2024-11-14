import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit, Pipe, PipeTransform,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Appartement, Frais, PeriodLocation} from "../../../models/gestion";
import {GestionService} from "../../../services/gestion.service";
import {hasProprietaireRole} from "../../../services/http-helpers";

@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit, AfterViewInit{
  images: string[] = [];
  appartement!: Appartement;
  fraisFixe: Frais[] = [];
  periodLocation: PeriodLocation[] = [];
  @ViewChild('pictureElement') pictureElement!: ElementRef;
  @ViewChild('descElement') descElement!: ElementRef;

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.adjustHeight(0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustHeight(0);
  }

  // Adjust the height of the description element based on the picture element's height
  adjustHeight(init) {
    const mediaQuery = window.matchMedia('(min-width: 55rem)');  // 55rem correspond à 880px
    if (mediaQuery.matches && this.appartement) {
      // Sélectionnez les éléments uniquement si l'appartement existe
      const pictureElement = this.elementRef.nativeElement.querySelector('.picture-element');
      const descElement = this.elementRef.nativeElement.querySelector('.desc-container');

      if (pictureElement && descElement) {
        const pictureHeight = pictureElement.offsetHeight;
        if(init === 1){
          descElement.style.height = `${pictureHeight + 10}px`;
        }
        else{
          descElement.style.height = `${pictureHeight}px`;
        }
      }
    } else {
      // Réinitialiser la hauteur à "auto" si la largeur est inférieure à 55rem
      const descElement = this.elementRef.nativeElement.querySelector('.desc-container');
      if (descElement) {
        descElement.style.height = 'auto';
      }
    }
  }

  isProprietaire(): boolean {
    return localStorage.getItem('userRole') === "PROPRIETAIRE";
  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const appartementId = Number(params.get('id'));
        /*this.gestionService.obtenirPeriodeLocationPourAppartement(appartementId, 0).then(periodes => {
          if (periodes && periodes.content) {
            this.periodLocation = periodes.content;
          } else {
            this.periodLocation = [];
          }
        }, error => {
          console.log(error)
        });*/

        /*this.gestionService.obtenirFraisFixePourAppartement(appartementId, 1).then(fraisFixe => {
          if (fraisFixe && fraisFixe.content) {
            this.fraisFixe = fraisFixe.content;
          } else {
            this.fraisFixe = [];
          }
        });*/

        this.gestionService.getAppartmentByUserIdAndApartmentId(appartementId)
          .then(appartement => {
              this.appartement = appartement;
              this.images = this.appartement.images;

              // Appelez adjustHeight après le chargement de l'appartement
              setTimeout(() => this.adjustHeight(1), 0);
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
