import { Component, OnInit, Input } from '@angular/core';
import { ExportSvgToPngService } from 'src/app/service/export-svg-to-png.service';
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

  constructor(
    public exportSvgToPngService: ExportSvgToPngService,
    public spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void { }

  export(id) {
    var s = document.getElementById(id).getElementsByTagName("svg");
    s[0].style.fill = "transparent";
    s[0].style.stroke = "black";

   
    this.spinnerService.openSpinner();
    this.imgSrc = '';

    var svgString = document.getElementById(id);
    html2canvas(svgString).then(canvas => {
      this.imgSrc = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.download = 'Ngx-Graph.png';
      anchor.href = this.imgSrc;
      anchor.click();
      this.spinnerService.closeSpinner();
    });
  }
}