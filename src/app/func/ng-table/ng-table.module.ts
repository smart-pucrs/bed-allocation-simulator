import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgTableComponent } from './ng-table.component';
import { NgTablePagingDirective } from './ng-table-paging.directive';
import { NgTableSortingDirective } from './ng-table-sorting.directive';
import { NgTableFilteringDirective } from './ng-table-filtering.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
	NgTableComponent, 
	NgTablePagingDirective, 
	NgTableSortingDirective, 
	NgTableFilteringDirective
  ],
  exports: [
	NgTableComponent, 
	NgTablePagingDirective, 
	NgTableSortingDirective, 
	NgTableFilteringDirective
  ],
})

export class NgTableModule { }
