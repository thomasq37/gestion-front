import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeDeLogement} from "../../../../models/v2/enumeration/TypeDeLogement.enum";
import {DpeLettre} from "../../../../models/v2/enumeration/DpeLettre.enum";
import {CaracteristiquesService} from "../../../../services/v2/caracteristiques/caracteristiques.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
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
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger les caracteristiques.');
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
    this.caracteristiquesForm.patchValue({ dpeFichier: null });
    console.log('Le fichier a été réinitialisé.');
  }
}
