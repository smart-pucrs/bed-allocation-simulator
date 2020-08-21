import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultas-medicas',
  templateUrl: './consultas-medicas.component.html'
})
export class ConsultasMedicasComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Consultas Médicas';
  //public data: Array<any>;
  
  //%PLACEHOLDER
  public data: Array<any>=[
	{prontuario: "4", nomePaciente: "Joana Maria de Paula", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "16/06/2018"},{prontuario: "5", nomePaciente: "Joao da Silva", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "16/06/2018"},{prontuario: "2", nomePaciente: "Joao Sousa da Silva", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "16/06/2018"},{prontuario: "3", nomePaciente: "Helena dos Santos", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "16/06/2018"},{prontuario: "1", nomePaciente: "Fulano de Tal Junior", nomeMedico: "Manuela Medeiros", crmMedico: "545423", especialidade: "Oncologia", dataConsulta: "15/01/2019"},{prontuario: "12", nomePaciente: "Maria Carolina Albuquerque", nomeMedico: "Gabriel Melo", crmMedico: "123123", especialidade: "Neurologia", dataConsulta: "15/01/2019"},{prontuario: "4", nomePaciente: "Joana Maria de Paula", nomeMedico: "Emerson Lopes", crmMedico: "54321", especialidade: "Cardiologia", dataConsulta: "15/01/2019"},{prontuario: "12", nomePaciente: "Maria Carolina Albuquerque", nomeMedico: "Gabriel Melo", crmMedico: "123123", especialidade: "Neurologia", dataConsulta: "15/01/2019"},{prontuario: "7", nomePaciente: "Paulo dos Santos", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "15/01/2019"},{prontuario: "5", nomePaciente: "Joao da Silva", nomeMedico: "Manuela Medeiros", crmMedico: "545423", especialidade: "Oncologia", dataConsulta: "14/01/2019"},{prontuario: "1", nomePaciente: "Fulano de Tal Junior", nomeMedico: "Ethel Price", crmMedico: "54321", especialidade: "Cardiologia", dataConsulta: "11/06/2018"},{prontuario: "11", nomePaciente: "Antonio de Melo", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "09/01/2019"},{prontuario: "9", nomePaciente: "Janaina Borges de Medeiros", nomeMedico: "Gabriel Melo", crmMedico: "123123", especialidade: "Neurologia", dataConsulta: "09/01/2019"},{prontuario: "10", nomePaciente: "Marcelo Amaral", nomeMedico: "Gabriel Melo", crmMedico: "123123", especialidade: "Neurologia", dataConsulta: "09/01/2019"},{prontuario: "12", nomePaciente: "Maria Carolina Albuquerque", nomeMedico: "Manuela Medeiros", crmMedico: "545423", especialidade: "Oncologia", dataConsulta: "09/01/2019"},{prontuario: "6", nomePaciente: "Maria da Silva", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "09/01/2019"},{prontuario: "11", nomePaciente: "Antonio de Melo", nomeMedico: "Emerson Lopes", crmMedico: "54321", especialidade: "Cardiologia", dataConsulta: "09/01/2019"},{prontuario: "7", nomePaciente: "Paulo dos Santos", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "09/01/2019"},{prontuario: "8", nomePaciente: "Juliana Maria da Silva", nomeMedico: "Emerson Lopes", crmMedico: "54321", especialidade: "Cardiologia", dataConsulta: "09/01/2019"},{prontuario: "9", nomePaciente: "Janaina Borges de Medeiros", nomeMedico: "Gabriel Melo", crmMedico: "123123", especialidade: "Neurologia", dataConsulta: "07/02/2019"},{prontuario: "2", nomePaciente: "Joao Sousa da Silva", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "07/02/2019"},{prontuario: "3", nomePaciente: "Helena dos Santos", nomeMedico: "Emerson Lopes", crmMedico: "54321", especialidade: "Cardiologia", dataConsulta: "07/02/2019"},{prontuario: "6", nomePaciente: "Maria da Silva", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "01/12/2018"},{prontuario: "7", nomePaciente: "Paulo dos Santos", nomeMedico: "Paulo Sergio de Borba", crmMedico: "78657465", especialidade: "Medicina Interna", dataConsulta: "01/12/2018"},
  ];
  
  public title = 'Adicionar Consulta';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: ''},
    { title: 'Nome do Paciente', name: 'nomePaciente', sort: '' },
    { title: 'Médico', name: 'nomeMedico', sort: '' },
    { title: 'CRM', name: 'crmMedico', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Data', name: 'dataConsulta', sort: 'desc' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
