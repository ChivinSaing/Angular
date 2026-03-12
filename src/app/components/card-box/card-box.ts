import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card-box',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card-box.html',
  styleUrl: './card-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CardBox {}
