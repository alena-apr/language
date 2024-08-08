import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesComponent } from './exercises/exercises.component';
import { GrammarComponent } from './grammar/grammar.component';
import { StartComponent } from './start/start.component';
import { adminGuard } from '../../guards/admin/admin.guard';
import { ShelfComponent } from './shelf/shelf.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    children: [
      {
        path: 'start',
        component: ExercisesComponent,
      },
      {
        path: 'grammar',
        component: GrammarComponent,
      },
      {
        path: 'exercise/:id',
        loadChildren: () =>
          import('../grammar-item/grammar-item.module').then(
            (m) => m.GrammarItemModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
        canActivate: [adminGuard],
      },
      {
        path: 'shelf',
        component: ShelfComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExescisesRoutingModule {}
