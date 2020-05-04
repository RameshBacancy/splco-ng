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
  imgSrc = '';
  newSVGString;

  constructor(public spinnerService: SpinnerService, public ngZone: NgZone) { }

  ngOnInit(): void { }

  export(id) {
    this.spinnerService.openSpinner();
    this.imgSrc = '';

    let svg = document.querySelector('svg');
    let g = document.querySelector('g');
    svg.style.fill = "white";
    svg.style.stroke = "black";
    g.style.transform = "matrix(1,0,0,1,0,0)";
    setTimeout(() => {
      svg.style.display = "none";
    }, 0);
    this.imgSrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(this.imgSrc)));
    let pngString = document.getElementById(id);
    this.newSVGString = document.getElementById(id).innerHTML;

    html2canvas(pngString).then(canvas => {
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

    var width = 500, height = 500;
    let svgTag = (this.newSVGString.match(/<svg .*?>/g) || []);
    if (svgTag) {
      width = (svgTag[0].match(/width=".*?"/g) || []);
      if (width && width[0]) {
        width = Number(width[0].substring(7, 10));
      } else {
        width = 300;
      }
      height = (svgTag[0].match(/height=".*?"/g) || []);
      if (height && height[0]) {
        height = Number(height[0].substring(8, 11));
      } else {
        height = 300;
      }
    }
    this.svgString2Image(this.newSVGString, 2 * width, 2 * height, 'png', (dataBlob, filesize) => this.ngZone.run(() => {
    }));
  }

  svgString2Image(pngData, width, height, format, callback) {

    var format = format ? format : 'svg';
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(pngData)));
    var canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    var dl = document.createElement("a");
    document.body.appendChild(dl);
    dl.setAttribute("href", imgsrc);
    dl.setAttribute("download", "Ngx-Graph.svg");
    dl.click();

    this.spinnerService.closeSpinner();
  }
}