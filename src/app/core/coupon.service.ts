import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcouponFilter } from './interfaces/icoupon-filter';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private http : HttpClient
  ) { }

  getCoupon(couponfilter: IcouponFilter){
    return this.http.get('/coupon/get' , {params : {
      Quantity : couponfilter.Quantity,
      Category : couponfilter.Category,
      products : couponfilter.products,
      buyprice : couponfilter.buyprice
    }});
  }

}
