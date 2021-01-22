import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

url = "http://68.183.74.23:5000/api/post_data"
  A = [10, 11, 12, 13, 14]
  B = [15, 16, 17, 18, 19]

  isClicked = false;

  numbers = new Array;
  numCounterA = 0;
  numCounterB = 0;

  groupA = new Array;
  groupB = new Array;

  matrix = [[0, 0], [0, 0]];
  fisher_pValue = 0;
  mann_pValue = 0;
  mann_stat = 0;
  norm_pValue = 0;
  norm_stat = 0;

  headers = ["Group A", "Group B"];

  rows = [1];
  postId = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addData(val: any, td_num: number) {
    this.convertToNumbers(val, td_num);
  }

  onPaste(event: ClipboardEvent, td_num: number) {
    var data = event.clipboardData
    var numbers = data?.getData('text');
    this.convertPasteToNumbers(numbers, td_num)
  }

  calculateResults() {
    this.http.post<any>(this.url, { "A": this.groupA, "B": this.groupB }).subscribe(data => {
      this.postId = data.id
      //Fisher values
      this.matrix[0][0] = data.fisher.matrix[0][0];
      this.matrix[0][1] = data.fisher.matrix[0][1];
      this.matrix[1][0] = data.fisher.matrix[1][0];
      this.matrix[1][1] = data.fisher.matrix[1][1];
      this.fisher_pValue = Number((data.fisher.p).toFixed(3)); 

      //Mann Whitney
      this.mann_pValue = Number((data.mannwhitney.p).toFixed(3))
      this.mann_stat = Number((data.mannwhitney.stat).toFixed(3))

      //Normality
      this.norm_pValue =Number((data.normaltest.p).toFixed(3))
      this.norm_stat =Number((data.normaltest.stat).toFixed(3))
    })
  }

  convertPasteToNumbers(inputData: any, td_num: number) {
    var numbers = inputData.split("\n")
    var results = [numbers.length]
    for (var i = 0; i < numbers.length; i++) {
      var number = numbers[i].replace(',', '.')
      results[i] = parseFloat(number)
    }
    td_num == 1 ? this.groupA = results : this.groupB = results;
  }

  convertToNumbers(inputData: any, td_num: number) {
    var tdOne = td_num == 1
    
    if(inputData.keyCode == 13) {
    
      inputData= inputData.target;
      
      var number = inputData.innerText.split("\n")
      number = number.slice(0,-2)
      number = number[number.length-1].replace(',', '.')
      if(!isNaN(number)) {
        tdOne ? this.groupA.push(parseFloat(number)) : this.groupB.push(parseFloat(number))
        console.log("Enter A " + this.groupA)
        console.log("Enter B " + this.groupB)
      } 
    
    }
    if(inputData.keyCode == 8) {
      inputData= inputData.target;
      var numbers = inputData.innerText.split("\n")
      number = numbers[numbers.length-1].replace(',', '.')
      number = parseFloat(number)
      if(isNaN(number)) {
        return  
      }
      if(numbers.length < this.groupA.length) {
        tdOne ? this.groupA.pop() : this.groupB.pop()
        console.log("Back A " + this.groupA)
        console.log("Back B " + this.groupB)
      } 
    }
    
  }

  reload() {
    location.reload();
  }
}
