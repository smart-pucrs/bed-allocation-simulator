import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppAlertComponent } from '../../../../shared/app-alert/app-alert.component';

import { FormProfissionaisComponent } from '../../../../formularios/form-profissionais/form-profissionais.component';
import { ProfissionalService } from '../../../../services/profissional.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
})
export class ProfissionaisComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Profissionais';
  public data: Array<any>;
  public title = 'Adicionar Profissional';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'CPF', name: 'cpf', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'CRM', name: 'CRM', sort: '' }
  ];

  constructor(
	private toastr: ToastrService, 
	private profissionalService: ProfissionalService, 
	private modalService: NgbModal
	) {
    this.profissionalService.getProfissionais().subscribe(profissionais => {
      this.data = profissionais;
    })
  }

  ngOnInit(): void {
  }
  
  openModal() {
    const modalRef = this.modalService.open(FormProfissionaisComponent,{ size: 'lg' });
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
      this.profissionalService.delete(this.idToDelete);
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
    this.title = 'Adicionar Profissional';
    this.openModal();
  }

  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Editar Profissional';
    this.openModal();
  }
  
}
