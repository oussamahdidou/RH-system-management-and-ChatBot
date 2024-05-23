import { Component, ElementRef, OnInit } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';

@Component({
  selector: 'app-detail-employer',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './detail-employer.component.html',
  styleUrl: './detail-employer.component.css'
})
export class DetailEmployerComponent  implements OnInit{
 ngOnInit(): void {
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Earthquakes - per month"
      },
      axisX: {
        valueFormatString: "MMM",
        interval: 1,
        intervalType: "month"
      },
      axisY: {
        includeZero: false
      },
      data: [
        {
          type: "line",
          dataPoints: [
            { x: new Date(2012, 0, 1), y: 450 },
            { x: new Date(2012, 1, 1), y: 414 },
            { x: new Date(2012, 2, 1), y: 520, indexLabel: "highest", markerColor: "red", markerType: "triangle" },
            { x: new Date(2012, 3, 1), y: 460 },
            { x: new Date(2012, 4, 1), y: 450 },
            { x: new Date(2012, 5, 1), y: 500 },
            { x: new Date(2012, 6, 1), y: 480 },
            { x: new Date(2012, 7, 1), y: 480 },
            { x: new Date(2012, 8, 1), y: 410, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" },
            { x: new Date(2012, 9, 1), y: 500 },
            { x: new Date(2012, 10, 1), y: 480 },
            { x: new Date(2012, 11, 1), y: 510 }
          ]
        }
      ]
    });

    chart.render();
  }
}