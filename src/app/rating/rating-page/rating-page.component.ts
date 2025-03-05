import { Component } from '@angular/core';
import { RatingControlComponent } from '../rating-control/rating-control.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
  selector: 'app-rating-page',
  standalone: true,
  imports: [
    RatingControlComponent,
    LayoutComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './rating-page.component.html',
  styleUrl: './rating-page.component.scss',
})
export class RatingPageComponent {
  ratingControl = new FormControl(0);
}
