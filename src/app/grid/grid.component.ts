import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  url = "http://127.0.0.1:4200/api/post_data"
  A = [10,11,12,13,14]
  B = [15,16,17,18,19]

  groupA = new Array;
  groupB = new Array;


  headers = ["Group A", "Group B"];
  
  rows = [1];
  postId = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addData(val : any, td_num : number) {
    if(td_num == 1){
      this.groupA = convertToNumbers(val);
    }
    else{
      this.groupB = convertToNumbers(val);
    }
     
  }

  calculateResults(){
    console.log(this.groupA);
    console.log(this.groupB);
    this.http.post<any>(this.url, {"A":this.A, "B":this.B}).subscribe(data => {
      this.postId = data.id;
      console.log(data)
    })
  }

  
}

function convertToNumbers(inputData : any) {
  inputData = inputData.getElementsByTagName('td');
  var len = inputData.length;
      var numbersA = [len];
      for(var i = 0; i < len; i++) {
        inputData[i].innerHTML =  inputData[i].innerHTML.replace(',', '.');
        numbersA[i] = parseFloat(inputData[i].innerHTML);
      }
  return numbersA;
}
