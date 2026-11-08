import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModal } from './shared/menu-modal/menu-modal';
import { Menu } from './shared/menu';
import { Header } from './shared/header/header';
import { Sidebar } from './shared/sidebar/sidebar';
import { Summary } from './features/summary/summary';

@Component({
  selector: 'app-root', 
  imports: [
    RouterOutlet,
    MenuModal,
    Header,
    Sidebar,
    Summary
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join-angular');
  readonly menu = inject(Menu);
}
