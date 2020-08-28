import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanoTableComponent } from './plano-table.component';


@NgModule({
  declarations: [PlanoTableComponent,],
  imports: [
    CommonModule,
  ],
  exports: [PlanoTableComponent,],
})
export class PlanoTableModule { }
