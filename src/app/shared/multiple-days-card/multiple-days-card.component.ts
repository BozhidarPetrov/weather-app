import { Component, Input } from '@angular/core';
import { OneOrMultipleDaysForecast } from '../../types/OneOrMultipleDaysForecast';
import { Day } from '../../types/Day';

@Component({
  selector: 'app-multiple-days-card',
  standalone: true,
  imports: [],
  templateUrl: './multiple-days-card.component.html',
  styleUrl: './multiple-days-card.component.css',
})
export class MultipleDaysCardComponent {
  @Input() forecast: OneOrMultipleDaysForecast | undefined;
  @Input() day: Day | undefined;
  @Input() days: Day[] | undefined;
}
