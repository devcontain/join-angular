import { Component, input, output } from '@angular/core';
import { Contact as ContactModel } from '../../../models/contact';

@Component({
  imports: [],
  selector: 'app-contact-modal',
  styleUrl: './contact-modal.scss',
  templateUrl: './contact-modal.html',
})
export class ContactModal {
  readonly contact = input.required<ContactModel>();
  readonly close = output<void>();

  closeModal(): void {
    this.close.emit();
  }
}
