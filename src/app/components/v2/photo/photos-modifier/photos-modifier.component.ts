import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PhotoService} from "../../../../services/v2/photo/photo.service";
import {PhotoDTO} from "../../../../models/v2/entites/Photo/PhotoDTO.model";

@Component({
  selector: 'app-photos-modifier',
  templateUrl: './photos-modifier.component.html',
  styleUrls: ['./photos-modifier.component.scss']
})
export class PhotosModifierComponent implements OnInit {
  photos: PhotoDTO[] = [];
  loading = false;
  error: string | null = null;
  logementMasqueId: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService) {}

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
      this.error = 'Erreur lors du chargement des logements.';
    } finally {
      this.loading = false;
    }
  }
  onButtonClick(): void {
    this.fileInput.nativeElement.click();
  }
  auChargementDuFichier(event: Event): string | null {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result as string;
        let isPrincipal = false
        if(this.photos.length === 0){
          isPrincipal = true;
        }
        this.photos.push({
          image: base64StringWithPrefix.split(',')[1],
          isPrincipal: isPrincipal,
        })
        return base64StringWithPrefix.split(',')[1]
      };
      reader.onerror = (error) => {
        console.error('Erreur lors de la conversion du fichier en Base64:', error);
      };

      reader.readAsDataURL(file);
      return file.name;
    }
    return null;
  }
  modifierPhotosPourLogement() {

  }

  supprimerPhoto(index: number): void {
    if (index >= 0 && index < this.photos.length) {
      const photoSupprimee = this.photos[index];
      this.photos.splice(index, 1);
      if(photoSupprimee.isPrincipal && this.photos.length > 0){
        this.photos[0].isPrincipal = true;
      }
    } else {
      console.error('Index invalide :', index);
    }
  }

  definirCommePrincipale(index: number): void {
    this.photos.forEach((photo, i) => {
      photo.isPrincipal = (i === index);
    });
  }

}
