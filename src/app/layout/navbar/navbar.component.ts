import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router : Router ,
     private fb : FormBuilder,
     private prod : ProductService
    ){
   
  }
  searchForm !: FormGroup
  
user !: IUser

  

  ngOnInit(): void {
    const user: IUser = JSON.parse(localStorage.getItem('user') as string);
   this.user = user;
  }

  

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
