import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../shared/shared.module';
import { CampoControlErroModule } from '../func/campo-control-erro/campo-control-erro.module';

import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';
import { FormAgendamentoComponent } from './form-agendamento/form-agendamento.component';
import { FormProntuariosComponent } from './form-prontuarios/form-prontuarios.component';
import { FormEscolhaLeitoComponent } from './form-escolha-leito/form-escolha-leito.component';
import { FormProfissionaisComponent } from './form-profissionais/form-profissionais.component';
import { FormInfraestruturaComponent } from './form-infraestrutura/form-infraestrutura.component';
import { FormAlocacaoLeitosComponent } from './form-alocacao-leitos/form-alocacao-leitos.component';
import { FormSituacaoLeitosComponent } from './form-situacao-leitos/form-situacao-leitos.component';
import { FormConsultaMedicaComponent } from './form-consulta-medica/form-consulta-medica.component';
import { FormPacientesInternadosComponent } from './form-pacientes-internados/form-pacientes-internados.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
	NgSelectModule,
	CampoControlErroModule,
  ],
  declarations: [
	FormUsuariosComponent,
    FormAgendamentoComponent,
	FormProntuariosComponent,
	FormEscolhaLeitoComponent,
	FormProfissionaisComponent,
	FormInfraestruturaComponent,
	FormAlocacaoLeitosComponent,
	FormSituacaoLeitosComponent,
	FormConsultaMedicaComponent,
	FormPacientesInternadosComponent,
  ],
  exports: [
	FormUsuariosComponent,
    FormAgendamentoComponent,
	FormProntuariosComponent,
	FormEscolhaLeitoComponent,
	FormProfissionaisComponent,
	FormInfraestruturaComponent,
	FormAlocacaoLeitosComponent,
	FormSituacaoLeitosComponent,
	FormConsultaMedicaComponent,
	FormPacientesInternadosComponent,
  ],
  entryComponents: [
	FormUsuariosComponent,
    FormAgendamentoComponent,
	FormProntuariosComponent,
	FormEscolhaLeitoComponent,
	FormProfissionaisComponent,
	FormInfraestruturaComponent,
	FormAlocacaoLeitosComponent,
	FormSituacaoLeitosComponent,
	FormConsultaMedicaComponent,
	FormPacientesInternadosComponent,
  ]
})
export class FormulariosModule { }
