import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PeriodLocation} from "../../../../models/gestion";
import {GestionService} from "../../../../services/gestion.service";

@Component({
  selector: 'app-appartement-periode-add',
  templateUrl: './appartement-periode-add.component.html',
  styleUrls: ['./appartement-periode-add.component.scss']
})
export class AppartementPeriodeAddComponent implements OnInit{
  @Input() appartementId: number | null = null
  periodeForm!: FormGroup;

  constructor(
    private gestionService: GestionService,
  ) {}


  ngOnInit(): void {
    this.periodeForm = new FormGroup({
      prix: new FormControl(null, Validators.required),
      estEntree: new FormControl(null,  Validators.required),
      estSortie: new FormControl(null),
      locVac: new FormControl(null),
    });
  }

  ajouterUnePeriodeLocationPourAppartement() {
    const userId = parseInt(<string>localStorage.getItem('userId'))
    const periode: PeriodLocation = this.periodeForm.value;
    this.gestionService.ajouterUnePeriodeLocationPourAppartement(userId, this.appartementId, periode).subscribe(periode => {
        console.log('Contact ajouté:', periode);
        this.gestionService.periodeAddedSubject.next(periode);
        this.periodeForm.reset()
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la période :', error);
      })
  }
}
