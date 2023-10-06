import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PeriodLocation} from "../../../../models/gestion";

@Component({
  selector: 'app-appartement-periode-manage',
  templateUrl: './appartement-periode-manage.component.html',
  styleUrls: ['./appartement-periode-manage.component.scss']
})
export class AppartementPeriodeManageComponent implements OnInit{
  appartementId!: number;
  isUpdateMode: boolean = false;
  periodeToUpdate: PeriodLocation | null = null;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appartementId = +params['id']
    })
  }

  handleCancelUpdate() {
    this.isUpdateMode = false;
  }

  setPeriodeToUpdate(periode: PeriodLocation) {
    this.periodeToUpdate = periode;
    this.isUpdateMode = !!periode;
  }
}
