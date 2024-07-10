import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icategory } from 'src/app/core/interfaces/model';
import { CategoryService } from 'src/app/core/services/category.service';
import { UpdateDataService } from 'src/app/core/services/update-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  constructor(
    private category : CategoryService ,
    private ud : UpdateDataService,
    private router :Router
  ) { }

  categories : Icategory[] = [];

  ngOnInit(): void {
    this.category.get().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (res) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message || res.message,
        })
      }
    })
  }

  editCategory(c : Icategory){
    this.ud.setCategoryData(c);
  }
  deleteCategory(id : string = ""){
    this.category.delete(id).subscribe({
      next: (res) => {
        this.categories.filter((c) => c._id !== id)
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category deleted successfully.",
        })
        this.ngOnInit();
      },
      error: (res) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message || res.message,
        })
      }
    })
  }
}
