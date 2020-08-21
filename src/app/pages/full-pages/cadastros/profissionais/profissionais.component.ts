import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
})
export class ProfissionaisComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Profissionais';
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any>=[
	{nome: "Emerson Lopes", cpf: "08979934586", especialidade: "Cardiologia", CRM: "54321"},
	{nome: "Gabriel Melo", cpf: "12312312312", especialidade: "Neurologia", CRM: "123123"},
	{nome: "Manuela Medeiros", cpf: "56546546464", especialidade: "Oncologia", CRM:"545423"},
	{nome: "Paulo Sergio de Borba", cpf: "87687879890", especialidade: "Medicina Interna", CRM: "78657465"},
  ];  
  
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

  constructor() { }

  ngOnInit(): void {
  }

	public test: any;
  openAlert() {
      const mensagem = 'Registro deletado com sucesso!';
	this.test = {mensagem: this.mensagem};
  }
  onDelete(evento) {
    this.mensagem = 'Deseja realmente excluir o registro?';
	this.test = {mensagem: this.mensagem};
	}
  onAdd(evento) {
    this.title = 'Adicionar Profissional';
	this.test = {title: this.title};
	}
  onEdit(evento) {
    this.title = 'Editar Profissional';
	this.test = {title: this.title};
	}
}
