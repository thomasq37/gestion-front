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

  constructor(
    private router: Router,
    private documentService: DocumentService,) {
  }
  supprimerDocument(logementMasqueId: string, documentMasqueId: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer le document pour ce logement ?');
    if (confirmed) {
      this.documentService.supprimerDocument(logementMasqueId, documentMasqueId).then(() => {
        this.router.navigate([`/logements/${this.logementMasqueId}`], {
          queryParams: { tab: 4 },
        });
      }).catch(error => {
        console.error('Erreur lors de la suppression de le document:', error);
      });
    } else {
      console.log('Suppression annulée');
    }
  }

  ajouterUnDocument(logementMasqueId: any) {
    this.router.navigate([`/logements/${logementMasqueId}/document/creer`]);
  }
  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
  }
}
