import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {AppUserDTO} from "../../../../../models/gestion";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GestionService} from "../../../../../services/gestion.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appartement-gestionnaire-update',
  templateUrl: './appartement-gestionnaire-update.component.html',
  styleUrls: ['./appartement-gestionnaire-update.component.scss']
})
export class AppartementGestionnaireUpdateComponent {
  @Input() gestionnaire: AppUserDTO;
  @Output() cancelUpdateEvent: EventEmitter<void> = new EventEmitter<void>();
  appGestionnaireForm!: FormGroup;
  appartementId!: number;

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute

  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes["gestionnaire"] && changes["gestionnaire"].currentValue) {
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
    this.appGestionnaireForm = new FormGroup({
      username: new FormControl(this.gestionnaire?.username, Validators.required),
      email: new FormControl(this.gestionnaire?.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.gestionnaire?.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')])
    });
  }

  mettreAJourUnGestionnairePourAppartement() {
    const gestionnaire: AppUserDTO = this.appGestionnaireForm.value;
    if (this.gestionnaire) {
      const userId = parseInt(<string>localStorage.getItem('userId'))
      gestionnaire.id = this.gestionnaire.id
      this.gestionService.mettreAJourUnGestionnairePourAppartement(userId, this.appartementId, gestionnaire.id, gestionnaire).subscribe(contact => {
          console.log('Gestionnaire mis à jour avec succès.');
          this.appGestionnaireForm.reset()
          this.gestionService.gestionnaireUpdatedSubject.next(gestionnaire);
          this.cancelUpdateEvent.emit();

        },
        (error) => {
          console.error('Erreur lors de la mise à jour du gestionnaire :', error);
        })
    }
    else{
      console.error('Erreur lors de la mise à jour du contact, contact introuvable.');
    }
  }

  cancelUpdate() {
    this.appGestionnaireForm.reset();
    this.cancelUpdateEvent.emit();
  }
}
