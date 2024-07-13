import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path : '',
    component : DashboardComponent
  },
  {
    path : 'addproduct',
    component : AddproductComponent
  },
  {
    path : 'addcategory',
    component : AddcategoryComponent
  },{
    path : 'category',
    component : CategoryComponent
  },
  {
    path : 'cart',
    component : CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
