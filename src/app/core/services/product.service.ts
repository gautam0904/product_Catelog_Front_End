import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IfilterProduct, Iproduct } from '../interfaces/model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getProduct(id : string = ""): Observable<Iproduct>{
    return this.http.get('/product/get' , {params : {Id : id}}) as Observable<Iproduct>
  }

  update(updateData: Iproduct, imageFile: File) {
    
    if (updateData.productimage) {
      const updateformData = new FormData();
      updateformData.append('id' , updateData._id )
      updateformData.append('name', updateData.name);
      updateformData.append('description', updateData.description);
      updateformData.append('price', updateData.price.toString());
      updateformData.append('stock', updateData.stock.toString());
      updateformData.append('category', updateData.category);
      updateformData.append('productImage', imageFile, imageFile.name);

      return this.http.put('/product/updatepicture', updateformData)

    } else {
      return this.http.put('/product/update', updateData)
    }
  }

  create(productData: Iproduct, imageFile: File) {

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('stock', productData.stock.toString());
    formData.append('category', productData.category);
    formData.append('productimage', imageFile, imageFile.name);

    return this.http.post('/product/create', formData)
  }

  delete(id: string){
    return this.http.delete('/product/delete', {params : {Id : id}})
  }

  getfilter(data : IfilterProduct){
    return this.http.get('/product/getfiltered' ,{params: {
      search : data.search
    }})
  }
}
