import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-first',
  standalone: true,
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
  imports: [FormsModule]  // Include FormsModule in imports array
})
export class FirstComponent {
  @Output() dataEmitter = new EventEmitter<{ name: string; age: number; email: string }>();
  
  formData = {
    name: '',
    age: 0,
    email: ''
  };

  submitForm() {
    alert("Record Submitted");
    console.log('Form Data:', this.formData);
    this.dataEmitter.emit(this.formData);
  }
}
