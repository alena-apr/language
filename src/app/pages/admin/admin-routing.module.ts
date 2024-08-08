import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { StudentItemComponent } from './student-item/student-item/student-item.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'add',
    component: AdminComponent,
  },
  {
    path: 'students',
    component: AdminStudentsComponent,
  },
  {
    path: 'student/:id',
    component: StudentItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
