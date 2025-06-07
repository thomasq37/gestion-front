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
  formCalcule: boolean = false;
  capacitesParDuree: { duree: number; montant: number }[] = [];
  mensualiteCible: number | null = null;

  constructor(private fb: FormBuilder) {
    this.revenusForm = this.fb.group({
      revenus: this.fb.array([]) // tableau dynamique
    });
    this.ajouterRevenu();
    this.charges = this.fb.group({
      charges: this.fb.array([])
    });
    this.ajouterCharge();
    this.emprunt = this.fb.group({
      taux: [0, [Validators.required, Validators.max(100)]],
      tauxEndettementAutorise: [33, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

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

  // charges

  get listeCharges(): FormArray {
    return this.charges.get('charges') as FormArray;
  }

  ajouterCharge(): void {
    const charge = this.fb.group({
      montant: [0, [Validators.required, Validators.min(1)]]
    });
    this.listeCharges.push(charge);
  }

  supprimerCharge(index: number): void {
    if (index > 0) {
      this.listeCharges.removeAt(index);
    }
  }

  dernierMontantChargeValide(): boolean {
    const dernier = this.listeCharges.at(this.listeCharges.length - 1);
    return dernier && dernier.get('montant')?.value > 0;
  }

  // emprunt

  getTotalRevenusPrisEnCharge(): number {
    return this.revenus.controls.reduce((total, group) => {
      const montant = group.get('montant')?.value || 0;
      const pourcentage = group.get('pourcentagePrisEnCharge')?.value || 0;
      return total + (montant * pourcentage) / 100;
    }, 0);
  }

  getTotalCharges(): number {
    return this.listeCharges.controls.reduce((total, group) => {
      return total + (group.get('montant')?.value || 0);
    }, 0);
  }

  getTauxEndettement(): number {
    const revenus = this.getTotalRevenusPrisEnCharge();
    const charges = this.getTotalCharges();
    if (revenus === 0) return 0;
    return (charges / revenus) * 100;
  }


  naviguerEtape(number: number) {
    if (this.formCalcule && this.etapeEnCours === 3 && number < 3) {
      // On reste sur l'étape 3 mais on réinitialise le résultat du calcul
      this.formCalcule = false;
      this.capacitesParDuree = [];
      this.mensualiteCible = null;
      return;
    }

    this.etapeEnCours = number;
  }

  calculerMaCapaciteEmprunt(): void {
    this.formCalcule = true;

    const tauxAnnuel = this.emprunt.get('taux')?.value / 100;
    const tauxEndettementAutorise = this.emprunt.get('tauxEndettementAutorise')?.value;
    const revenusPrisEnCharge = this.getTotalRevenusPrisEnCharge();
    const charges = this.getTotalCharges();

    if (!revenusPrisEnCharge || !tauxEndettementAutorise) return;

    // Mensualité maximale autorisée
    this.mensualiteCible = (revenusPrisEnCharge * tauxEndettementAutorise / 100) - charges;

    if (this.mensualiteCible <= 0) {
      this.capacitesParDuree = [];
      return;
    }


    const durees = [10, 15, 20, 25];
    this.capacitesParDuree = durees.map(duree => {
      const n = duree * 12;
      const tauxMensuel = tauxAnnuel / 12;

      let montant = 0;

      if (tauxMensuel === 0) {
        montant = this.mensualiteCible * n;
      } else {
        montant = this.mensualiteCible * (1 - Math.pow(1 + tauxMensuel, -n)) / tauxMensuel;
      }

      return {
        duree,
        montant: Math.round(montant / 100) * 100
      };
    });
  }

  reinitialiserFormulaire(): void {
    this.revenus.clear();
    this.ajouterRevenu();

    this.listeCharges.clear();
    this.ajouterCharge();

    this.emprunt.reset({
      montantEmprunt: 0,
      taux: 0,
      tauxEndettementAutorise: 33
    });

    this.etapeEnCours = 1;
    this.formCalcule = false;
  }

}
