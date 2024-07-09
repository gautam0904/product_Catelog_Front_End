import { Component } from '@angular/core';
import { Iproduct } from 'src/app/core/interfaces/model';
import { ProductService } from 'src/app/core/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products !: Iproduct [];
  role !: string

  constructor(private product: ProductService) {
    this.role =  JSON.parse(localStorage.getItem('user') as string)?.role || "";
   }

  ngOnInit(): void {


    this.product.getProduct().subscribe({
      next: (resdata : any) => {
        this.products = resdata.data;
        console.log(this.products)
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
