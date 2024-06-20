import { Day } from './Day';

export interface Forecast {
  forecastday: {
    0: Day;
    1: Day;
    2: Day;
  };
}
