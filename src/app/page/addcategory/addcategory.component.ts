import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icategory } from 'src/app/core/interfaces/model';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent {
  isedit: boolean = false
  clonecategory : Icategory| null = null
  categoryForm!: FormGroup;
  categories !: Icategory[] ;

  constructor(
    private fb: FormBuilder,
    private category: CategoryService,
    private router: Router,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {


    this.categoryForm = this.fb.group({
      _id : this.clonecategory?._id,
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngAfterViewInit() {
    this._route.queryParams.subscribe(params => {
     
      this.cdr.detectChanges();
      this.isedit = params['isedit'] as boolean;
      if (params['category']) {
        this.clonecategory = JSON.parse(params['isedit']);
      }
      this.category.get().subscribe({
        next: (res : any) => {
          this.categories = res.data;
        },
        error: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      })
      if (params['category']) {
        this.category = JSON.parse(params['category'])
      }
    });
    if (this.isedit) {
      this.setInitialValues();
    }
  }


  setInitialValues() {
    if (this.clonecategory) {
      this.categoryForm.patchValue({
        name: this.clonecategory?.name,
        description: this.clonecategory?.description,
      });
    }

  }



  onupdate() {
    this.category.update(this.categoryForm.value).subscribe({
      next: (resdata: any) => {
       Swal.fire({
         icon: "success",
         title: "Oops...",
         text: resdata.message,
       })
        this.router.navigate(['/page'])
      },
      error: (res: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message,
        })
      }

    })
  }

  onSubmit() {
    
  //   if (this.productForm.valid) {
  //     this.prod.create(this.productForm.value, this.selectedFile).subscribe({
  //       next: (resdata: any) => {
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: resdata.message });
  //         this.router.navigate(['/page'])
  //       },
  //       error: (res: any) => {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
  //       }
  //     })
    }
  }

