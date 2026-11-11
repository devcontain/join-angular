import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event =>
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ),
      takeUntilDestroyed()
    ).subscribe(event => {

      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects.split(/[?#]/)[0];

        if ([
          '/privacy-policy',
          '/legal-notice',
          '/login'
        ].includes(url)) {
          this.menu.closeMenu();
        }
      }

      if (event instanceof NavigationCancel) {
        console.error('Navigation abgebrochen:', event.reason);
      }

      if (event instanceof NavigationError) {
        console.error('Navigation fehlgeschlagen:', event.error);
      }
    });
  }
}