import { Service, signal, computed } from '@angular/core';
import { Contact as ContactModel } from '../../models/contact';
import * as guest from '../../data/guest-contacts';

@Service()
export class Contact {
    readonly contacts = signal<ContactModel[]>(structuredClone(guest.contacts));

    readonly sortedContacts = computed(() =>
        [...this.contacts()].sort((a, b) =>
            a.firstname.localeCompare(b.firstname, 'de')
        )
    );
}