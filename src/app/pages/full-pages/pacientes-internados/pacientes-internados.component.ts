import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes-internados',
  templateUrl: './pacientes-internados.component.html'
})
export class PacientesInternadosComponent implements OnInit {

  public add: boolean = false;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Pacientes Internados';
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any> = [
	{prontuario: "12", nomePaciente: "Maria Carolina Albuquerque", especialidade: "Neurologia", numLeito: "113b", dataInternacao: "03/02/2019"},
	{prontuario: "4", nomePaciente: "Joana Maria de Paula", especialidade: "Cardiologia", numLeito: "116b", dataInternacao: "03/02/2019"},
	{prontuario: "5", nomePaciente: "Joao da Silva", especialidade: "Oncologia", numLeito: "117a", dataInternacao: "03/02/2019"},
	{prontuario: "7", nomePaciente: "Paulo dos Santos", especialidade: "Medicina Interna", numLeito: "112d", dataInternacao: "03/02/2019"},
	{prontuario: "8", nomePaciente: "Juliana Maria da Silva", especialidade: "Cardiologia", numLeito: "114a", dataInternacao: "21/01/2019"},
  ];
  
  public title = 'Internação';
  public mensagem = '';
  public currentId: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: 'asc' },
    { title: 'Nome', name: 'nomePaciente', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Leito', name: 'numLeito', sort: '' },
    { title: 'Data de Internação', name: 'dataInternacao', sort: '' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  public test : any;
  onMostrarDetalhe(evento) {
    const detalhes = [
      { label: 'Prontuário', value: evento.prontuario,  tipo: 'string'},
      { label: 'Nome do Paciente', value: evento.nomePaciente,  tipo: 'string'},
      { label: 'Médico', value: evento.medicoResponsavel,  tipo: 'string'},
      { label: 'CRM', value: evento.crmMedico,  tipo: 'string'},
      { label: 'Gênero', value: evento.genero,  tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade,  tipo: 'string'},
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string'},
      { label: 'Tipo de Leito', value: evento.tipoDeLeito ? evento.tipoDeLeito : '', tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado ? evento.tipoDeCuidado : '', tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Ativo', value: evento.ativo ? 'Sim' : 'Não', tipo: 'string'},
      { label: 'Data da Internação', value: evento.dataInternacao ? evento.dataInternacao : '', tipo: 'string'},
      { label: 'Data da Alta', value: evento.dataAlta ? new Date(evento.dataAlta) : '', tipo: 'date'},
      { label: 'Leito', value: evento.leito ? evento.leito.numero : '', tipo: 'string'},      
    ];
	this.test = detalhes;
  }
  
  onEdit(evento) {}
}
