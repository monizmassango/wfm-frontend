import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
// import { Aos } from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wm-consulting';

  ngOnInit(): void {
    Aos.init();
  }
}
