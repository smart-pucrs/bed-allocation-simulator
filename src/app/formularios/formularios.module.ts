import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from 'app/shared/shared.module';
import { CampoControlErroModule } from '../func/campo-control-erro/campo-control-erro.module';

import { FormAgendamentoComponent } from './form-agendamento/form-agendamento.component';
import { FormAlocacaoLeitosComponent } from './form-alocacao-leitos/form-alocacao-leitos.component';
import { FormPacientesInternadosComponent } from './form-pacientes-internados/form-pacientes-internados.component';
import { FormSituacaoLeitosComponent } from './form-situacao-leitos/form-situacao-leitos.component';
import { FormEscolhaLeitoComponent } from './form-escolha-leito/form-escolha-leito.component';
import { FormProfissionaisComponent } from './form-profissionais/form-profissionais.component';
import { FormInfraestruturaComponent } from './form-infraestrutura/form-infraestrutura.component';

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
    FormAgendamentoComponent,
	FormInfraestruturaComponent,
	FormAlocacaoLeitosComponent,
	FormPacientesInternadosComponent,
	FormSituacaoLeitosComponent,
	FormEscolhaLeitoComponent,
	FormProfissionaisComponent
  ],
  exports: [
    FormAgendamentoComponent,
	FormAlocacaoLeitosComponent,
	FormPacientesInternadosComponent,
	FormInfraestruturaComponent,
	FormSituacaoLeitosComponent,
	FormEscolhaLeitoComponent
  ],
  entryComponents: [
    FormAgendamentoComponent,
	FormAlocacaoLeitosComponent,
	FormPacientesInternadosComponent,
	FormSituacaoLeitosComponent,
	FormInfraestruturaComponent,
	FormEscolhaLeitoComponent
  ]
})
export class FormulariosModule { }
