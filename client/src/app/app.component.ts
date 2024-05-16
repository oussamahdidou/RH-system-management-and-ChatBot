import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as d3 from 'd3';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createBarChart();
  }

  private createBarChart(): void {
    const data = [10, 20, 30, 40, 50];

    const svg = d3.select(this.elementRef.nativeElement).select('.chart')
      .append('svg')
      .attr('width', 400)
      .attr('height', 200);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d) => 200 - d)
      .attr('width', 65)
      .attr('height', (d) => d)
      .attr('fill', 'green');
  }}
