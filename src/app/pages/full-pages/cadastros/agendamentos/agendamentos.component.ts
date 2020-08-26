import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { AgendamentoService } from '../../../../services/agendamento.service';
import { ProntuarioService } from '../../../../services/prontuario.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html'
})
export class AgendamentosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Agendamentos';
  public data: Array<any>;  
  public title = 'Adicionar Agendamento';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  private numProntuario: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: '' },
    { title: 'Paciente', name: 'nomePaciente', sort: '' },
    { title: 'Médico', name: 'nomeMedico', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Tipo de Procedimento', name: 'tipo', sort: '' },
    { title: 'Data', name: 'dataProcedimento', sort: 'desc' }
  ];

  constructor(
    private agendamentoService: AgendamentoService, 
    private prontuarioService: ProntuarioService,
	) {
    this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
      this.data = agendamentos;
      this.data.forEach(element => {
        element.dataProcedimento = moment(element.dataProcedimento).format('DD/MM/YYYY');
      })
    });
  }

  ngOnInit(): void {
  }

}
