import { Component, inject, signal } from '@angular/core';
import { Contact } from '../../core/services/contact';
import { Contact as ContactModel } from '../../models/contact';
import { ContactModal } from './contact-modal/contact-modal';

@Component({
  imports: [ContactModal],
  selector: 'app-contacts',
  styleUrl: './contacts.scss',
  templateUrl: './contacts.html',
})
export class Contacts {
  readonly contactService = inject(Contact);
  readonly selectedContact = signal<ContactModel | null>(null);
  readonly contactModalOpen = signal(false);

  selectContact(contact: ContactModel): void {
    this.selectedContact.set(contact);
  }

  openContactModal(): void {
    console.log('Edit-Button wurde geklickt');
    this.contactModalOpen.set(true);
  }

  closeContactModal(): void {
    this.contactModalOpen.set(false);
  }
}
