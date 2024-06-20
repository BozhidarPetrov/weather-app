import { Component, Input } from '@angular/core';
import { OneOrMultipleDaysForecast } from '../../types/OneOrMultipleDaysForecast';

@Component({
  selector: 'app-current-weather-card',
  standalone: true,
  imports: [],
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.css',
})
export class CurrentWeatherCardComponent {
  @Input() forecast: OneOrMultipleDaysForecast | undefined;
}
