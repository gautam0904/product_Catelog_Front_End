import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar'
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { MegaMenuModule } from 'primeng/megamenu';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HorizontalComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    PanelMenuModule,
    DropdownModule,
    MegaMenuModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LayoutModule { }
