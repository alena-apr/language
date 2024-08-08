import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrammarItemRoutingModule } from './grammar-item-routing.module';
import { GrammarItemComponent } from './grammar-item/grammar-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GrammarItemComponent],
  imports: [CommonModule, GrammarItemRoutingModule, ReactiveFormsModule],
})
export class GrammarItemModule {}
