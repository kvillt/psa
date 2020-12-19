import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  
  headers = ["Group A", "Group B"];
  
  rows = [1];

  constructor() { }

  ngOnInit(): void {
  }


  addData(val: any) {
    console.log(val)
  }
}
