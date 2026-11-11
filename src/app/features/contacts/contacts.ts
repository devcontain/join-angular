import { Component, inject, signal } from '@angular/core';
import { Contact } from '../../core/services/contact';
import { Contact as ContactModel } from '../../models/contact';

@Component({
  imports: [],
  selector: 'app-contacts',
  styleUrl: './contacts.scss',
  templateUrl: './contacts.html',
})
export class Contacts {
  readonly contactService = inject(Contact);
  readonly selectedContact = signal<ContactModel | null>(null);

  selectContact(contact: ContactModel): void {
    this.selectedContact.set(contact);
  }
}
