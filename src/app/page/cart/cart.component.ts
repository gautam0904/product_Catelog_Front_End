import { Component, Input } from '@angular/core';
import { Iproduct } from 'src/app/core/interfaces/model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input()
  product !: Iproduct;

  
}
