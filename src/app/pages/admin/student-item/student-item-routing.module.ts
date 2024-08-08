import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentItemComponent } from './student-item/student-item.component';

const routes: Routes = [
  {
    path: '',
    component: StudentItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentItemRoutingModule {}
