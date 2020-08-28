import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from 'app/shared/shared.module';

import { FormAgendamentoComponent } from './form-agendamento/form-agendamento.component';
import { FormAlocacaoLeitosComponent } from './form-alocacao-leitos/form-alocacao-leitos.component';
import { FormPacientesInternadosComponent } from './form-pacientes-internados/form-pacientes-internados.component';
import { FormSituacaoLeitosComponent } from './form-situacao-leitos/form-situacao-leitos.component';
import { FormEscolhaLeitoComponent } from './form-escolha-leito/form-escolha-leito.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
	NgSelectModule,
  ],
  declarations: [
    FormAgendamentoComponent,
	FormAlocacaoLeitosComponent,
	FormPacientesInternadosComponent,
	FormSituacaoLeitosComponent,
	FormEscolhaLeitoComponent
  ],
  exports: [
    FormAgendamentoComponent,
	FormAlocacaoLeitosComponent,
	FormPacientesInternadosComponent,
	FormSituacaoLeitosComponent,
	FormEscolhaLeitoComponent
  ],
  entryComponents: [
    FormAgendamentoComponent,
	FormAlocacaoLeitosComponent,
	FormPacientesInternadosComponent,
	FormSituacaoLeitosComponent,
	FormEscolhaLeitoComponent
  ]
})
export class FormulariosModule { }
