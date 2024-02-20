import {Component, Input, OnInit} from '@angular/core';
import {FormArray} from "@angular/forms";

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit{
  @Input() depensesFormArray: FormArray;

  ngOnInit(): void {
    console.log(this.depensesFormArray)
  }

}
