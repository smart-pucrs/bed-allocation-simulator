import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html'
})
export class AgendamentosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Agendamentos';
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any>=[
	{prontuario: "1", nomePaciente: "Fulano de Tal Junior", nomeMedico: "Ethel Price", especialidade: "Cardiologia", tipo: "Cirurgia", dataProcedimento: "18/06/2018"},
  ];
  
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

  constructor() { }

  ngOnInit(): void {
  }

}
