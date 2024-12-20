import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CaracteristiquesService} from "../../../../services/v2/caracteristiques/caracteristiques.service";
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {TypeDeLogement} from "../../../../models/v2/enumeration/TypeDeLogement.enum";
import {DpeLettre} from "../../../../models/v2/enumeration/DpeLettre.enum";

@Component({
  selector: 'app-caracteristiques-creer',
  templateUrl: './caracteristiques-creer.component.html',
  styleUrls: ['./caracteristiques-creer.component.scss']
})
export class CaracteristiquesCreerComponent {
  // TODO fichier dpe,  patterns et style select et checkbox
  caracteristiquesForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  typeDeLogements = Object.values(TypeDeLogement);
  dpeLettres = Object.values(DpeLettre);
  nomFichier: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private caracteristiquesService: CaracteristiquesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.caracteristiquesForm = this.formBuilder.group({
      dateAchat: ['', Validators.required],
      montantAchat: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      montantEstimation: [''],
      montantFraisDeNotaireEtNegociation: [''],
      nombreDePieces: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      surfaceLogement: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      typeDeLogement: ['', Validators.required],
      meubleeOuNon: [''],
      balconOuTerrasse: [''],
      surfaceBalconOuTerrasse: [''],
      dpeLettre:['', Validators.required],
      dpeFichier:[''],
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerCaracteristiquesPourLogement(): Promise<void> {
    const caracteristiques: CaracteristiquesDTO = this.caracteristiquesForm.value as CaracteristiquesDTO;
    try {
      await this.caracteristiquesService.creerCaracteristiquesPourLogement(this.logementMasqueId, caracteristiques);
      await this.router.navigate([`/logements/${this.logementMasqueId}`]);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
  }
  auChargementDuFichier(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result as string;
        const base64String = base64StringWithPrefix.split(',')[1];
        this.caracteristiquesForm.patchValue({
          dpeFichier: base64String
        });
        this.nomFichier = file.name;
        console.log('Base64 sans préfixe ajouté au formulaire:', base64String);
      };

      reader.onerror = (error) => {
        console.error('Erreur lors de la conversion du fichier en Base64:', error);
      };

      reader.readAsDataURL(file);
    }
  }

  remplacerFichier(): void {
    this.nomFichier = null;
    this.caracteristiquesForm.patchValue({ dpeFichier: '' });
    console.log('Le fichier a été réinitialisé.');
  }
}
