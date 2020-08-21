import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SituacaoLeitosComponent } from './situacao-leitos/situacao-leitos.component';
import { AlocacaoLeitosComponent } from './alocacao-leitos/alocacao-leitos.component';

import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ProntuariosComponent } from './cadastros/prontuarios/prontuarios.component';
import { AgendamentosComponent } from './cadastros/agendamentos/agendamentos.component';
import { ProfissionaisComponent } from './cadastros/profissionais/profissionais.component';
import { InfraestruturaComponent } from './cadastros/infraestrutura/infraestrutura.component';
import { ConsultasMedicasComponent } from './cadastros/consultas-medicas/consultas-medicas.component';
import { PacientesInternadosComponent } from './pacientes-internados/pacientes-internados.component';

const routes: Routes = [
	//pagina inicial
  {	path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
	path: 'dashboard',
	component: DashboardComponent,
	data: {
		  title: 'Painel de Controle'
	}
  },
  {
	path: 'situacao-leitos',
	component: SituacaoLeitosComponent,
	data: {
		  title: 'Situação dos Leitos'
	}
  },  
  {
	path: 'alocacao-leitos',
	component: AlocacaoLeitosComponent,
	data: {
		  title: 'Alocação de Leitos'
	}
  },    
  {
	path: 'pacientes-internados',
	component: PacientesInternadosComponent,
	data: {
		  title: 'Pacientes Internados'
	}
  },
  {
	path: 'cadastros/profissionais',
	component: ProfissionaisComponent,
	data: {
		  title: 'Cadastros Profissionais'
	}
  },
  {
	path: 'cadastros/infraestrutura',
	component: InfraestruturaComponent,
	data: {
		  title: 'Cadastros Infraestrutura'
	}
  },
  {
	path: 'cadastros/prontuarios',
	component: ProntuariosComponent,
	data: {
		  title: 'Cadastros Prontuários'
	}
  },
  {
	path: 'cadastros/agendamentos',
	component: AgendamentosComponent,
	data: {
		  title: 'Cadastros Agendamentos'
	}
  },
  {
	path: 'cadastros/usuarios',
	component: UsuariosComponent,
	data: {
		  title: 'Cadastros Usuários'
	}
  },
  {
	path: 'cadastros/consultas',
	component: ConsultasMedicasComponent,
	data: {
		  title: 'Cadastros Consultas'
	}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
