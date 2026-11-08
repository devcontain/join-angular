import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  readonly menu = inject(Menu);
  readonly userInitials = signal('G');
}