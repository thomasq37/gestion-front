import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Appartement, Frais, FrequenceFrais, Mouvement} from "../../models/appartement";
import {GestionService} from "../../services/gestion.service";

@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit{
  images: string[] = [];
  appartement!: Appartement;
  mouvements: Mouvement[] = [];
  mouvementsFormated: any[] = [];
  frais: Frais[] = [];
  loadingCount = 4;
  rentabiliteNette = 0;
  moyenneBenefices = 0;
  tauxVacanceLocatives = 0;
  isLoading: boolean = true;
  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  imageLoaded() {
    this.isLoading = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));
      this.gestionService.getTauxVacancesLocativesByAppartementId(appartementId)
        .subscribe(tauxVacanceLocatives => {
          this.tauxVacanceLocatives = tauxVacanceLocatives
          this.loadingCount--;
        });
      this.gestionService.getFraisByAppartementId(appartementId)
        .subscribe(response => {
          this.frais = response
        })
      this.gestionService.getMoyenneBeneficesByAppartementId(appartementId)
        .subscribe(moyenneBenefices => {
          this.moyenneBenefices = moyenneBenefices;
          this.loadingCount--;
        });
      this.gestionService.getRentabiliteNetteByAppartementId(appartementId)
        .subscribe(rentabiliteNette => {
          this.rentabiliteNette = +rentabiliteNette.toFixed(2);
          this.loadingCount--;
        });
      this.gestionService.getAppartementById(appartementId)
        .subscribe(appartement => {
          this.appartement = appartement;
          this.mouvements = this.appartement.mouvements
          for (const mouvement of this.mouvements){
            const estEntreeFormatted = this.determineEntreeOrSortie(mouvement.estEntree)
            const dateFormatted = this.formatDate(mouvement.date)
            this.mouvementsFormated.push({"date" : dateFormatted, "estEntree" : estEntreeFormatted})
          }
          this.images = appartement.images;
          this.loadingCount--;
        });
    });
  }

  showInfo(event: any){
    event.target.parentElement.lastChild.firstElementChild.classList.toggle('visible');
  }

  deleteOneAppartement(appartementId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet appartement ?")) {
      this.gestionService.deleteOneAppartement(appartementId).subscribe(
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
  formatDate(dateStr?: string): string {
    const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    const date = new Date(dateStr ? dateStr : "");
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[month]} ${year}`;
  }

  determineEntreeOrSortie(estEntree?: boolean): string {
    return estEntree ? "Entrée" : "Sortie";
  }
}
