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
      this.norm_pValue = Number((data.normaltest.p).toFixed(3))
      this.norm_stat = Number((data.normaltest.stat).toFixed(3))
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

  //Handling input for keyCode 13(Enter) and 8(Backspace)
  convertToNumbers(inputData: any, td_num: number) {
    var tdOne = td_num == 1

    switch (inputData.keyCode) {
      case 13:
        var numbers = getNumbers(inputData)
        numbers = numbers.slice(0, -2)
        var number = numbers.last().replace(',', '.')
        number = parseFloat(number)
        if (!isNaN(number)) {
          tdOne ? this.groupA.push(number) : this.groupB.push(number)
        }
        break;
      case 8:
        var numbers = getNumbers(inputData)
        number = numbers.last().replace(',', '.')
        number = parseFloat(number)
        if (isNaN(number)) {
          return
        }
        else if (this.groupA.includes(number)) {
          tdOne ? this.groupA.pop() : this.groupB.pop()
        }
    }
  }

  reload() {
    location.reload();
  }
}

function getNumbers(inputData: any) {
  inputData = inputData.target;
  return inputData.innerText.split("\n")
}

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1]
  }
}