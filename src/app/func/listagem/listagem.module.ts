import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgTableModule } from '../ng-table/ng-table.module';

import { ListagemComponent } from './listagem.component';

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
