import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DetalhesComponent } from '../../../../shared/detalhes/detalhes.component';
import { AppAlertComponent } from '../../../../shared/app-alert/app-alert.component';
import { FormProntuariosComponent } from '../../../../formularios/form-prontuarios/form-prontuarios.component'

import { ProntuarioService } from '../../../../services/prontuario.service';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
})
export class ProntuariosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Prontuários';
  public data: Array<any>;
  public title = 'Adicionar Prontuário';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: '' },
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'CPF', name: 'cpf', sort: '' },
    { title: 'Cartão SUS', name: 'cartaoSus', sort: '' }
  ];

  constructor(
	private toastr: ToastrService, 
	private prontuarioService: ProntuarioService, 
	private modalService: NgbModal
    ) {
    this.prontuarioService.getProntuarios().subscribe(prontuarios => {
      this.data = prontuarios;
    });
  }

  ngOnInit(): void {
  }
  
  openModal() {
    const modalRef = this.modalService.open(FormProntuariosComponent, { size: 'lg' });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.id = this.currentId;
    modalRef.result.then((result) => {
      if (result === 'dados editados'){
        this.toastr.success('Dados editados com sucesso!');
      } else {
        this.toastr.success('Dados inseridos com sucesso!');
      }
    }).catch((error) => {
      this.currentId = null;
    });
  }

  openAlert() {
    const modalRef = this.modalService.open(AppAlertComponent,{ size: 'sm' });
    modalRef.componentInstance.mensagem = this.mensagem;
    modalRef.result.then((result) => {
      this.prontuarioService.delete(this.idToDelete);
      const mensagem = 'Registro deletado com sucesso!';
      this.toastr.success(mensagem);
      this.idToDelete = null;
    }).catch((error) => {
      this.idToDelete = null;
    });
  }

  onDelete(evento) {
    this.idToDelete = evento.id;
    this.mensagem = 'Deseja realmente excluir o registro?';
    this.openAlert();
  }

  onAdd(evento) {
    this.currentId = null;
    this.title = 'Adicionar Prontuário';
    this.openModal();
  }

  onMostrarDetalhe(evento) {
    let agendamentos = [];
    if (evento.agendamentos) {
      evento.agendamentos.forEach(element => {
        let agendamento = [
          { label: 'Especialidade', value: element.especialidade ? element.especialidade : '', tipo: 'string'},
          { label: 'Tipo de Procedimento', value: element.tipo ? element.tipo : '', tipo: 'string'},
          { label: 'Médico Responsável', value: element.medico ? element.medico.CRM + ' - ' + element.medico.nome : '', tipo: 'string'},
          { label: 'Data', value: element.dataProcedimento ? new Date(element.dataProcedimento) : '', tipo: 'date'},
          { label: 'Descrição', value: element.descricao ? element.descricao : '', tipo: 'string'},
          { label: 'Cancelado?', value: element.cancelado ? 'Sim' : 'Não', tipo: 'string'},
        ]
        agendamentos.push(
          { label: 'Agendamento: ' + moment(element.dataProcedimento).format('DD/MM/YYYY'), value: agendamento, tipo: 'array'}
        );
      });
    }
    let internacoes = [];
    if (evento.internacoes) {
      evento.internacoes.forEach(element => {
        let agendamento = [
          { label: 'Especialidade', value: element.especialidade ? element.especialidade : '', tipo: 'string'},
          { label: 'Tipo de Leito', value: element.tipoDeLeito ? element.tipoDeLeito : '', tipo: 'string'},
          { label: 'Tipo de Encaminhamento', value: element.tipoDeEncaminhamento ? element.tipoDeEncaminhamento : '', tipo: 'string'},
          { label: 'Tipo de Cuidado', value: element.tipoDeCuidado ? element.tipoDeCuidado : '', tipo: 'string'},
          { label: 'Tipo de Estadia', value: element.tipoDeEstadia ? element.tipoDeEstadia : '', tipo: 'string'},
          { label: 'Médico Responsável', value: element.medicoResponsavel ? element.crmMedico + ' - ' + element.medicoResponsavel : '', tipo: 'string'},
          { label: 'Data da Alta', value: element.dataAlta ? new Date(element.dataAlta) : '', tipo: 'date'},
          { label: 'Ativo', value: element.ativo ? 'Sim' : 'Não', tipo: 'string'},
        ]
        internacoes.push(
          { label: 'Internação: ' + moment(element.dataInternacao).format('DD/MM/YYYY'), value: agendamento, tipo: 'array'}
        );
      });
    }
    let endereco = [
      {label: 'Logradouro', value: evento.paciente.endereco.logradouro, tipo: 'string'},
      {label: 'Número', value: evento.paciente.endereco.numero, tipo: 'string'},
      {label: 'Complemento', value: evento.paciente.endereco.complemento, tipo: 'string'},
      {label: 'Bairro', value: evento.paciente.endereco.bairro, tipo: 'string'},
      {label: 'Cidade', value: evento.paciente.endereco.cidade, tipo: 'string'},
      {label: 'Estado', value: evento.paciente.endereco.uf, tipo: 'string'},
      {label: 'Cep', value: evento.paciente.endereco.cep, tipo: 'string'},
    ];
    let consultasMedicas = [];
    if (evento.consultasMedicas){
      evento.consultasMedicas.forEach(element => {
        let consulta = [
          { label: 'Especialidade', value: element.especialidade ? element.especialidade : '', tipo: 'string'},
          { label: 'Tipo de Leito', value: element.tipoDeLeito ? element.tipoDeLeito : '', tipo: 'string'},
          { label: 'Tipo de Encaminhamento', value: element.tipoDeEncaminhamento ? element.tipoDeEncaminhamento : '', tipo: 'string'},
          { label: 'Tipo de Cuidado', value: element.tipoDeCuidado ? element.tipoDeCuidado : '', tipo: 'string'},
          { label: 'Tipo de Estadia', value: element.tipoDeEstadia ? element.tipoDeEstadia : '', tipo: 'string'},
          { label: 'Médico Responsável', value: element.medicoResponsavel ? element.medicoResponsavel.CRM + ' - ' + element.medicoResponsavel.nome : '', tipo: 'string'},
          { label: 'Diagnóstico', value: element.diagnostico ? element.diagnostico : '', tipo: 'string'},
          { label: 'Tratamento', value: element.tratamento ? element.tratamento : '', tipo: 'string'},
          { label: 'Exames', value: element.exames ? element.exames : '', tipo: 'string'},
          { label: 'Medicamentos', value: element.medicamentos ? element.medicamentos : '', tipo: 'string'},
          { label: 'Internação Autorizada? ', value: element.internar ? 'Sim' : 'Não', tipo: 'string'},
        ];
        consultasMedicas.push(
          { label: 'Consulta: ' + moment(element.dataConsulta).format('DD/MM/YYYY'), value: consulta, tipo: 'array'}
        );
      });
    }

    const detalhes = [
      { label: 'Prontuário', value: evento.prontuario, tipo: 'string'},
      { label: 'Data de Criação', value: new Date(evento.dataCriacao), tipo: 'date'},
      { label: 'Data de Abertura', value: evento.dataAbertura ? new Date(evento.dataAbertura) : '', tipo: 'date'},
      { label: 'Prontuário anterior', value: evento.prontuarioAnterior ? evento.prontuarioAnterior : '', tipo: 'string'},
      { label: 'Falecido?', value: evento.falecido ? 'Sim' : 'Não', tipo: 'string'},
      { label: 'Nome', value: evento.nome, tipo: 'string'},
      { label: 'Data de Nascimento', value: new Date(evento.paciente.nascimento), tipo: 'date'},
      { label: 'Gênero', value: evento.paciente.genero, tipo: 'string'},
      { label: 'Estado Civil', value: evento.paciente.estadoCivil, tipo: 'string'},
      { label: 'Nome da Mãe', value: evento.paciente.nomeDaMae, tipo: 'string'},
      { label: 'Nome do Pai', value: evento.paciente.nomeDoPai, tipo: 'string'},
      { label: 'Raça', value: evento.paciente.raca, tipo: 'string'},
      { label: 'Religião', value: evento.paciente.religiao ? evento.paciente.religiao : '', tipo: 'string'},
      { label: 'Naturalidade', value: evento.paciente.naturalidade, tipo: 'string'},
      { label: 'Nacionalidade', value: evento.paciente.nacionalidade, tipo: 'string'},
      { label: 'Escolaridade', value: evento.paciente.escolaridade, tipo: 'string'},
      { label: 'Telefone', value: evento.paciente.telefone, tipo: 'string'},
      { label: 'E-mail', value: evento.paciente.email ? evento.paciente.email : '', tipo: 'string'},
      { label: 'Endereço', value: endereco, tipo: 'array'},
      { label: 'Cartão SUS', value: evento.cartaoSus, tipo: 'string'},
      { label: 'RG', value: evento.paciente.rg, tipo: 'string'},
      { label: 'UF emissor', value: evento.paciente.ufRg, tipo: 'string'},
      { label: 'Orgão emissor', value: evento.paciente.orgaoEmissorRg, tipo: 'string'},
      { label: 'Data de Emissão', value: new Date(evento.paciente.emissaoRG), tipo: 'date'},
      { label: 'CPF', value: evento.cpf, tipo: 'string'},
      { label: 'Consultas Médicas', value: evento.consultasMedicas ? consultasMedicas : '', tipo: 'array'},
      { label: 'Agendamentos', value: evento.agendamentos ? agendamentos : '', tipo: 'array'},
      { label: 'Internações', value: evento.internacoes ? internacoes : '', tipo: 'array'},
    ];
    const modalRef = this.modalService.open(DetalhesComponent,{ size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Prontuário';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }

  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Editar Prontuário';
    this.openModal();
  }
  
}
