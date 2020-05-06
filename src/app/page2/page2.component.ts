import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  id = 'svg-to-png';

  linkArray = [
    {
      source: 'first',
      target: 'second',
      label: 'is parent of'
    }, {
      source: 'first',
      target: 'c1',
      label: 'custom label'
    }, {
      source: 'first',
      target: 'c2',
      label: 'custom label'
    }, {
      source: 'c1',
      target: 'd',
      label: 'first link'
    }, {
      source: 'c1',
      target: 'd',
      label: 'second link'
    }
  ];

  nodesArray = [
    {
      id: 'first',
      label: 'A'
    }, {
      id: 'second',
      label: 'B'
    }, {
      id: 'c1',
      label: 'C1'
    }, {
      id: 'c2',
      label: 'C2'
    }, {
      id: 'd',
      label: 'D'
    }
  ]

  constructor() { }

  ngOnInit(): void { }

}
