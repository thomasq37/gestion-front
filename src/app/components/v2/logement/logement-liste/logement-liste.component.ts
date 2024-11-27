import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logement-liste',
  templateUrl: './logement-liste.component.html',
  styleUrls: ['./logement-liste.component.scss']
})
export class LogementListeComponent implements OnInit {
  apiEntiteUrl = 'logements';
  titre = 'Liste des logements';

  colonnes = [
    {
      key: 'proprietaire',
      label: 'Nom du propriétaire',
      formatter: (item: any) => `${item.proprietaire.prenom} ${item.proprietaire.nom}`
    },
    {
      key: 'adresse',
      label: 'Adresse complète',
      formatter: (item: any) =>
        `${item.adresse.numero} ${item.adresse.voie}, ${item.adresse.complementAdresse || ''} - ${item.adresse.codePostal} ${item.adresse.ville}, ${item.adresse.pays}`
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
