import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ListagemComponent } from './listagem.component';

import { NgTableModule } from '../ng-table/ng-table.module';

@NgModule({
  declarations: [ListagemComponent],
  imports: [
    CommonModule,
	NgTableModule,
	PaginationModule.forRoot()
  ],
  exports: [ListagemComponent]
})
export class ListagemModule { }
