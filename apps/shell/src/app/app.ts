import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{titel()}}</h1>',
})
export class App {
  protected readonly titel = signal('Hallo Verein');
}
