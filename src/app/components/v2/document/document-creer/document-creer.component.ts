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

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.documentForm = this.formBuilder.group({
      documentExistant: new FormControl('', Validators.required), // ID du document existant
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
      if (file.type !== 'application/pdf') {
        this.error = 'Seuls les fichiers PDF sont autorisés.';
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
        const documentDTO: DocumentDTO = {
          masqueId: '',
          nom: this.selectedFile.name,
          fichier: await this.convertFileToBase64(this.selectedFile),
        };
        await this.documentService.ajouterDocument(this.logementMasqueId, documentDTO);
      } else {
        // Sinon, vérifier si un document existant est sélectionné
        const documentExistant = this.documentForm.get('documentExistant')?.value;
        if (documentExistant) {
          await this.documentService.associerDocumentExistant(this.logementMasqueId, documentExistant);
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
  isFormInvalid(): boolean {
    // Désactiver si un fichier est sélectionné ET un document existant est choisi
    return (!this.selectedFile && !this.documentForm.valid) || (this.selectedFile && this.documentForm.get('documentExistant')?.value);
  }
}
