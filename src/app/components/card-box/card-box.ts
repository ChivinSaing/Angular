import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

export type CardBoxItem = {
  title: string;
  description: string;
  imageUrl?: string;
};

@Component({
  selector: 'app-card-box',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card-box.html',
  styleUrl: './card-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CardBox {
  @Input({ required: true }) item!: CardBoxItem;
}
