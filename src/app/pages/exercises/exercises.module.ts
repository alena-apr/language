import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { GrammarComponent } from './grammar/grammar.component';
import { ExescisesRoutingModule } from './exescises-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StartComponent } from './start/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShelfComponent } from './shelf/shelf.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    ExercisesComponent,
    GrammarComponent,
    HeaderComponent,
    FooterComponent,
    StartComponent,
    ShelfComponent,
  ],
  imports: [
    CommonModule,
    ExescisesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgStyle,
    ChartModule,
  ],
})
export class ExercisesModule {}
