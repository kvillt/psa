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
  pValue = 0;

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
      this.matrix[0][0] = data.fisher.matrix[0][0];
      this.matrix[0][1] = data.fisher.matrix[0][1];
      this.matrix[1][0] = data.fisher.matrix[1][0];
      this.matrix[1][1] = data.fisher.matrix[1][1];
      this.pValue = Number((data.fisher.p).toFixed(3)); 
      // Now it's 3 decimals, change if more or less is needed, I picked 3 for design reasons
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
    var counter = tdOne ? this.numCounterA : this.numCounterB
    var number = inputData.innerText.split("\n")
    number = number[counter++].replace(',', '.')

    tdOne ? this.groupA.push(parseFloat(number)) : this.groupB.push(parseFloat(number))
    tdOne ? this.numCounterA = counter : this.numCounterB = counter
  }

  reload() {
    location.reload();
  }
}
