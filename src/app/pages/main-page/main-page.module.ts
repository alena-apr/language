import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPageComponent, AuthComponent, RegComponent],
  imports: [CommonModule, MainPageRoutingModule, ReactiveFormsModule],
})
export class MainPageModule {}
