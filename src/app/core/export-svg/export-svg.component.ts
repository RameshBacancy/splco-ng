import { Component, OnInit, Input, NgZone } from '@angular/core';
import html2canvas from 'html2canvas';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-export-svg',
  templateUrl: './export-svg.component.html',
  styleUrls: ['./export-svg.component.css']
})
export class ExportSvgComponent implements OnInit {
  @Input() dataId;
  public imgSrc = '';
  public pngString;
  public svg;
  public g;

  constructor(public spinnerService: SpinnerService, public ngZone: NgZone) { }

  ngOnInit(): void { }

  export(id) {
    this.spinnerService.openSpinner();
    this.imgSrc = '';

    this.svg = document.querySelector('svg');
    this.g = document.querySelector('g');
    this.svg.style.fill = "white";
    this.svg.style.stroke = "black";
    this.g.removeAttribute("transform");
    this.pngString = document.getElementById(id);
    this.pngString.classList.remove("scroll-ngx-graph");
    this.svg.setAttribute("width", this.pngString.scrollWidth);
    this.svg.setAttribute("height", this.pngString.scrollHeight);

    html2canvas(this.pngString).then(canvas => {
      this.imgSrc = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.download = 'Ngx-Graph.png';
      anchor.href = this.imgSrc;
      anchor.click();

      this.downloadSVG(id);
      this.spinnerService.closeSpinner();
    });

  }

  downloadSVG(id) {
    let a = document.getElementById(id).innerHTML;
    let b = a.match(/<svg.*>(.|\n)*?<\/svg>/);

    var svgBlog = new Blob([b[0]], { type: 'image/svg+xml;chartset=utf-8' });
    var svgUrl = URL.createObjectURL(svgBlog);
    var downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = "Ngx-Graph.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    document.getElementById(id).classList.add("scroll-ngx-graph");
  }
}