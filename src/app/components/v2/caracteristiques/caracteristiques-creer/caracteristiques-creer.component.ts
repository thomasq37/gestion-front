import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CaracteristiquesService} from "../../../../services/v2/caracteristiques/caracteristiques.service";
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {TypeDeLogement} from "../../../../models/v2/enumeration/TypeDeLogement.enum";
import {DpeLettre} from "../../../../models/v2/enumeration/DpeLettre.enum";
import {CaracteristiquesFormUtil} from "../util/caracteristiques-form-util";

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
    this.nomFichier = CaracteristiquesFormUtil.auChargementDuFichier(event, this.caracteristiquesForm, 'dpeFichier');
  }

  remplacerFichier(): void {
    CaracteristiquesFormUtil.remplacerFichier(this.caracteristiquesForm, 'dpeFichier');
    this.nomFichier = null;
  }

  onBalconOuTerrasseChange(event: Event): void {
    CaracteristiquesFormUtil.onBalconOuTerrasseChange(event, this.caracteristiquesForm, 'surfaceBalconOuTerrasse');
  }
}
