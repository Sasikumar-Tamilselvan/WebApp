import { Component, OnInit } from '@angular/core';
import { UiService } from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'WeatherApp';
  public showMenu = false;
  public darkModeActive: boolean;

  constructor(public ui: UiService) {}
  public ngOnInit() {
    this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  public modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
    console.log('toggle');
  }

}
