import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
  {
    path: 'exercises',
    loadChildren: () =>
      import('./pages/exercises/exercises.module').then(
        (m) => m.ExercisesModule
      ),
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
