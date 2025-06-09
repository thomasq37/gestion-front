import { Component } from '@angular/core';
import {PlacementVueEnsembleDTO} from "../../../../models/v2/entites/Placement/PlacementVueEnsembleDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-placement-vue-ensemble',
  templateUrl: './placement-vue-ensemble.component.html',
  styleUrls: ['./placement-vue-ensemble.component.scss']
})
export class PlacementVueEnsembleComponent {
  placements: PlacementVueEnsembleDTO[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.listerPlacements();
  }

  async listerPlacements(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      //this.placements = await this.placementService.listerPlacements();
    } catch (err) {
      this.error = 'Erreur lors du chargement des placements.';
    } finally {
      this.loading = true;
    }
  }

  creerPlacement() {
    this.router.navigate(['/placements/creer']);
  }

  modifierPlacement(placementMasqueId: string) {
    this.router.navigate([`/placements/${placementMasqueId}/modifier`]);
  }
  getTotalPlacements(): number {
    return this.placements.reduce((total, placement) => {
      let capital = placement.capital;
      return total + (isNaN(capital) ? 0 : capital);
    }, 0);
  }


}
