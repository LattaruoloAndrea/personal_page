import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<string>("dark-theme");

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  updateTheme(theme: string) {
    this.themeSignal.update(value => value === "dark-theme" ? "light-theme" : "dark-theme");
  }
}
