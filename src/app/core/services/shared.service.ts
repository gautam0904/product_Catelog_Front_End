import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private sidebarState = new BehaviorSubject<boolean>(false); 
  sidebarState$ = this.sidebarState.asObservable();

  toggleSidebar(value :boolean) {
    this.sidebarState.next(value);
  }

  setSidebarState(state: boolean) {
    this.sidebarState.next(state);
  }
}
