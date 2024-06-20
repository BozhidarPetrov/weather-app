import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OneOrMultipleDaysForecast } from '../types/OneOrMultipleDaysForecast';
import { Day } from '../types/Day';
import { debounceTime } from 'rxjs';
import { Suggestion } from '../types/Suggestion';
import { LogoComponent } from '../shared/logo/logo.component';
import { CurrentWeatherCardComponent } from '../shared/current-weather-card/current-weather-card.component';
import { MultipleDaysCardComponent } from '../shared/multiple-days-card/multiple-days-card.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LogoComponent,
    CurrentWeatherCardComponent,
    MultipleDaysCardComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  form = this.fb.nonNullable.group({
    location: ['', Validators.required],
    days: ['1'],
  });

  hasForecast: boolean = false;
  hasError: boolean = false;
  apiError: string | undefined;

  suggestionString = '';
  suggestions: Suggestion[] = [];

  forecast: OneOrMultipleDaysForecast | undefined;
  days: Day[] = [];
  oneOrThreeDayForecast: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form
      .get('location')
      ?.valueChanges.pipe(debounceTime(2000))
      .subscribe((x) => {
        if (x.length > 2) {
          this.suggestionString = x;

          this.http
            .get<Suggestion[]>(
              `http://api.weatherapi.com/v1/search.json?key=f0fecc3d3782435a85782417241805&q=${x}`
            )
            .subscribe((result) => {
              this.suggestions = result;
            });
        } else {
          this.suggestions = []; //to clear the suggestions
        }
      });
  }

  getWeather(): void {
    this.days = []; //to clear the screen
    const searchLocation = this.form.getRawValue().location;
    const numberOfDays = this.form.getRawValue().days;

    if (searchLocation) {
      if (Number(numberOfDays) === 1 || Number(numberOfDays) === 3) {
        this.oneOrThreeDayForecast = true;
      } else {
        this.oneOrThreeDayForecast = false; //5 and 7 days forecast require a paid weatherapi subscription, so curretnly only 1 and 3 are working.
      }

      this.http
        .get<OneOrMultipleDaysForecast>(
          `http://api.weatherapi.com/v1/forecast.json?key=f0fecc3d3782435a85782417241805&q=${searchLocation}&days=${numberOfDays}`
        )
        .subscribe({
          next: (forecast) => {
            this.hasForecast = true;
            this.hasError = false;

            this.forecast = forecast;

            for (let day of Object.values(this.forecast.forecast.forecastday)) {
              this.days.push(day);
            }

            this.days.shift(); //removes the current day from the arr, as we use CURRENT for it
          },
          error: (err) => {
            this.apiError = err.error.error.message;
            this.hasError = true;
            this.hasForecast = false;
          },
        });
    } else {
      this.hasError = true;
      this.hasForecast = false;
      this.apiError = 'Please select a location!';
    }
  }
}
