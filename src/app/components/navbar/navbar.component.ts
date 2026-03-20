import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  profileMenuOpen = false;

  @ViewChild('profileMenuRoot', { read: ElementRef })
  profileMenuRoot?: ElementRef<HTMLElement>;

  toggleProfileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const root = this.profileMenuRoot?.nativeElement;
    if (!root || !this.profileMenuOpen) return;
    if (!root.contains(event.target as Node)) {
      this.profileMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.profileMenuOpen) {
      this.profileMenuOpen = false;
    }
  }
}

