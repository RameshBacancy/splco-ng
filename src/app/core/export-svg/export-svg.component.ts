import { Component, OnInit, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-export-svg',
  templateUrl: './export-svg.component.html',
  styleUrls: ['./export-svg.component.css']
})
export class ExportSvgComponent implements OnInit {
  @Input() dataId;
  imgSrc = '';

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void { }

  export(id) {
    this.spinnerService.openSpinner();
    this.imgSrc = '';
    let svg = document.querySelector('svg');
    let g = document.querySelector('g');
    svg.style.fill = "none";
    svg.style.stroke = "black";
    g.style.transform = "matrix(1,0,0,1,0,0)";
    setTimeout(() => {
      svg.style.display = "none";
    }, 0);
    this.imgSrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(this.imgSrc)));
    let svgString = document.getElementById(id);

    html2canvas(svgString).then(canvas => {
      this.imgSrc = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.download = 'Ngx-Graph.png';
      anchor.href = this.imgSrc;
      anchor.click();
      this.spinnerService.closeSpinner();
      svg.style.removeProperty("fill");
      svg.style.removeProperty("stroke");
      g.style.removeProperty("transform");
      svg.style.display = "block";
    });
  }
}