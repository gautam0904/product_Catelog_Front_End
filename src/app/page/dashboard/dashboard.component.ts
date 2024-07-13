import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/core/interfaces/model';
import { ProductService } from 'src/app/core/services/product.service';
import { SharedService } from 'src/app/core/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products !: Iproduct [];
  role !: string
  searchForm!: FormGroup;

  constructor(
    private product: ProductService,
    private fb: FormBuilder,
    private prod: ProductService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.role =  JSON.parse(localStorage.getItem('user') as string)?.role || "";
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    })
   }


  ngOnInit(): void {
    this.product.getProduct().subscribe({
      next: (resdata : any) => {
        this.products = resdata.data;
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

  search(){
    if (this.searchForm.get('search')?.valid) {
      this.prod.getfilter(this.searchForm.value).subscribe({
        next: (resdata : any) => {
          if(resdata.result.length == 0) {
            Swal.fire({
              icon: "info",
              title: "No results found",
              text: "No products found with this name",
            })
            return;
          }
          this.products = resdata.result;
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

  ondelete(p: Iproduct){
    const id = p._id as string;
    this.product.delete(id).subscribe({
      next: (resdata : any) => {        
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: resdata.message,
        })
        this.products = this.products.filter(p => p._id!== id)
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

  oncart(p:Iproduct){
    this.sharedService.setproductData(p);
    this.router.navigate(['page/cart'])
  }
}
