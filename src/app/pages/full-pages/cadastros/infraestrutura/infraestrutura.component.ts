import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infraestrutura',
  templateUrl: './infraestrutura.component.html'
})
export class InfraestruturaComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Infraestrutura';
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any>=[
	{nome: "100", especialidade: "Oncologia", tipoDeLeito: "Clinico", tipoDeEncaminhamento: "Eletivo", genero: "Indefinido"},
	{nome: "111", especialidade: "Medicina Interna", tipoDeLeito: "Clinico", tipoDeEncaminhamento: "Agudo", genero: "Indefinido"},
	{nome: "112", especialidade: "Medicina Interna", tipoDeLeito: "Clinico", tipoDeEncaminhamento: "Eletivo", genero: "Masculino"},
	{nome: "113", especialidade: "Neurologia", tipoDeLeito: "Cirurgico", tipoDeEncaminhamento: "Agudo", genero: "Feminino"},
	{nome: "114", especialidade: "Cardiologia", tipoDeLeito: "Clinico", tipoDeEncaminhamento: "Eletivo", genero: "Feminino"},
	{nome: "115", especialidade: "Neurologia", tipoDeLeito: "Cirurgico", tipoDeEncaminhamento: "Agudo", genero: "Indefinido"},
	{nome: "116", especialidade: "Cardiologia", tipoDeLeito: "Clinico", tipoDeEncaminhamento: "Eletivo", genero: "Feminino"},
	{nome: "117", especialidade: "Oncologia", tipoDeLeito: "Clinico", tipoDeEncaminhamento: "Eletivo", genero: "masculino"},
  ];
  
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

  onMostrarDetalhe(evento) {    
    const detalhes = [
      { label: 'Quarto', value: evento.nome, tipo: 'string'},
      { label: 'Gênero', value: evento.genero, tipo: 'string'},
      { label: 'Idade', value: evento.age, tipo: 'string'},
      { label: 'Tipo', value: evento.tipoDeLeito, tipo: 'string'},
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string'},
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado, tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade, tipo: 'string'},	
    ];
    this.test = detalhes;
  }
}
