import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListagemComponent } from './listagem.component';

import { NgTableModule } from '../ng-table/ng-table.module';

@NgModule({
  declarations: [ListagemComponent],
  imports: [
    CommonModule,
	NgTableModule
  ],
  exports: [ListagemComponent]
})
export class ListagemModule { }
