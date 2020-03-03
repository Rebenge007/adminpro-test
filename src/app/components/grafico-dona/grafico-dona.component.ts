import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input() public ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public ChartData: number[] = [350, 450, 100];
  @Input() public ChartType: string = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
