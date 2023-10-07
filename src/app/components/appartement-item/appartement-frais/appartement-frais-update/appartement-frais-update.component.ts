import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Frais, PeriodLocation, TypeFrais} from "../../../../models/gestion";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GestionService} from "../../../../services/gestion.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appartement-frais-update',
  templateUrl: './appartement-frais-update.component.html',
  styleUrls: ['./appartement-frais-update.component.scss']
})
export class AppartementFraisUpdateComponent implements OnInit, OnChanges{
  @Input() frais: Frais | null = null;
  @Output() cancelUpdateEvent: EventEmitter<void> = new EventEmitter<void>();
  fraisForm!: FormGroup;
  appartementId!: number;
  @Input() typesFrais: TypeFrais[] = [];
  @Input() periode: PeriodLocation | null = null;

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute

  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes:", changes);
    console.log(this.periode)
    if (changes["frais"] && changes["frais"].currentValue) {
      this.initializeForm();
    }
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

  private initializeForm(): void {
    this.fraisForm = new FormGroup({
      montant: new FormControl(this.frais?.montant, Validators.required),
      typeFrais: new FormControl(this.frais?.typeFrais.id, Validators.required),
      frequence: new FormControl(this.frais?.frequence, Validators.required)
    });
  }

  mettreAJourUnFraisPourAppartement() {
    const userId = parseInt(<string>localStorage.getItem('userId'))
    const frais: any = this.fraisForm.value;
    frais.typeFrais = this.typesFrais.find(typeFrais => frais.typeFrais == typeFrais.id)
    if(this.periode){
      console.log(frais)
      this.gestionService.mettreAJourUnFraisPourPeriode(userId, this.appartementId, this.periode.id, this.frais?.id, frais).subscribe(frais => {
          console.log('Frais mis à jour:', frais);
          this.fraisForm.reset()
          this.gestionService.fraisUpdatedSubject.next(frais);
          this.cancelUpdateEvent.emit();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du contact :', error);
        })
    }
    else{
      this.gestionService.mettreAJourUnFraisPourAppartement(userId, this.appartementId, this.frais?.id, frais).subscribe(frais => {
          console.log('Frais mis à jour:', frais);
          this.fraisForm.reset()
          this.gestionService.fraisUpdatedSubject.next(frais);
          this.cancelUpdateEvent.emit();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du contact :', error);
        })
    }


  }

  cancelUpdate() {
    this.fraisForm.reset();
    this.cancelUpdateEvent.emit();
  }
}
