import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PlanoDeAlocacaoComponent } from './plano-de-alocacao.component';

import { PlanoTableModule} from '../plano-table/plano-table.module';


@NgModule({
  declarations: [PlanoDeAlocacaoComponent],
  imports: [
    CommonModule,
	PlanoTableModule,
	PaginationModule.forRoot()
  ],
  exports: [PlanoDeAlocacaoComponent],
})
export class PlanoDeAlocacaoModule { }
