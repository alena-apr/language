import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminStudentsComponent } from './admin-students/admin-students.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminStudentsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
