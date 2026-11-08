import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Menu {
    readonly menuOpen = signal(false);

    toggleMenu(): void {
        const isopen = this.menuOpen();

        if (isopen) {
            this.menuOpen.set(false);
        } else {
            this.menuOpen.set(true);
        }
    }

/*     toggleMenu(): void {
        this.menuOpen.set(!this.menuOpen());
    } */

    closeMenu(): void {
        this.menuOpen.set(false);
    }
}