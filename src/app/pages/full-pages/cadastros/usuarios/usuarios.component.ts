import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppAlertComponent } from '../../../../shared/app-alert/app-alert.component';
import { FormUsuariosComponent } from '../../../../formularios/form-usuarios/form-usuarios.component';

import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Usuários';
  public data: Array<any>;
  public title = 'Adicionar Usuário';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'Email', name: 'email', sort: '' },
    { title: 'Cargo', name: 'cargo', sort: '' },
    { title: 'Ativo', name: 'ativo', sort: '' }
  ];

  constructor(
	private modalService: NgbModal,
	private toastr: ToastrService, 
	private usuarioService: UsuarioService, 
    ) {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.data = usuarios;
    })
  }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(FormUsuariosComponent,{ size: 'lg' });
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
      this.usuarioService.delete(this.idToDelete);
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
    this.title = 'Adicionar Usuário';
    this.openModal();
  }

  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Editar Usuário';
    this.openModal();
  }

}
