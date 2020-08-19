import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SituacaoLeitosComponent } from './situacao-leitos/situacao-leitos.component';



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
  /*
	path: 'alocacao-leitos',
	component: //,
	data: {
		  title: 'Alocação de Leitos'
	}
  },*/
  /*{
	path: 'pacientes-internados',
	component: //,
	data: {
		  title: 'Pacientes Internados'
	}
  },*/
  /*{
	path: 'cadastros/profissionais',
	component: //,
	data: {
		  title: 'Cadastros Profissionais'
	}
  },*/
  /*{
	path: 'cadastros/infraestrutura',
	component: //,
	data: {
		  title: 'Cadastros Infraestrutura'
	}
  },*/
  /*{
	path: 'cadastros/prontuarios',
	component: //,
	data: {
		  title: 'Cadastros Prontuários'
	}
  },*/
  /*{
	path: 'cadastros/agendamentos',
	component: //,
	data: {
		  title: 'Cadastros Agendamentos'
	}
  },*/
  /*{
	path: 'cadastros/usuarios',
	component: //,
	data: {
		  title: 'Cadastros Usuários'
	}
  },*/
  /*{
	path: 'cadastros/consultas',
	component: //,
	data: {
		  title: 'Cadastros Consultas'
	}
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
