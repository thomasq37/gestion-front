import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fil-ariane',
  templateUrl: './fil-ariane.component.html',
  styleUrls: ['./fil-ariane.component.scss']
})
export class FilArianeComponent {
  @Input() ongletRetour: { label: string, url: any[], queryParams?: any };
  @Input() ongletActuel: string;
}
