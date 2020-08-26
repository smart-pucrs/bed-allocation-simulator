import { Component, OnInit } from '@angular/core';

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

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.data = usuarios;
    })
  }

  ngOnInit(): void {
  }

}
