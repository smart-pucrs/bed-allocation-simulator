import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { SituacaoLeitosComponent } from './situacao-leitos/situacao-leitos.component';
import { AlocacaoLeitosComponent } from './alocacao-leitos/alocacao-leitos.component';
import { ChartistModule } from 'ng-chartist';

import { CampoControlErroModule } from '../../func/campo-control-erro/campo-control-erro.module';
import { ListagemModule } from '../../func/listagem/listagem.module';
import { PlanoDeAlocacaoModule } from '../../func/plano-de-alocacao/plano-de-alocacao.module';
import { PacientesInternadosComponent } from './pacientes-internados/pacientes-internados.component';
import { ProfissionaisComponent } from './cadastros/profissionais/profissionais.component';
import { InfraestruturaComponent } from './cadastros/infraestrutura/infraestrutura.component';
import { ProntuariosComponent } from './cadastros/prontuarios/prontuarios.component';
import { AgendamentosComponent } from './cadastros/agendamentos/agendamentos.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ConsultasMedicasComponent } from './cadastros/consultas-medicas/consultas-medicas.component';

@NgModule({
  imports: [
    CommonModule,
	FullPagesRoutingModule,
        ChartistModule,
	ListagemModule,
	CampoControlErroModule,
	PlanoDeAlocacaoModule,
  ],
  declarations: [
	DashboardComponent,
	SituacaoLeitosComponent,
	AlocacaoLeitosComponent,
	PacientesInternadosComponent,
	ProfissionaisComponent,
	InfraestruturaComponent,
	ProntuariosComponent,
	AgendamentosComponent,
	UsuariosComponent,
	ConsultasMedicasComponent
  ]
})
export class FullPagesModule { }
