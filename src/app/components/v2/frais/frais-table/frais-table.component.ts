import { Component, Input, OnInit } from '@angular/core';
import { FraisDTO } from '../../../../models/v2/entites/Frais/FraisDTO.model';
import { Frequence } from '../../../../models/v2/enumeration/Frequence.enum';

@Component({
  selector: 'app-frais-table',
  templateUrl: './frais-table.component.html',
  styleUrls: ['./frais-table.component.scss'],
})
export class FraisTableComponent implements OnInit {
  @Input() frais!: FraisDTO[];
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  pagedFrais: FraisDTO[] = [];

  ngOnInit() {
    this.frais = this.sortFrais(this.frais);
    this.totalPages = this.calculateTotalPages(this.frais.length, this.itemsPerPage);
    this.updatePagedFrais();
  }

  sortFrais(frais: FraisDTO[]): FraisDTO[] {
    return frais.sort((a, b) => {
      const frequencePriority = (frequence: Frequence): number => {
        switch (frequence) {
          case Frequence.PONCTUELLE:
            return 2;
          default:
            return 1;
        }
      };

      const priorityDiff = frequencePriority(a.frequence) - frequencePriority(b.frequence);
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      return new Date(a.dateDeDebut).getTime() - new Date(b.dateDeDebut).getTime();
    });
  }

  calculateTotalPages(totalElements: number, elementsPerPage: number): number {
    return Math.ceil(totalElements / elementsPerPage);
  }

  updatePagedFrais(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedFrais = this.frais.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagedFrais();
  }

  modifierFrais() {
  }

  getNombreOccurrences(dateDeDebut: string, dateDeFin: string, frequence: Frequence): number {
    if (dateDeFin === null) {
      const dateActuelle = new Date();
      dateDeFin = dateActuelle.toISOString().split('T')[0];
    }
    const jours = Math.ceil((new Date(dateDeFin).getTime() - new Date(dateDeDebut).getTime()) / (1000 * 60 * 60 * 24));
    switch (frequence) {
      case Frequence.MENSUELLE:
        return Math.ceil(jours / 30);
      case Frequence.BIMESTRIELLE:
        return Math.ceil(jours / 60);
      case Frequence.TRIMESTRIELLE:
        return Math.ceil(jours / 90);
      case Frequence.SEMESTRIELLE:
        return Math.ceil(jours / 180);
      case Frequence.ANNUELLE:
        return Math.ceil(jours / 365);
      case Frequence.HEBDOMADAIRE:
        return Math.ceil(jours / 7);
      case Frequence.PONCTUELLE:
        return 1;
      default:
        return 0;
    }
  }
}