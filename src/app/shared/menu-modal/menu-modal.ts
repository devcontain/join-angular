import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-menu-modal',
  styleUrl: './menu-modal.scss',
  templateUrl: './menu-modal.html',
})
export class MenuModal {
  readonly closed = output<void>();

  closeMenu(): void {
    this.closed.emit();
  }
}
