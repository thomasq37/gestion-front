import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlerteService} from "../../../../services/v2/alerte/alerte.service";
import {AlerteDTO} from "../../../../models/v2/entites/Alerte/AlerteDTO.model";

@Component({
  selector: 'app-alerte-creer',
  templateUrl: './alerte-creer.component.html',
  styleUrls: ['./alerte-creer.component.scss']
})
export class AlerteCreerComponent {
  alerteForm: FormGroup;
  error: string | null = null;
  logementMasqueId: string | null = null;
  loading = false;
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
    this.activatedRoute.paramMap.subscribe(params => {
      this.logementMasqueId = params.get('logementMasqueId');
    });
  }

  async creerAlertePourLogement(): Promise<void> {

    this.loading = true
    const alerte: AlerteDTO = this.alerteForm.value as AlerteDTO;
    try {
      await this.alerteService.creerAlertePourLogement(this.logementMasqueId, alerte);
      await this.router.navigate([`/logements/${this.logementMasqueId}`], {
        queryParams: { tab: 6 },
      });
    } catch (error: any) {
      console.warn(error);
      this.error = (error?.message || 'Une erreur inconnue est survenue.');
    }
    finally {
      this.loading = false;
    }
  }
}
