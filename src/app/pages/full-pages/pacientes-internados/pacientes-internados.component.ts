import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { LaudoInternacaoService } from '../../../services/laudo-internacao.service';

@Component({
  selector: 'app-pacientes-internados',
  templateUrl: './pacientes-internados.component.html'
})

export class PacientesInternadosComponent implements OnInit {
  public add: boolean = false;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Pacientes Internados';
  public data: Array<any>;  
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

  constructor(private laudoInternacaoService: LaudoInternacaoService) {
    this.laudoInternacaoService.getpacientesInternados().subscribe(laudos => {
      this.data = laudos;
      this.data.forEach(element => {
        element.dataInternacao = moment(element.dataInternacao).format('DD/MM/YYYY');
        element.numLeito = element.leito.numero;
      });
	});
  }

  ngOnInit(): void {
  }
  
  onMostrarDetalhe(evento) {
  }
  
  onEdit(evento) {}
}
