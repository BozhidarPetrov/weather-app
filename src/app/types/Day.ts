import { Condition } from './Condition';
import { Hour } from './Hour';

export interface Day {
  astro: {
    is_moon_up: number;
    is_sun_up: number;
    moon_illumination: number;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
  };
  date: string;
  date_epoch: number;
  day: {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: Condition;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    uv: number;
  };
  hour: {
    0: Hour;
    1: Hour;
    2: Hour;
    3: Hour;
    4: Hour;
    5: Hour;
    6: Hour;
    7: Hour;
    8: Hour;
    9: Hour;
    10: Hour;
    11: Hour;
    12: Hour;
    13: Hour;
    14: Hour;
    15: Hour;
    16: Hour;
    17: Hour;
    18: Hour;
    19: Hour;
    20: Hour;
    21: Hour;
    22: Hour;
    23: Hour;
  };
}
