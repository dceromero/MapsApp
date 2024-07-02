import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css'
})
export class CounterAloneComponent {

  @Input() incremento:number = 0;
  increment(numero:number) {
    this.incremento= this.incremento + numero;
  }
}
