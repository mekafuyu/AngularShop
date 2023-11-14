import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  savedText = ""
  text = ""
  
  onClick()
  {
    this.savedText = this.text;
  }

  update(event: any)
  {
    this.text = event.target.value;
  }
}
