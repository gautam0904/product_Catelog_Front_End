import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }
  get(){
    return this.http.get('/category/get') as Observable<any[]>
  }

  create(categoryData : Icategory){
    return this.http.post('/category/create' , categoryData)
  }

  update(categoryData :Icategory){
    return this.http.put('/category/update' , categoryData)
  }

  delete(id : string){
    return this.http.delete('/category/delete/${id}' , {params : {}})
  }
}
