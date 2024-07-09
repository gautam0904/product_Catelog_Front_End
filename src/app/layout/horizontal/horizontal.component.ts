import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/model';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit  {
  user!: IUser;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string)
  }
}
