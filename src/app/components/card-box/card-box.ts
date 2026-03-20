import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

export type CardBoxItem = {
  name: string;
  imageUrl: string;
  price: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
};

@Component({
  selector: 'app-card-box',
  standalone: true,
  imports: [ButtonModule, TagModule],
  templateUrl: './card-box.html',
  styleUrl: './card-box.css',
})

export class CardBox {
  @Input({ required: true }) item!: CardBoxItem;

  getSeverity(status: CardBoxItem['inventoryStatus']): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return 'secondary';
  }
}
