import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor() { }



  profileForm : IUser | undefined = undefined;

  getProfileForm(){
    return this.profileForm;
  }

  setprofileData(profile : IUser){
    this.profileForm = profile
  }

  deleteprofiledata(){
    this.profileForm = undefined; 
  }

}
