import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-outil-capacite-emprunt',
  templateUrl: './outil-capacite-emprunt.component.html',
  styleUrls: ['./outil-capacite-emprunt.component.scss']
})
export class OutilCapaciteEmpruntComponent {
  protected etapeEnCours = 1
  charges: FormGroup;
  emprunt: FormGroup;
  revenusForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.revenusForm = this.fb.group({
      revenus: this.fb.array([]) // tableau dynamique
    });
    this.ajouterRevenu(); // on commence avec un revenu
  }

  get revenus(): FormArray {
    return this.revenusForm.get('revenus') as FormArray;
  }

  ajouterRevenu(): void {
    const revenu = this.fb.group({
      montant: [0, [Validators.required, Validators.min(1)]],
      pourcentagePrisEnCharge: [100, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.revenus.push(revenu);
  }

  calculerMontantPrisEnCharge(index: number): number {
    const group = this.revenus.at(index) as FormGroup;
    const montant = group.get('montant')?.value || 0;
    const pourcentage = group.get('pourcentagePrisEnCharge')?.value || 0;
    return (montant * pourcentage) / 100;
  }
  supprimerRevenu(index: number): void {
    this.revenus.removeAt(index);
  }
  dernierMontantValide(): boolean {
    const dernier = this.revenus.at(this.revenus.length - 1);
    return dernier && dernier.get('montant')?.value > 0;
  }
}
