import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-elements',
  templateUrl: './mobile-elements.component.html',
  styleUrls: ['./mobile-elements.component.css']
})
export class MobileElementsComponent implements OnInit {
  currentTime: Date = new Date();

  constructor() { }

  ngOnInit(): void {
      // Update the current time every second
      setInterval(() => {
          this.currentTime = new Date();
      }, 1000);
  }

}
