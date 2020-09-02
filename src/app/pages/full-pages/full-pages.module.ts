import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FormulariosModule } from '../../formularios/formularios.module';
import { SharedModule } from '../../shared/shared.module';
import { ListagemModule } from '../../func/listagem/listagem.module';
import { PlanoDeAlocacaoModule } from '../../func/plano-de-alocacao/plano-de-alocacao.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AlocacaoLeitosComponent } from './alocacao-leitos/alocacao-leitos.component';
import { SituacaoLeitosComponent } from './situacao-leitos/situacao-leitos.component';
import { PacientesInternadosComponent } from './pacientes-internados/pacientes-internados.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ProntuariosComponent } from './cadastros/prontuarios/prontuarios.component';
import { AgendamentosComponent } from './cadastros/agendamentos/agendamentos.component';
import { ProfissionaisComponent } from './cadastros/profissionais/profissionais.component';
import { InfraestruturaComponent } from './cadastros/infraestrutura/infraestrutura.component';
import { ConsultasMedicasComponent } from './cadastros/consultas-medicas/consultas-medicas.component';

@NgModule({
  imports: [
    CommonModule,
	ChartistModule,
	FullPagesRoutingModule,
	SharedModule,
	FormulariosModule,
	ListagemModule,
	PlanoDeAlocacaoModule,
  ],
  declarations: [
	DashboardComponent,
	AlocacaoLeitosComponent,
	SituacaoLeitosComponent,
	PacientesInternadosComponent,
	UsuariosComponent,
	ProntuariosComponent,
	AgendamentosComponent,
	ProfissionaisComponent,
	InfraestruturaComponent,
	ConsultasMedicasComponent
  ]
})
export class FullPagesModule { }
