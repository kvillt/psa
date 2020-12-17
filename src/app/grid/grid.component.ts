import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  headers = ["Value one", "Value two", "Result"];

  rows = [
    {
      "Value one" : 543,
      "Value two" : 75,
      "Result" : 618
    },
    {
      "Value one" : 345,
      "Value two" : 65,
      "Result" : 410
    },
    {
      "Value one" : 215,
      "Value two" : 175,
      "Result" : 390
    },
    {
      "Value one" : 823,
      "Value two" : 83,
      "Result" : 906
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
