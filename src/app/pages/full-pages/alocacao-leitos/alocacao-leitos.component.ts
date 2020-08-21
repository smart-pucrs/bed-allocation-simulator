import { Component, OnInit } from '@angular/core';
import { Leito } from '../../../models/leito';

@Component({
  selector: 'app-alocacao-leitos',
  templateUrl: './alocacao-leitos.component.html'
})
export class AlocacaoLeitosComponent implements OnInit {
  public titlePage = 'Alocação de Leitos';
  public add : boolean = true;
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any> = [
	  {prontuario: '2', nomePaciente: 'João Sousa da Silva', especialidade: 'Medicina Interna', genero: 'Masculino', tipoDeLeito: 'Clínico', tipoDeEncaminhamento: 'Agudo', tipoDeEstadia: 'Longa Permanência', tipoDeCuidado: 'Intensivos'},
	  {prontuario: '3', nomePaciente: 'Helena dos Santos', especialidade: 'Cardiologia', genero: 'Feminino', tipoDeLeito: 'Clínico', tipoDeEncaminhamento: 'Eletivo', tipoDeEstadia: 'Longa Permanência', tipoDeCuidado: 'Semi-Intensivos'},
	  {prontuario: '9', nomePaciente: 'Janaina Borges de Medeiros', especialidade: 'Neurologia', genero: 'Feminino', tipoDeLeito: 'Cirúrgico', tipoDeEncaminhamento: 'Agudo', tipoDeEstadia: 'Longa Permanência', tipoDeCuidado: 'Intensivos'},
  ];
  
  public title = 'Alocar Leito';
  public mensagem = '';
  public currentId: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: 'asc' },
    { title: 'Nome', name: 'nomePaciente', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Gênero', name: 'genero', sort: '' },
    { title: 'Tipo', name: 'tipoDeLeito', sort: '' },
    { title: 'Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' },
    { title: 'Estadia', name: 'tipoDeEstadia', sort: '' },
    { title: 'Cuidados', name: 'tipoDeCuidado', sort: '' }
  ];
  public leitosSelect = [];
  leitos: Leito[] = [];

  onMostrarDetalhe(evento) {
    const detalhes = [
      { label: 'Prontuário', value: evento.prontuario, tipo: 'string' },
      { label: 'Nome do Paciente', value: evento.nomePaciente, tipo: 'string' },
      { label: 'Médico', value: evento.medicoResponsavel, tipo: 'string' },
      { label: 'CRM', value: evento.crmMedico, tipo: 'string' },
      { label: 'Gênero', value: evento.genero, tipo: 'string' },
      { label: 'Especialidade', value: evento.especialidade, tipo: 'string' },
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string' },
      { label: 'Tipo de Leito', value: evento.tipoDeLeito ? evento.tipoDeLeito : '', tipo: 'string' },
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado ? evento.tipoDeCuidado : '', tipo: 'string' },
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string' },
      { label: 'Ativo', value: evento.ativo ? 'Sim' : 'Não', tipo: 'string' },
      { label: 'Data da Internação', value: evento.dataInternacao ? new Date(evento.dataInternacao) : '', tipo: 'date' },
      { label: 'Data da Alta', value: evento.dataAlta ? new Date(evento.dataAlta) : '', tipo: 'date' },
      { label: 'Leito', value: evento.leito ? evento.leito.numero : '', tipo: 'string' },
    ];
  }
  
  onValidarPlano(pacientes) {}
  
  constructor() { }

  ngOnInit(): void {
  }
  
  validar(){}

}
