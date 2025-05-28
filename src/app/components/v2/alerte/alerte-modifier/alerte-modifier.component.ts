import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlerteDTO} from "../../../../models/v2/entites/Alerte/AlerteDTO.model";
import {AlerteService} from "../../../../services/v2/alerte/alerte.service";

@Component({
  selector: 'app-alerte-modifier',
  templateUrl: './alerte-modifier.component.html',
  styleUrls: ['./alerte-modifier.component.scss']
})
export class AlerteModifierComponent {
  alerteForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  alerteMasqueId: string | null = null;
  loading = false;
  msgConfirmationSuppression = "Voulez-vous vraiment supprimer l'alerte pour ce logement ?"
  isModalVisible = false;
  constructor(
    private formBuilder: FormBuilder,
    private alerteService: AlerteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.alerteForm = this.formBuilder.group({
      probleme: new FormControl('', Validators.required),
      solution: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
      this.alerteMasqueId = params.get('alerteMasqueId');
      if (this.logementMasqueId) {
        this.obtenirAlertePourLogement(this.logementMasqueId, this.alerteMasqueId);
      }
    });
  }

  private async obtenirAlertePourLogement(logementMasqueId: string, alerteMasqueId: string): Promise<void> {
    try {
      const alerte = await this.alerteService.obtenirAlertePourLogement(logementMasqueId, alerteMasqueId);
      this.alerteForm.patchValue(alerte);
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Impossible de charger l\'alerte.');
    }
    finally {
      this.loading = false;
    }
  }

  async modifierAlertePourLogement(): Promise<void> {
    this.loading = true;

    const alerte: AlerteDTO = this.alerteForm.value as AlerteDTO;
    try {
      await this.alerteService.modifierAlertePourLogement(this.logementMasqueId, this.alerteMasqueId, alerte);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 7 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }

  supprimerAlertePourLogement() {
    this.alerteService.supprimerAlertePourLogement(this.logementMasqueId, this.alerteMasqueId).then(() => {
      this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 7 },
      });
    }).catch(error => {
      console.error('Erreur lors de la suppression de l\'alerte:', error);
    });
  }
  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  confirmDelete(): void {
    this.isModalVisible = false;
    this.supprimerAlertePourLogement()
  }
}
