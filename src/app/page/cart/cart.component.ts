import { AfterViewInit, Component, Input } from '@angular/core';
import { CouponService } from 'src/app/core/coupon.service';
import { Icoupon, Iproduct } from 'src/app/core/interfaces/model';
import { SharedService } from 'src/app/core/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements AfterViewInit {
  product !: Iproduct;
  coupons !: Icoupon[];
  buyprice !: number;
  quantity = 1;

  constructor(
    private sharedService: SharedService,
    private couponService : CouponService
  ) { }

  ngAfterViewInit(): void {
    const prod= this.sharedService.getproduct();
    if(prod){
      this.product = prod;
      this.buyprice = this.product.price
      
    }
  }

  plus(){
    this.quantity++;
    this.buyprice = this.product.price * this.quantity;
  }

  minus(){
    if(this.quantity > 1){
      this.quantity--;
      this.buyprice = this.product.price * this.quantity;
    }
  }

  getcoupon(){
    this.couponService.getCoupon({
      Quantity : this.quantity,
      Category : this.product.category,
      products : this.product._id,
      buyprice : this.buyprice
    }).subscribe({
      next: (resdata : any) => {  
        this.coupons = resdata;
      },
      error: (err : any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        })
      }
    })
  }
  
}
