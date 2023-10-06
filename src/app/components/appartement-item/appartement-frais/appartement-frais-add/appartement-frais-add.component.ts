import {Component, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {GestionService} from "../../../../services/gestion.service";
import {TypeFrais} from "../../../../models/gestion";

@Component({
  selector: 'app-appartement-frais-add',
  templateUrl: './appartement-frais-add.component.html',
  styleUrls: ['./appartement-frais-add.component.scss']
})
export class AppartementFraisAddComponent {
  @Input() typesFrais: TypeFrais[] = [];
  @Input() appartementId: number | null = null;
  fraisForm!: FormGroup;

  constructor(private gestionService: GestionService) {}

  ngOnInit() {
    this.fraisForm = new FormGroup({
      montant: new FormControl(null, Validators.required),
      typeFrais: new FormControl(null, Validators.required),
      frequence: new FormControl(null, Validators.required)
    });
  }

  ajouterUnFraisFixePourAppartement() {
    const userId = parseInt(<string>localStorage.getItem('userId'))
    const frais: any = this.fraisForm.value;
    frais.typeFrais = this.typesFrais.find(typeFrais => frais.typeFrais == typeFrais.id)
    this.gestionService.ajouterUnFraisFixePourAppartement(userId, this.appartementId, frais).subscribe(frais => {
        console.log('Frais ajouté:', frais);
        this.gestionService.fraisAddedSubject.next(frais);
        this.fraisForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      })
  }
}
