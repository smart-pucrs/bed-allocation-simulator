import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SituacaoLeitosComponent } from './situacao-leitos.component';
import { ListagemModule } from '../../../shared/listagem/listagem.module';


@NgModule({
  declarations: [SituacaoLeitosComponent],
  imports: [
    CommonModule,
	ListagemModule
  ],
  providers: [],
  bootstrap: [SituacaoLeitosComponent]
})

export class SituacaoLeitosModule { }


