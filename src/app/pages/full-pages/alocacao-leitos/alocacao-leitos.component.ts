import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { LeitoService } from '../../../services/leito.service';
import { LaudoInternacaoService } from '../../../services/laudo-internacao.service';

import { Leito } from '../../../models/leito';
import { DetalhesComponent } from '../../../shared/detalhes/detalhes.component';
import { FormAlocacaoLeitosComponent } from '../../../formularios/form-alocacao-leitos/form-alocacao-leitos.component';
import { Allocation } from 'app/models/allocation';
import { TempAlocService } from 'app/services/temp-aloc.service';
import { TempAloc } from 'app/models/temp-aloc';

@Component({
  selector: 'app-alocacao-leitos',
  templateUrl: './alocacao-leitos.component.html',
  styleUrls: ['./alocacao-leitos.component.scss']
})

export class AlocacaoLeitosComponent implements OnInit {
  public titlePage = 'Alocação de Leitos';
  public add : boolean = true;
  public data: Array<any>;  
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

  constructor(
    private laudoInternacaoService: LaudoInternacaoService,
    private leitoService: LeitoService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private tempAlocService: TempAlocService,
	) {
    this.laudoInternacaoService.getLaudosPendentes().subscribe(laudos => {
      this.data = laudos;
    })
    this.leitoService.getLeitosDisponiveis().subscribe(result => {
      this.leitos = result
      this.leitos.forEach(element => {
        this.leitosSelect.push({
          value: element,
          label: element.numero + " - " + element.tipoDeLeito + " - " + element.tipoDeCuidado + " - " + element.tipoDeEncaminhamento + " - " + element.especialidade + " - " + element.tipoDeEstadia + " - " + element.genero
        }); 
      });
    });
	// console.log("DONE")
  }

  openModal() {
    const modalRef = this.modalService.open(FormAlocacaoLeitosComponent, { size: 'lg' });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.id = this.currentId;
    modalRef.result.then((result) => {
      if (result === 'dados editados') {
        this.toastr.success('Dados editados com sucesso!');
      } else {
        this.toastr.success('Dados inseridos com sucesso!');
      }
    }).catch((error) => {
      this.currentId = null;
    });
  }

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
	
    const modalRef = this.modalService.open(DetalhesComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Laudo';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
		}).catch((error) => {
    });
  }
  
  async onValidarPlano(pacientes) {
    console.log(pacientes);
    let aloc: Array<Allocation> = [];
    for(var p of pacientes){
  	  if(p.leito){  
  		aloc.push({idPaciente: p.idPaciente, leito:p.leito.numero});
  	  }
    }
    let tempAloc: TempAloc = {
      validated: false, 
      allocation: aloc,
      saveAt: (new Date()).getTime()
    };
    this.tempAlocService.add(tempAloc).then(docRef => {
      tempAloc.id = docRef.id;
      this.tempAlocService.update(tempAloc, tempAloc.id);
    });
    this.toastr.success('Plano enviado para validação! Por favor aguarde.');
    await this.delay(3000);// Trocar por um observable no banco que verifica qndo o plano está validado.
    this.toastr.success('Você já pode solicitar ao chatbot o resultado da validação');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  ngOnInit(): void {
  }

}
