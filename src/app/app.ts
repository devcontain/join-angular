import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModal } from './shared/menu-modal/menu-modal';
import { Menu } from './shared/menu';
import { Header } from './shared/header/header';
import { Sidebar } from './shared/sidebar/sidebar';
import { Summary } from './features/summary/summary';
import { AddTask } from './features/add-task/add-task';
import { Board } from './features/board/board';
import { Contacts } from './features/contacts/contacts';
import { PrivacyPolicy } from './features/privacy-policy/privacy-policy';
import { LegalNotice } from './features/legal-notice/legal-notice';
import { Help } from './features/help/help';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuModal,
    Header,
    Sidebar,
    Summary,
    AddTask,
    Board,
    Contacts,
    PrivacyPolicy,
    LegalNotice,
    Help
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join-angular');
  readonly menu = inject(Menu);
}
