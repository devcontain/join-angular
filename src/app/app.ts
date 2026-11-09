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
    Contacts
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join-angular');
  readonly menu = inject(Menu);
}
