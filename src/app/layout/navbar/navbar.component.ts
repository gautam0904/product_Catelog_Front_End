import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router){}
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
