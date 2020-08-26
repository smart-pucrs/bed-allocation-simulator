import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { ProntuarioService } from '../../../../services/prontuario.service';
import { ConsultaMedicaService } from '../../../../services/consulta-medica.service';

@Component({
  selector: 'app-consultas-medicas',
  templateUrl: './consultas-medicas.component.html'
})
export class ConsultasMedicasComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Consultas Médicas';
  public data: Array<any>;
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

  constructor(
    private prontuarioService: ProntuarioService, 
    private consultaMedicaService: ConsultaMedicaService
	) {
    this.consultaMedicaService.getConsultasMedicas().subscribe(consultasMedicas => {
      this.data = [];
      consultasMedicas.forEach(element => {
        this.data.push({
          id: element.id,
          paciente: element.paciente,
          nomePaciente: element.paciente.nome,
          prontuario: element.prontuario,
          especialidade: element.especialidade,
          tipoDeLeito: element.tipoDeLeito ? element.tipoDeLeito : '',
          tipoDeEncaminhamento: element.tipoDeEncaminhamento,
          tipoDeCuidado: element.tipoDeCuidado ? element.tipoDeCuidado : '',
          nomeMedico: element.medicoResponsavel.nome,
          crmMedico: element.medicoResponsavel.CRM,
          medicoResponsavel: element.medicoResponsavel,
          diagnostico: element.diagnostico,
          tratamento: element.tratamento,
          exames: element.exames ? element.exames : '',
          medicamentos: element.medicamentos ? element.medicamentos : '',
          internar: element.internar,
          dataConsulta: element.dataConsulta ? moment(element.dataConsulta).format('DD/MM/YYYY') : '',
        });
      })
    })
  }

  ngOnInit(): void {
  }

}
