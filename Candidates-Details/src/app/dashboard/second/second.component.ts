import { NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [NgIf, MatTableModule, MatPaginatorModule],
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit, AfterViewInit {
  @Input() receivedData?: { name: string; age: number; email: string };

  displayedColumns: string[] = ['Name', 'Age', 'Email'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.logReceivedData();
  }

  logReceivedData(): void {
    if (this.receivedData) {
      console.log(this.receivedData);
      ELEMENT_DATA.push({
        Name: this.receivedData.name,
        Age: this.receivedData.age,
        Email: this.receivedData.email
      });
      
      this.dataSource.data = ELEMENT_DATA;
    } else {
      console.log('No data received');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  Name: string;
  Age: number;
  Email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Name: 'Shubham', Age: 15, Email: 'amanraj06042001@gmail.com' },
  
];
