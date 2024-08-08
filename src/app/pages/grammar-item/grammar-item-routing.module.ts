import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrammarItemComponent } from './grammar-item/grammar-item.component';

const routes: Routes = [
  {
    path: '',
    component: GrammarItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrammarItemRoutingModule {}
