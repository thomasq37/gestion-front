import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Appartement, Frais} from "../../models/gestion";
import {GestionService} from "../../services/gestion.service";

@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit{
  images: string[] = [];
  appartement!: Appartement;
  frais: Frais[] = [];
  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));
      this.gestionService.obtenirUnAppartementParId(appartementId)
        .subscribe(appartement => {
          if (appartement.appUser.userToken != localStorage.getItem('userToken')) {
            // Redirect to an unauthorized page or any other page
            this.router.navigate(['/dashboard']);
          }
          this.appartement = appartement;
          this.images = this.appartement.images

        });
    });
  }

  showInfo(event: any){
    event.target.parentElement.lastChild.firstElementChild.classList.toggle('visible');
  }

  supprimerUnAppartement(appartementId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet appartement ?")) {
      this.gestionService.supprimerUnAppartement(appartementId).subscribe(
        () => {
          console.log('Gestion supprimé avec succès.');
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
