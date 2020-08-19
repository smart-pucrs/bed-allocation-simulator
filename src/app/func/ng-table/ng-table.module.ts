import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgTableComponent } from './ng-table.component';
import { NgTableFilteringDirective } from './ng-table-filtering.directive';
import { NgTablePagingDirective } from './ng-table-paging.directive';
import { NgTableSortingDirective } from './ng-table-sorting.directive';

@NgModule({
  declarations: [NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective],
  imports: [
    CommonModule
  ],
  exports: [NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective],
})

export class NgTableModule { }
