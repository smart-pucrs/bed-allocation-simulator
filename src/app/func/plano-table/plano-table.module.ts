import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanoTableComponent } from './plano-table.component';
import { PlanoTableFilteringDirective } from './plano-table-filtering.directive';
import { PlanoTableSortingDirective } from './plano-table-sorting.directive';


@NgModule({
  declarations: [
	PlanoTableComponent,
	PlanoTableFilteringDirective,
	PlanoTableSortingDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
	PlanoTableComponent,
	PlanoTableFilteringDirective,
	PlanoTableSortingDirective,
  ],
})
export class PlanoTableModule { }
