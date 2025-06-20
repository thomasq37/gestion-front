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
    try {
      // Vérifiez que le fichier est bien encodé en base64
      if (!base64Document.startsWith('data:')) {
        console.error('Le fichier n\'est pas au format Base64 valide.');
        return;
      }

      // Extraire les données base64 et le type de contenu
      const base64Data = base64Document.split(',')[1];
      const contentType = base64Document.split(';')[0].split(':')[1];

      // Convertir base64 en Uint8Array de manière plus efficace
      const byteCharacters = atob(base64Data);
      const byteArray = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: contentType });

      // Méthode robuste pour le téléchargement
      if (this.isMobileDevice()) {
        this.downloadForMobile(blob, nomFichier, base64Document);
      } else {
        this.downloadForDesktop(blob, nomFichier);
      }

    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      this.fallbackDownload(base64Document, nomFichier);
    }
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private downloadForDesktop(blob: Blob, nomFichier: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.style.display = 'none';
    a.href = url;
    a.download = nomFichier;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Nettoyer l'URL après un court délai
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  private downloadForMobile(blob: Blob, nomFichier: string, base64Document: string): void {
    // Pour les appareils mobiles, essayer plusieurs méthodes
    if (this.tryMobileDownload(blob, nomFichier)) {
      return;
    }

    // Fallback pour mobile : utiliser data URL
    this.tryDataUrlDownload(base64Document, nomFichier);
  }

  private tryMobileDownload(blob: Blob, nomFichier: string): boolean {
    try {
      // Vérifier si le navigateur supporte l'attribut download
      const a = document.createElement('a');
      if ('download' in a) {
        const url = URL.createObjectURL(blob);
        a.style.display = 'none';
        a.href = url;
        a.download = nomFichier;

        // Pour mobile, ajouter des événements pour s'assurer du téléchargement
        document.body.appendChild(a);

        // Déclencher le téléchargement avec un léger délai
        setTimeout(() => {
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }, 10);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur téléchargement mobile:', error);
      return false;
    }
  }

  private tryDataUrlDownload(base64Document: string, nomFichier: string): void {
    try {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = base64Document;
      a.download = nomFichier;

      document.body.appendChild(a);

      // Pour Firefox mobile, utiliser un événement touch si disponible
      if ('ontouchstart' in window) {
        const touchEvent = new TouchEvent('touchstart', { bubbles: true });
        a.dispatchEvent(touchEvent);
      }

      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Erreur data URL:', error);
      this.fallbackDownload(base64Document, nomFichier);
    }
  }

  private fallbackDownload(base64Document: string, nomFichier: string): void {
    // Dernière solution : ouvrir dans un nouvel onglet
    try {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${nomFichier}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
              <h3>Téléchargement de: ${nomFichier}</h3>
              <p>Si le téléchargement ne démarre pas automatiquement :</p>
              <a href="${base64Document}" download="${nomFichier}"
                 style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Cliquez ici pour télécharger
              </a>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                Ou faites un clic droit sur le lien et sélectionnez "Enregistrer le lien sous..."
              </p>
              <script>
                setTimeout(function() {
                  var a = document.createElement('a');
                  a.href = '${base64Document}';
                  a.download = '${nomFichier}';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }, 500);
              </script>
            </body>
          </html>
        `);
        newWindow.document.close();
      } else {
        // Si le popup est bloqué, copier le lien dans le presse-papiers
        this.copyToClipboard(base64Document);
        alert('Le téléchargement automatique a échoué. Le lien a été copié dans votre presse-papiers.');
      }
    } catch (error) {
      console.error('Toutes les méthodes ont échoué:', error);
      alert('Impossible de télécharger le fichier. Veuillez réessayer ou utiliser un autre navigateur.');
    }
  }

  private copyToClipboard(text: string): void {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Erreur copie presse-papiers:', err);
      });
    }
  }

  supprimerDocument() {
    this.documentService.supprimerEtMettreAJourCache(this.logementMasqueId, this.idDocumentToDelete).then(() => {
      // Supprime le document localement (affichage dans le tableau)
      const indexToDelete = this.documents.findIndex(doc => doc.masqueId === this.idDocumentToDelete);
      if (indexToDelete !== -1) {
        this.documents.splice(indexToDelete, 1);
      }

      // Navigation optionnelle pour conserver l'URL propre (facultatif si tu restes sur la page)
      this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 8 },
      });
    }).catch(error => {
      console.error('Erreur lors de la suppression du document :', error);
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
