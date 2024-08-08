import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { StudentItemRoutingModule } from './student-item-routing.module';
import { StudentItemComponent } from './student-item/student-item.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [StudentItemComponent],
  imports: [CommonModule, StudentItemRoutingModule, ChartModule, ],
})
export class StudentItemModule {}
