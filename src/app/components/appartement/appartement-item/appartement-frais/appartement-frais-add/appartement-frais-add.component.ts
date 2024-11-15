import {Component, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {GestionService} from "../../../../../services/gestion.service";
import {PeriodLocation, TypeFrais} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-frais-add',
  templateUrl: './appartement-frais-add.component.html',
  styleUrls: ['./appartement-frais-add.component.scss']
})
export class AppartementFraisAddComponent {
  @Input() typesFrais: TypeFrais[] = [];
  @Input() appartementId: number | null = null;
  fraisForm!: FormGroup;
  @Input() isPeriode: boolean = false
  @Input() periode: PeriodLocation | null = null;
  isPonctuelle: boolean = false;

  constructor(private gestionService: GestionService) {}

  ngOnInit() {
    this.fraisForm = new FormGroup({
      nom: new FormControl(null),
      montant: new FormControl(null, Validators.required),
      typeFrais: new FormControl("", Validators.required),
      frequence: new FormControl("", Validators.required),
      datePaiement: new FormControl(null),

    });
  }

  ajouterUnFraisFixe() {
    const frais: any = this.fraisForm.value;
    frais.typeFrais = this.typesFrais.find(typeFrais => frais.typeFrais == typeFrais.id)
    if(this.isPeriode){
      this.gestionService.ajouterUnFraisFixePourPeriode(this.appartementId, this.periode.id, frais).then(frais => {
          console.log('Frais ajouté avec succès.');
          this.gestionService.fraisAddedSubject.next(frais);
          this.fraisForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du frais :', error);
        })
    }
    else{
      this.gestionService.ajouterUnFraisFixePourAppartement(this.appartementId, frais).then(frais => {
          console.log('Frais ajouté avec succès.');
          this.gestionService.fraisAddedSubject.next(frais);
          this.fraisForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du frais :', error);
        })
    }

  }

  onFrequenceChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isPonctuelle = selectedValue === 'PONCTUELLE';

    // Réinitialiser la date de paiement si autre chose que "PONCTUELLE" est sélectionnée
    if (!this.isPonctuelle) {
      this.fraisForm.get('datePaiement')?.setValue(null);
    }
  }
}
