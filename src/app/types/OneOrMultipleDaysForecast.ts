import { Current } from './Current';
import { Forecast } from './Forecast';
import { Location } from './Location';

export interface OneOrMultipleDaysForecast {
  current: Current;
  forecast: Forecast;
  location: Location;
}
