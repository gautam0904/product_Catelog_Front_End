import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddproductComponent,
    AddcategoryComponent,
    CategoryComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PageModule { }
