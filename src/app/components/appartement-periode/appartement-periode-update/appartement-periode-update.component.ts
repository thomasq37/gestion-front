import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Contact, Frais, PeriodLocation} from "../../../models/gestion";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GestionService} from "../../../services/gestion.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appartement-periode-update',
  templateUrl: './appartement-periode-update.component.html',
  styleUrls: ['./appartement-periode-update.component.scss']
})
export class AppartementPeriodeUpdateComponent implements OnInit, OnChanges{
  @Input() periode: PeriodLocation | null = null;
  @Output() cancelUpdateEvent: EventEmitter<void> = new EventEmitter<void>();
  periodeForm!: FormGroup;
  appartementId!: number;

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute

  ) {}

  private initializeForm(): void {
    this.periodeForm = new FormGroup({
      prix: new FormControl(this.periode?.prix, Validators.required),
      estEntree: new FormControl(this.periode?.estEntree, Validators.required),
      estSortie: new FormControl(this.periode?.estSortie,),
      locVac: new FormControl(this.periode?.locVac)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["periode"] && changes["periode"].currentValue) {
      this.initializeForm();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      this.appartementId = +params['id']
    })
  }

  mettreAJourUnePeriodePourAppartement() {
    const periode: PeriodLocation = this.periodeForm.value;
    if (this.periode) {
      const userId = parseInt(<string>localStorage.getItem('userId'))
      periode.id = this.periode.id
      this.gestionService.mettreAJourUnePeriodePourAppartement(userId, this.appartementId, periode.id, periode).subscribe(contact => {
          console.log('Contact mis à jour:', contact);
          this.periodeForm.reset()
          this.gestionService.periodeUpdatedSubject.next(contact);
          this.cancelUpdateEvent.emit();

        },
        (error) => {
          console.error('Erreur lors de la mise à jour du contact :', error);
        })
    }
    else{
      console.error('Erreur lors de la mise à jour du contact, contact introuvable.');
    }
  }

  cancelUpdate() {

  }
}
