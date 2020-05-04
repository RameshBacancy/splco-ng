import { Component, OnInit } from '@angular/core';
declare var saveAs: any;

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  id = 'svg-to-png-demo';

  constructor() { }

  ngOnInit(): void { }
}
