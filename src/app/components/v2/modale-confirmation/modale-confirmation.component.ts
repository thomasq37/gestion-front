import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modale-confirmation',
  templateUrl: './modale-confirmation.component.html',
  styleUrls: ['./modale-confirmation.component.scss']
})
export class ModaleConfirmationComponent {
  @Input() message: string = 'Êtes-vous sûr de vouloir continuer ?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
