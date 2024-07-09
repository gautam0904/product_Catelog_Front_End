import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from './interfaces/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getProduct(id : string = ""): Observable<Iproduct>{
    return this.http.get('/product/get' , {params : {Id : id}}) as Observable<Iproduct>
  }
}
