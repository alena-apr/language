import { Component } from '@angular/core';
import { GrammarService } from '../../../services/grammar/grammar.service';
import { IExercise } from '../../../models/exercise';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {

  allExercises: IExercise[]

  constructor(
    private grammarServise: GrammarService
  ) { }
  

  ngOnInit() {
    this.grammarServise.getAllGrammarForAdmin().subscribe((data) => {
      console.log('ALL EXERCISES', data);
      this.allExercises = data;
    } )
  }

  deleteExerciseById(id: any) {
    this.grammarServise.deleteExerciseById(id).subscribe((data) => {
      console.log(data);
    })
  }

}
