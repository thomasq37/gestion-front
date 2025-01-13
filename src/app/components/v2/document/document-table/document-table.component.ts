import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {DocumentDTO} from "../../../../models/v2/entites/Document/DocumentDTO.model";
import {DocumentService} from "../../../../services/v2/document/document.service";

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent {
  @Input() documents!: DocumentDTO[];
  @Input() logementMasqueId!: string;
  actionsIsVisible: boolean = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer le document pour ce logement ?"
  isModalVisible = false;
  idDocumentToDelete= null;
  constructor(
    private router: Router,
    private documentService: DocumentService,) {
  }


  ajouterUnDocument(logementMasqueId: any) {
    this.router.navigate([`/logements/${logementMasqueId}/document/creer`]);
  }
  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
  }
  telechargerFichier(base64Document: string, nomFichier: string) {
    // Vérifiez que le fichier est bien encodé en base64
    if (!base64Document.startsWith('data:')) {
      console.error('Le fichier n\'est pas au format Base64 valide.');
      return;
    }

    // Crée un Blob à partir du contenu Base64
    const base64Data = base64Document.split(',')[1];
    const contentType = base64Document.split(';')[0].split(':')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    const a = window.document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "DPE " + nomFichier;
    a.click();
    URL.revokeObjectURL(url);
  }
  supprimerDocument() {
    this.documentService.supprimerDocument(this.logementMasqueId, this.idDocumentToDelete).then(() => {
      this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 8 },
      });
      const indexToDelete = this.documents.findIndex(doc => doc.masqueId === this.idDocumentToDelete)
      this.documents.splice(indexToDelete, 1);
    }).catch(error => {
      console.error('Erreur lors de la suppression de le document:', error);
    });
  }
  openModal(masqueId: string): void {
    this.isModalVisible = true;
    this.idDocumentToDelete = masqueId;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  confirmDelete(): void {
    this.isModalVisible = false;
    this.supprimerDocument()
  }
}
