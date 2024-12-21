import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeDeLogement} from "../../../../models/v2/enumeration/TypeDeLogement.enum";
import {DpeLettre} from "../../../../models/v2/enumeration/DpeLettre.enum";
import {CaracteristiquesService} from "../../../../services/v2/caracteristiques/caracteristiques.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {CaracteristiquesFormUtil} from "../util/caracteristiques-form-util";
@Component({
  selector: 'app-caracteristiques-modifier',
  templateUrl: './caracteristiques-modifier.component.html',
  styleUrls: ['./caracteristiques-modifier.component.scss']
})
export class CaracteristiquesModifierComponent {
  // TODO fichier dpe,  patterns et style select et checkbox
  caracteristiquesForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  typeDeLogements = Object.values(TypeDeLogement);
  dpeLettres = Object.values(DpeLettre);
  nomFichier: string | null = null;
  loading = false;

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
  }

  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      if (this.logementMasqueId) {
        this.obtenirCaracteristiquesPourLogement(this.logementMasqueId);
      }
    });
  }

  private async obtenirCaracteristiquesPourLogement(logementMasqueId: string): Promise<void> {
    try {
      const caracteristiques = await this.caracteristiquesService.obtenirCaracteristiquesPourLogement(logementMasqueId);
      this.caracteristiquesForm.patchValue(caracteristiques);
      if (caracteristiques.dpeFichier) {
        this.nomFichier = "1 fichier séléctionné"; // Exemple - utilisez un nom significatif
      }
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger les caracteristiques.');
    } finally {
      this.loading = false;
    }
  }

  async modifierCaracteristiquesPourLogement(): Promise<void> {
    const caracteristiques: CaracteristiquesDTO = this.caracteristiquesForm.value as CaracteristiquesDTO;
    try {
      await this.caracteristiquesService.modifierCaracteristiquesPourLogement(this.logementMasqueId, caracteristiques);
      await this.router.navigate([`/logements/${this.logementMasqueId}`]);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
  }

  remplacerFichier(): void {
    CaracteristiquesFormUtil.remplacerFichier(this.caracteristiquesForm, 'dpeFichier');
    this.nomFichier = null;
  }


  supprimerCaracteristiquesPourLogement(logementMasqueId: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer les caracteristiques pour ce logement ?');
    if (confirmed) {
      this.caracteristiquesService.supprimerCaracteristiquesPourLogement(logementMasqueId).then(() => {
        this.router.navigate([`/logements/${this.logementMasqueId}`]);
      }).catch(error => {
        console.error('Erreur lors de la suppression des caracteristiques:', error);
      });
    } else {
      console.log('Suppression annulée');
    }
  }
  auChargementDuFichier(event: Event): void {
    this.nomFichier = CaracteristiquesFormUtil.auChargementDuFichier(event, this.caracteristiquesForm, 'dpeFichier');
  }

  onBalconOuTerrasseChange(event: Event): void {
    CaracteristiquesFormUtil.onBalconOuTerrasseChange(event, this.caracteristiquesForm, 'surfaceBalconOuTerrasse');
  }
}
