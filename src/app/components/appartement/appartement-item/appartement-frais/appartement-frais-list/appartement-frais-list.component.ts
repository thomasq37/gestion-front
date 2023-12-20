import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Frais, PeriodLocation} from "../../../../../models/gestion";
import {GestionService} from "../../../../../services/gestion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appartement-frais-list',
  templateUrl: './appartement-frais-list.component.html',
  styleUrls: ['./appartement-frais-list.component.scss']
})
export class AppartementFraisListComponent implements OnInit, OnChanges{
  @Input() appartementId: number | null = null;
  @Input() appartementFrais: Frais[] = [];
  @Output() fraisToUpdate = new EventEmitter<Frais>();
  @Input() isEditable: boolean = false
  @Input() isPeriode: boolean = false
  @Input() periode: PeriodLocation | null = null;
  totalPages: number;
  currentPage: number = 1;
  userId = parseInt(<string>localStorage.getItem('userId'));


  protected addedFraisSubscription!: Subscription;
  protected updateFraisSubscription!: Subscription;

  constructor(
    private gestionService: GestionService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['periode'] && changes['periode'].currentValue) {
      this.gestionService.obtenirFraisFixePourPeriode(this.userId, this.appartementId, this.periode.id,this.currentPage -1).subscribe(
        frais =>{
          if (frais && frais.content) {
            this.appartementFrais = frais.content
            this.totalPages = frais.totalPages
          } else {
            // Gérer le cas où content est vide ou non défini
            this.appartementFrais = [];
            this.totalPages = 0;
          }
        },
        error => {
          console.log("Erreur lors de la récupération des frais : " + error)
        })
    }
  }

  ngOnInit(): void {
    this.updateFraisSubscription = this.gestionService.fraisUpdatedSubject.subscribe(
      (updatedFrais: Frais) => {
        const index = this.appartementFrais.findIndex(c => c.id === updatedFrais.id);
        if (index !== -1) {
          this.appartementFrais[index] = updatedFrais;
        }
      }
    );
    this.addedFraisSubscription = this.gestionService.fraisAddedSubject.subscribe(frais => {
      if (frais) {
        if(!this.appartementFrais) {
          this.appartementFrais = [];
        }
        this.appartementFrais.unshift(frais);
        if (this.appartementFrais.length > 5) {
          this.appartementFrais.pop();
          this.totalPages = 2
        }
        else if(this.totalPages === 0){
          this.totalPages = 1;
        }
      }
    });

    if(!this.isPeriode && this.appartementId !== null){
      this.gestionService.obtenirFraisFixePourAppartement(this.userId, this.appartementId, this.currentPage -1).subscribe(
        frais =>{
          if (frais && frais.content) {
            this.appartementFrais = frais.content
            this.totalPages = frais.totalPages
          } else {
            // Gérer le cas où content est vide ou non défini
            this.appartementFrais = [];
            this.totalPages = 0;
          }
        },
        error => {
          console.log("Erreur lors de la récupération des frais : " + error)
        })
    }
    if(this.isPeriode && this.isEditable && this.appartementId !== null && this.periode){
      this.gestionService.obtenirFraisFixePourPeriode(this.userId, this.appartementId, this.periode.id,this.currentPage -1).subscribe(
        frais =>{
          if (frais && frais.content) {
            this.appartementFrais = frais.content
            this.totalPages = frais.totalPages
          } else {
            // Gérer le cas où content est vide ou non défini
            this.appartementFrais = [];
            this.totalPages = 0;
          }
        },
        error => {
          console.log("Erreur lors de la récupération des frais : " + error)
        })
    }
  }

  onUpdateFrais(frais: Frais) {
    this.fraisToUpdate.emit(frais);
  }

  onDeleteFrais(fraisId: number | undefined) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) {
      this.gestionService.supprimerUnFraisPourAppartement(this.userId, this.appartementId, fraisId).subscribe(response => {
        if (this.appartementFrais.length === 1) {
          this.totalPages = 1;
          this.currentPage = 1

          if(!this.isPeriode){
            this.gestionService.obtenirFraisFixePourAppartement(this.userId, this.appartementId, this.currentPage -1).subscribe(
              frais =>{
                if (frais && frais.content) {
                  this.appartementFrais = frais.content
                  this.totalPages = frais.totalPages
                } else {
                  // Gérer le cas où content est vide ou non défini
                  this.appartementFrais = [];
                  this.totalPages = 0;
                }
              },
              error => {
                console.log("Erreur lors de la récupération des frais : " + error)
              })
          }
          else{
            this.gestionService.obtenirFraisFixePourPeriode(this.userId, this.appartementId, this.periode.id,this.currentPage -1).subscribe(
              frais =>{
                if (frais && frais.content) {
                  this.appartementFrais = frais.content
                  this.totalPages = frais.totalPages
                } else {
                  // Gérer le cas où content est vide ou non défini
                  this.appartementFrais = [];
                  this.totalPages = 0;
                }
              },
              error => {
                console.log("Erreur lors de la récupération des frais : " + error)
              })
          }
        }
        this.appartementFrais = this.appartementFrais.filter(f => f.id !== fraisId);
        if(this.isPeriode){
          return
        }
        this.fraisToUpdate.emit(undefined);
      })
    }

  }

  onPageChange($event: number) {
    this.currentPage = $event
    if(!this.isPeriode && this.appartementId !== null){
      this.gestionService.obtenirFraisFixePourAppartement(this.userId, this.appartementId, this.currentPage -1).subscribe(
        frais =>{
          if (frais && frais.content) {
            this.appartementFrais = frais.content
            this.totalPages = frais.totalPages
          } else {
            // Gérer le cas où content est vide ou non défini
            this.appartementFrais = [];
            this.totalPages = 0;
          }
        },
        error => {
          console.log("Erreur lors de la récupération des frais : " + error)
        })
    }
    if(this.isPeriode && this.isEditable && this.appartementId !== null && this.periode){
      this.gestionService.obtenirFraisFixePourPeriode(this.userId, this.appartementId, this.periode.id,this.currentPage -1).subscribe(
        frais =>{
          if (frais && frais.content) {
            this.appartementFrais = frais.content
            this.totalPages = frais.totalPages
          } else {
            // Gérer le cas où content est vide ou non défini
            this.appartementFrais = [];
            this.totalPages = 0;
          }
        },
        error => {
          console.log("Erreur lors de la récupération des frais : " + error)
        })
    }
  }
}
