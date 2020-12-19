import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  url = "http://127.0.0.1:5000/api/post_data"
  A = [10,11,12,13,14]
  B = [15,16,17,18,19]

  headers = ["Group A", "Group B"];
  
  rows = [1];
  postId = 0;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addData(val: any) {
    console.log(val)
  }

  calculateResults(){
    this.http.post<any>(this.url, {"A":this.A, "B":this.B}).subscribe(data => {
      this.postId = data.id;
      console.log(data)
    })
  }

}
