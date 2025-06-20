import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DocumentDTO } from '../../../../models/v2/entites/Document/DocumentDTO.model';
import { DocumentService } from '../../../../services/v2/document/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-creer',
  templateUrl: './document-creer.component.html',
  styleUrls: ['./document-creer.component.scss']
})
export class DocumentCreerComponent implements OnInit {
  documentForm: FormGroup;
  logementMasqueId: string | null = null;
  documentsDisponibles: DocumentDTO[] = [];
  selectedFile: File | null = null;
  error: string | null = null;
  loading = false;

  // Types de fichiers acceptés
  private readonly acceptedFileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  // Extensions acceptées pour l'affichage
  private readonly acceptedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp'];

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.documentForm = this.formBuilder.group({
      documentExistant: new FormControl('', Validators.required), // ID du document existant
      nomFichier: new FormControl(''), // Nom personnalisé pour le fichier
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.documentsDisponibles = await this.documentService.listerDocumentsDisponibles(this.logementMasqueId);
    } catch (error: any) {
      console.warn(error);
      this.error = 'Erreur lors du chargement des documents existants.';
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];

      // Vérification du type de fichier
      if (!this.acceptedFileTypes.includes(file.type)) {
        this.error = 'Seuls les fichiers PDF et les images (JPG, PNG, GIF, WebP) sont autorisés.';
        this.selectedFile = null;
        input.value = ''; // Réinitialise l'input
        return;
      }

      // Vérification de la taille (7 Mo = 7 * 1024 * 1024 octets)
      const maxSizeInBytes = 7 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.error = 'La taille du fichier ne doit pas dépasser 7 Mo.';
        this.selectedFile = null;
        input.value = ''; // Réinitialise l'input
        return;
      }

      // Si toutes les vérifications passent
      this.error = null; // Réinitialise les erreurs
      this.selectedFile = file;

      // NOUVELLE LOGIQUE : Désactiver et vider le select des documents existants
      this.documentForm.get('documentExistant')?.setValue('');
      this.documentForm.get('documentExistant')?.disable();

      // Pré-remplir le nom du fichier (sans l'extension) si aucun nom n'est déjà saisi
      const currentName = this.documentForm.get('nomFichier')?.value;
      if (!currentName) {
        const nameWithoutExtension = this.getFileNameWithoutExtension(file.name);
        this.documentForm.patchValue({ nomFichier: nameWithoutExtension });
      }
    }
  }

  // Méthode pour obtenir le nom du fichier sans extension
  private getFileNameWithoutExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
  }

  // Méthode pour obtenir l'extension du fichier
  private getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    return lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
  }

  // Méthode pour obtenir la liste des extensions acceptées
  getAcceptedExtensions(): string {
    return this.acceptedExtensions.join(', ');
  }

  // Méthode pour vérifier si le fichier sélectionné est une image
  isSelectedFileAnImage(): boolean {
    if (!this.selectedFile) return false;
    return this.selectedFile.type.startsWith('image/');
  }

  // Méthode pour obtenir une URL de prévisualisation de l'image
  getImagePreviewUrl(): string | null {
    if (!this.selectedFile || !this.isSelectedFileAnImage()) return null;
    return URL.createObjectURL(this.selectedFile);
  }

  // Méthode pour obtenir le nom final du fichier
  getFinalFileName(): string {
    if (!this.selectedFile) return '';

    const customName = this.documentForm.get('nomFichier')?.value?.trim();
    const extension = this.getFileExtension(this.selectedFile.name);

    return customName ? `${customName}${extension}` : this.selectedFile.name;
  }

  // Nouvelle méthode pour gérer le changement du select
  onDocumentExistantChange(): void {
    const documentExistantValue = this.documentForm.get('documentExistant')?.value;

    if (documentExistantValue) {
      // Si un document existant est sélectionné, supprimer le fichier local
      this.removeSelectedFile();

      // Désactiver l'input file
      const fileInput = document.getElementById('fichier') as HTMLInputElement;
      if (fileInput) {
        fileInput.disabled = true;
      }
    } else {
      // Si aucun document existant n'est sélectionné, réactiver l'input file
      const fileInput = document.getElementById('fichier') as HTMLInputElement;
      if (fileInput) {
        fileInput.disabled = false;
      }
    }
  }

  async ajouterDocument(): Promise<void> {
    if (!this.logementMasqueId) {
      this.error = 'Logement introuvable.';
      return;
    }

    this.loading = true;
    try {
      // Vérifier si un fichier local est sélectionné
      if (this.selectedFile) {
        const finalFileName = this.getFinalFileName();

        const documentDTO: DocumentDTO = {
          masqueId: '',
          nom: finalFileName,
          fichier: await this.convertFileToBase64(this.selectedFile),
        };
        await this.documentService.ajouterEtMettreAJourCache(this.logementMasqueId!, documentDTO);
      } else {
        // Sinon, vérifier si un document existant est sélectionné
        const documentExistant = this.documentForm.get('documentExistant')?.value;
        if (documentExistant) {
          await this.documentService.associerEtMettreAJourCache(this.logementMasqueId!, documentExistant);
        } else {
          throw new Error('Veuillez sélectionner un fichier local ou un document existant.');
        }
      }

      // Redirection après ajout
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 8 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = error?.message || 'Une erreur inconnue est survenue.';
    } finally {
      this.loading = false;
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Méthode modifiée avec logique simplifiée
  isFormInvalid(): boolean {
    // Le formulaire est valide si :
    // - Un fichier local est sélectionné OU
    // - Un document existant est sélectionné
    return !this.selectedFile && !this.documentForm.get('documentExistant')?.value;
  }

  // Méthode modifiée pour réactiver le select
  removeSelectedFile(): void {
    this.selectedFile = null;
    this.error = null;

    // Réinitialiser l'input file
    const fileInput = document.getElementById('fichier') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      fileInput.disabled = false; // Réactiver l'input file
    }

    // NOUVELLE LOGIQUE : Réactiver le select des documents existants
    this.documentForm.get('documentExistant')?.enable();

    // Vider le nom personnalisé du fichier
    this.documentForm.patchValue({ nomFichier: '' });
  }
}
