import { Component, OnInit } from '@angular/core';
import { SecurityService, Students } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

students:Students[];
block:boolean = true;

  constructor( private secur: SecurityService) { }

  ngOnInit(): void {
    this.students = this.secur.students;
    if (this.students) {
      this.block = false;
    }else{this.block = true;}
  }

}
