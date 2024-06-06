import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatIconModule, NgIf, FirstComponent, SecondComponent]
})
export class DashboardComponent {
  showComponentOne = false;
  showComponentTwo = true;
  receivedData?: { name: string; age: number; email: string };

  showAddRecord() {
    this.showComponentOne = true;
    this.showComponentTwo = false;
  }

  showViewRecord(data?: { name: string; age: number; email: string }) {
    this.showComponentOne = false;
    this.showComponentTwo = true;
    if (data) {
      this.receivedData = data;
    }
  }

  receiveData(data: { name: string; age: number; email: string }) {
    this.receivedData = data;
    this.showViewRecord(data); 
  }
}
