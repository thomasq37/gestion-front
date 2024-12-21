import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../../../../services/v2/photo/photo.service";
import {PhotoDTO} from "../../../../models/v2/entites/Photo/PhotoDTO.model";

@Component({
  selector: 'app-photos-modifier',
  templateUrl: './photos-modifier.component.html',
  styleUrls: ['./photos-modifier.component.scss']
})
export class PhotosModifierComponent implements OnInit {
  photos: PhotoDTO[] = []; // Liste des photos actuelles
  modifications: { photo: PhotoDTO; action: 'new' | 'deleted' | 'updated' }[] = []; // Liste des modifications
  loading = false;
  error: string | null = null;
  logementMasqueId: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) {
  }

  ngOnInit(): void {
    this.logementMasqueId = this.route.snapshot.paramMap.get('logementMasqueId');
    if (this.logementMasqueId) {
      this.listerPhotos(this.logementMasqueId);
    } else {
      this.error = 'Aucun identifiant de logement fourni.';
    }
  }

  async listerPhotos(logementMasqueId: string): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.photos = await this.photoService.listerPhotos(logementMasqueId);
    } catch (err) {
      this.error = 'Erreur lors du chargement des photos.';
    } finally {
      this.loading = false;
    }
  }

  onButtonClick(): void {
    this.fileInput.nativeElement.click();
  }

  auChargementDuFichier(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64StringWithPrefix = reader.result as string;

          const isPrincipal = this.photos.length === 0 && this.photos.every(p => !p.isPrincipal); // Première photo ajoutée ou aucune principale
          const newPhoto: PhotoDTO = {
            image: base64StringWithPrefix.split(',')[1],
            isPrincipal,
          };

          this.photos.push(newPhoto); // Ajouter localement
          this.modifications.push({ photo: newPhoto, action: 'new' }); // Ajouter aux modifications
        };

        reader.onerror = (error) => {
          console.error('Erreur lors de la lecture du fichier :', error);
        };

        reader.readAsDataURL(file);
      });
    }
  }

  supprimerPhoto(index: number): void {
    const photoSupprimee = this.photos[index];
    if (photoSupprimee) {
      this.photos.splice(index, 1); // Supprimer localement
      if (photoSupprimee.isPrincipal && this.photos.length > 0) {
        this.photos[0].isPrincipal = true; // La première devient principale
        this.modifications.push({photo: this.photos[0], action: 'updated'});
      }

      if (photoSupprimee.masqueId) {
        this.modifications.push({photo: photoSupprimee, action: 'deleted'}); // Ajouter aux modifications
      }
    }
  }

  definirCommePrincipale(index: number): void {
    this.photos.forEach((photo, i) => {
      photo.isPrincipal = i === index;
    });

    const principale = this.photos[index];
    if (principale) {
      const existingModification = this.modifications.find(
        (mod) => mod.photo === principale
      );

      if (existingModification) {
        if (existingModification.action === 'new') {
          existingModification.photo.isPrincipal = true;
        } else {
          existingModification.action = 'updated';
        }
      } else {
        this.modifications.push({ photo: principale, action: 'updated' });
      }
    }
  }

  async enregistrerModifications(): Promise<void> {
    this.loading = true;
    try {
      for (const modification of this.modifications) {
        const {photo, action} = modification;

        switch (action) {
          case 'new':
            await this.photoService.creerPhotoPourLogement(
              this.logementMasqueId!,
              photo
            );
            break;
          case 'deleted':
            await this.photoService.supprimerPhotoPourLogement(
              this.logementMasqueId!,
              photo.masqueId!
            );
            break;
          case 'updated':
            await this.photoService.modifierPhotoPourLogement(
              this.logementMasqueId!,
              photo.masqueId!,
              photo
            );
            break;
        }
      }

      this.modifications = [];
      this.router.navigate([`/logements/${this.logementMasqueId}`]);
    } catch (error) {
      console.error('Erreur lors de l’enregistrement des modifications :', error);
    } finally {
      this.loading = false;
    }
  }
}
