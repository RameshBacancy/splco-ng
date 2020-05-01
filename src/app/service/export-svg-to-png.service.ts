import { Injectable, NgZone } from '@angular/core';
import { SpinnerService } from './spinner.service';
declare var saveAs: any;

@Injectable({
  providedIn: 'root'
})
export class ExportSvgToPngService {

  constructor(private spinnerService: SpinnerService, private ngZone: NgZone) { }
  pngData

  export(svgString) {
    this.pngData = svgString;
    this.spinnerService.openSpinner();
    var width = 400, height = 400;

    // var svgString = document.getElementById('export-SVG').innerHTML;
    let svgTag = (svgString.match(/<svg .*?>/g) || []);
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
    // this.svgString2Image(svgString, 2 * width, 2 * height, 'png', this.save);
    this.svgString2Image(this.pngData, 2 * width, 2 * height, 'png', (dataBlob, filesize) => this.ngZone.run(() => {
      this.spinnerService.closeSpinner();
      console.log('3')
      const url = window.URL.createObjectURL(dataBlob);
      const anchor = document.createElement("a");
      anchor.download = 'D3 vis exported to PNG.png';
      anchor.href = url;
      anchor.click();
    }));
  }

  svgString2Image(pngData, width, height, format, callback) {

    var format = format ? format : 'png';
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(pngData)));
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    var dl = document.createElement("a");
    document.body.appendChild(dl);
    dl.setAttribute("href", imgsrc);
    dl.setAttribute("download", "Demo.svg");
    dl.click();

    this.spinnerService.closeSpinner();
    var image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      canvas.toBlob(function (blob) {
        var filesize = Math.round(blob['length'] / 1024) + ' KB';
        if (callback) {
          callback(blob, filesize);
        }
      });
    };
    image.src = imgsrc;
  }
}
