import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FraisDTO } from '../../../../models/v2/entites/Frais/FraisDTO.model';
import { Frequence } from '../../../../models/v2/enumeration/Frequence.enum';
import {Router} from "@angular/router";
import {FunctionsUtil} from "../../util/functions-util";
import { CategorieFrais } from 'src/app/models/v2/enumeration/CategorieFrais.enum';

@Component({
  selector: 'app-frais-table',
  templateUrl: './frais-table.component.html',
  styleUrls: ['./frais-table.component.scss'],
})
export class FraisTableComponent implements OnInit, OnChanges {
  @Input() frais!: FraisDTO[];
  @Input() logementMasqueId!: string;
  @Input() periodeMasqueId?: string;
  @Input() creditMasqueId?: string;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagedFrais: FraisDTO[] = [];
  actionsIsVisible: boolean = false;
  occurrencesMap: { [key: string]: number } = {};
  protected readonly FunctionsUtil = FunctionsUtil;
  public readonly CategorieFrais = CategorieFrais;
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.initialiserFraisTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['frais'] && !changes['frais'].firstChange) {
      this.initialiserFraisTable();
    }
  }

  private initialiserFraisTable(): void {
    this.frais = this.sortFrais(this.frais);
    this.totalPages = this.calculateTotalPages(this.frais.length, this.itemsPerPage);
    this.occurrencesMap = this.frais.reduce((map, fraisItem) => {
      map[fraisItem.masqueId] = this.calculerOccurrences(fraisItem.frequence, fraisItem.dateDeDebut, fraisItem.dateDeFin);
      return map;
    }, {} as { [key: string]: number });
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
      return new Date(b.dateDeDebut).getTime() - new Date(a.dateDeDebut).getTime();
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

  modifierFrais(fraisMasqueId: string) {
    let queryParams = {};
    if(this.periodeMasqueId){
      queryParams = { periodeMasqueId: this.periodeMasqueId }
    }
    else if(this.creditMasqueId){
      queryParams = { creditMasqueId: this.creditMasqueId }
    }
    this.router.navigate([`/logements/${this.logementMasqueId}/frais/${fraisMasqueId}/modifier`], { queryParams });
  }

  ajouterUnFrais() {
    let queryParams = {};
    if(this.periodeMasqueId){
      queryParams = { periodeMasqueId: this.periodeMasqueId }
    }
    else if(this.creditMasqueId){
      queryParams = { creditMasqueId: this.creditMasqueId }
    }
    this.router.navigate([`/logements/${this.logementMasqueId}/frais/creer`], { queryParams });
  }

  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
  }


  calculerOccurrences(frequence: Frequence, dateDeDebut: string, dateDeFin: string) {
    if (dateDeFin === null) {
      const dateActuelle = new Date();
      dateDeFin = dateActuelle.toISOString().split('T')[0];
    }
    const jours = Math.floor((new Date(dateDeFin).getTime() - new Date(dateDeDebut).getTime()) / (1000 * 60 * 60 * 24));
    const joursParFrequence: { [key in Frequence]: number } = {
      [Frequence.MENSUELLE]: 30,
      [Frequence.BIMESTRIELLE]: 60,
      [Frequence.TRIMESTRIELLE]: 90,
      [Frequence.SEMESTRIELLE]: 180,
      [Frequence.ANNUELLE]: 365,
      [Frequence.HEBDOMADAIRE]: 7,
      [Frequence.PONCTUELLE]: Infinity, // Cas particulier
    };

    if (frequence === Frequence.PONCTUELLE) {
      return 1;
    }

    return Math.floor(jours / (joursParFrequence[frequence] || Infinity));
  }
}
