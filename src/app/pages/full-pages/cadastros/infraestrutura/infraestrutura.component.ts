import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DetalhesComponent } from '../../../../shared/detalhes/detalhes.component';
import { AppAlertComponent } from '../../../../shared/app-alert/app-alert.component';
import { FormInfraestruturaComponent } from '../../../../formularios/form-infraestrutura/form-infraestrutura.component';

import { InfraestruturaService } from '../../../../services/infraestrutura.service';

@Component({
  selector: 'app-infraestrutura',
  templateUrl: './infraestrutura.component.html'
})
export class InfraestruturaComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Infraestrutura';
  public data: Array<any>;
  public title = 'Adicionar Quarto';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Tipo', name: 'tipoDeLeito', sort: '' },
    { title: 'Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' },
    { title: 'Gênero', name: 'genero', sort: '' }
  ];

  constructor(
	private toastr: ToastrService, 
	private infraestruturaService: InfraestruturaService, 
	private modalService: NgbModal
	) {
    this.infraestruturaService.getInfraestrutura().subscribe(infraestrutura => {
      this.data = infraestrutura;
    })
  }

  ngOnInit(): void {
  }
  
  openModal() {
    const modalRef = this.modalService.open(FormInfraestruturaComponent,{ size: 'lg' });
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
      this.infraestruturaService.delete(this.idToDelete);
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
    this.title = 'Adicionar Quarto';
    this.openModal();
  }


  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Editar Quarto';
    this.openModal();
  }

  onMostrarDetalhe(evento) {
    let leitos = []
    evento.leitos.forEach(element => {
      leitos.push({
        label: 'Leito', value: element.numero + " - " + element.status, tipo: 'string'
      })
    });
    
    const detalhes = [
      { label: 'Quarto', value: evento.nome, tipo: 'string'},
      { label: 'Gênero', value: evento.genero, tipo: 'string'},
      { label: 'Idade', value: evento.age, tipo: 'string'},
      { label: 'Tipo', value: evento.tipoDeLeito, tipo: 'string'},
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string'},
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado, tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade, tipo: 'string'},
      { label: 'Leitos', value: leitos, tipo: 'array'}
    ];
    const modalRef = this.modalService.open(DetalhesComponent,{ size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Quarto';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }
  
}
