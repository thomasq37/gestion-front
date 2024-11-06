import { Component, OnInit } from '@angular/core';
import { Appartement, Pays } from "../../../../../models/gestion";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GestionService } from "../../../../../services/gestion.service";
import { ActivatedRoute, Router } from "@angular/router";
import {S3Service} from "../../../../../services/s3.service";

@Component({
  selector: 'app-appartement-desc-update',
  templateUrl: './appartement-desc-update.component.html',
  styleUrls: ['./appartement-desc-update.component.scss']
})
export class AppartementDescUpdateComponent implements OnInit {
  appartement: Appartement;
  appartementForm: FormGroup;
  paysList: Pays[] = [];
  dpeLetterList: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non renseigné'];
  dpeFileIsLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private gestionService: GestionService,
    private router: Router,
    private route: ActivatedRoute,
    private s3Service: S3Service
  ) {
    this.appartement = <Appartement>{};
    this.appartementForm = this.formBuilder.group({
      dateAchat: ['', Validators.required],
      numero: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      nombrePieces: ['', Validators.required],
      surface: ['', Validators.required],
      prix: ['', Validators.required],
      fraisNotaireEtNegociation: ['', Validators.required],
      estimation: [''],
      dpe: ['', Validators.required],
      lastDPEUrl: [''],
      balcon: [''],
    });
  }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    this.route.params.subscribe(params => {
      this.gestionService.obtenirUnAppartementParId(userId, +params['id']).subscribe(appartement => {
        this.appartement = appartement;
        this.initAppartementForm(appartement);
        this.gestionService.obtenirListePays().subscribe(data => {
          this.paysList = data;
        });
      });
    });
  }

  initAppartementForm(appartement: Appartement) {
    this.appartementForm.patchValue({
      dateAchat: appartement.dateAchat,
      numero: appartement.numero,
      adresse: appartement.adresse,
      codePostal: appartement.codePostal,
      ville: appartement.ville,
      pays: appartement.pays.name,
      nombrePieces: appartement.nombrePieces,
      surface: appartement.surface,
      prix: appartement.prix,
      fraisNotaireEtNegociation:appartement.fraisNotaireEtNegociation,
      estimation: appartement.estimation,
      dpe: appartement.dpe,
      lastDPEUrl: appartement.lastDPEUrl,
      balcon: appartement.balcon,
    });
  }

  onDpeFileSelected(event: any): void {
    this.dpeFileIsLoading = true;
    const file = event.target.files[0];
    if (file) {
      this.s3Service.uploadFile(file).subscribe(
        (url: string) => {
          this.dpeFileIsLoading = false;
          this.appartementForm.patchValue({ lastDPEUrl: url });
          this.appartement.lastDPEUrl = url;
          console.log('Téléchargement du fichier DPE éffectué avec succés.');
        },
        (error) => {
          this.dpeFileIsLoading = false;
          console.error('Erreur lors du téléchargement du fichier DPE :', error);
        }
      );
    }
  }

  onDeleteDpeFile(): void {
    const dpeUrl = this.appartement.lastDPEUrl;
    const key = dpeUrl.split('.amazonaws.com/images/')[1]; // Adjust this split point based on your S3 URL structure
    console.log(key)
    if (key) {
      this.s3Service.deleteFile(key).subscribe(
        () => {
          this.appartementForm.patchValue({ lastDPEUrl: null });
          this.appartement.lastDPEUrl = null;
          console.log('Fichier DPE supprimé avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression du fichier DPE :', error);
        }
      );
    } else {
      console.error('Clé du fichier DPE non valide. Suppression annulée.');
    }
  }


  mettreAJourUnAppartementPourUtilisateur() {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const updatedAppartementData = this.appartementForm.value;
    const selectedPays = this.paysList.find(p => p.name === updatedAppartementData.pays);
    updatedAppartementData.pays = selectedPays;

    this.appartement = { ...this.appartement, ...updatedAppartementData };

    this.gestionService.mettreAJourUnAppartementPourUtilisateur(userId, this.appartement.id, this.appartement)
      .subscribe(
        appartement => {
          console.log('Appartement mis à jour avec succès.');
          this.router.navigate(['/appartement/' + this.appartement.id]);
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'appartement :', error);
        }
      );
  }
}
