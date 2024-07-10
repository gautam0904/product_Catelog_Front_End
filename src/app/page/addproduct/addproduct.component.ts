import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Icategory, Iproduct } from 'src/app/core/interfaces/model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent {

  isedit: boolean = false
  product : Iproduct| null = null
  productForm!: FormGroup;
  selectedFile!: File;
  categories !: Icategory[] ;

  constructor(
    private fb: FormBuilder,
    private prod: ProductService,
    private router: Router,
    private category : CategoryService,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {


    this.productForm = this.fb.group({
      _id : this.product?._id,
      name: ['', Validators.required],
      description: ['', Validators.required],
      productimage: [null, Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
    })
  }

  ngAfterViewInit() {
    this._route.queryParams.subscribe(params => {
     
      this.cdr.detectChanges();
      this.isedit = params['isedit'] as boolean;
      this.category.get().subscribe({
        next: (res : any) => {
          this.categories = res;
        },
        error: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message ,
          });
        }
      })
      if (params['product']) {
        this.product = JSON.parse(params['product'])
      }
    });
    if (this.isedit) {
      this.setInitialValues();
    }
  }


  setInitialValues() {
    // Example of setting initial values
    if (this.product) {
      this.productForm.patchValue({
        _id : this.product._id,
        name: this.product?.name,
        description: this.product?.description,
        price: this.product?.price,
        stock: this.product?.stock,
        category: this.product?.category,
        productimage: this.product?.productimage,
      });
    }

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target && event.target.result && this.product !== null) {
          this.product.productimage = event.target.result as string;

        }
      }
    } else {
      this.product = null
    }

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
    }
  }

  onupdate() {
    this.prod.update(this.productForm.value, this.selectedFile).subscribe({
      next: (resdata: any) => {
        Swal.fire({
          icon: "success",
          title: "Oops...",
          text: resdata.message,
        });
        
        this.router.navigate(['/page'])
      },
      error: (res: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message || res.message,
        });
      }

    })
  }

  onSubmit() {
    
    if (this.productForm.valid) {
      this.prod.create(this.productForm.value, this.selectedFile).subscribe({
        next: (resdata: any) => {
          Swal.fire({
            icon: "success",
            title: "Oops...",
            text: resdata.message,
          });
          this.router.navigate(['/page'])
        },
        error: (res: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.error.message,
          });
        }
      })
    }
  }

}
