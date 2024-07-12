import {  Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // sidebarVisible: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.sidebarState$.subscribe(state => {
      // this.sidebarVisible = state;
    });
  }
 
}