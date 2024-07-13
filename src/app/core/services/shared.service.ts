import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private sidebarState = new BehaviorSubject<boolean>(false); 
  sidebarState$ = this.sidebarState.asObservable();
  private product : Iproduct | undefined;
  toggleSidebar(value :boolean) {
    this.sidebarState.next(value);
  }

  setSidebarState(state: boolean) {
    this.sidebarState.next(state);
  }

  getproduct(){
    return this.product;
  }

  setproductData(p : Iproduct){
    this.product = p
  }

  deleteproductData(){
    this.product = undefined; 
  }

}
