import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng-select';

import { PlanoTableComponent } from './plano-table.component';


@NgModule({
  declarations: [PlanoTableComponent,],
  imports: [
    CommonModule,
	SelectModule,
  ],
  exports: [PlanoTableComponent,],
})
export class PlanoTableModule { }
