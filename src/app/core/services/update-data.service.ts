import { Injectable } from '@angular/core';
import { Icategory, IUser } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor() { }



  profileForm : IUser | undefined = undefined;
  categoryForm : Icategory | undefined = undefined;

  getProfileForm(){
    return this.profileForm;
  }

  setprofileData(profile : IUser){
    this.profileForm = profile
  }

  deleteprofiledata(){
    this.profileForm = undefined; 
  }
  getCategoryForm(){
     return this.categoryForm as Icategory;
  }

  setCategoryData(c : Icategory){
    this.categoryForm = c
  }

  deleteCategorydata(){
    this.categoryForm = undefined; 
  }

}
