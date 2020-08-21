import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { SituacaoLeitosComponent } from './situacao-leitos/situacao-leitos.component';
import { AlocacaoLeitosComponent } from './alocacao-leitos/alocacao-leitos.component';
import { ChartistModule } from 'ng-chartist';

import { ListagemModule } from '../../func/listagem/listagem.module';
import { PlanoDeAlocacaoModule } from '../../func/plano-de-alocacao/plano-de-alocacao.module';

@NgModule({
  imports: [
    CommonModule,
	FullPagesRoutingModule,
        ChartistModule,
	ListagemModule,
	PlanoDeAlocacaoModule,
  ],
  declarations: [
	DashboardComponent,
	SituacaoLeitosComponent,
	AlocacaoLeitosComponent
  ]
})
export class FullPagesModule { }
