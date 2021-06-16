import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DetalhesComponent } from '../../../shared/detalhes/detalhes.component';

@Component({
  selector: 'app-optimised',
  templateUrl: './optimised.component.html',
  styleUrls: ['./optimised.component.scss']
})
export class OptimisedComponent implements OnInit {
  public titlePage = 'Alocação de Leitos Otimizada';
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: 'asc' },
    { title: 'Nome', name: 'nomePaciente', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Gênero', name: 'genero', sort: '' },
    { title: 'Tipo', name: 'tipoDeLeito', sort: '' },
    { title: 'Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' },
    { title: 'Estadia', name: 'tipoDeEstadia', sort: '' },
    { title: 'Cuidados', name: 'tipoDeCuidado', sort: '' },
    { title: 'Leito', name: 'leito', sort: '' }
  ];

  public detalhes: boolean;
  public rows: Array<any> = [];

  public data: Array<any> = [];
  // public columns: Array<any> = [];
  // public config: any;

  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public showFilterRow: Boolean = false;

  private _columns: Array<any> = [];
  private _config: any = {};

  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal) { 
      
      // this.data = dados;
      // if (this.colunas && this.data) {
      //   this.refreshTable();
      // }

      this.colunas.forEach((value: any) => {
        if (value.filtering) {
          this.showFilterRow = true;
        }
        if (value.className && value.className instanceof Array) {
          value.className = value.className.join(' ');
        }
        const column = this._columns.find((col: any) => col.name === value.name);
        if (column) {
          Object.assign(column, value);
        }
        if (!column) {
          this._columns.push(value);
        }
      });
    }

    public sanitize(html: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
  
    public get columns(): Array<any> {
      return this._columns;
    }
  
    public get config(): any {
      return this._config;
    }
  
    public get configColumns(): any {
      const sortColumns: Array<any> = [];
  
      this.colunas.forEach((column: any) => {
        if (column.sort) {
          sortColumns.push(column);
        }
      });
  
      return { columns: sortColumns };
    }
  
    public onChangeTable(column: any): void {
      this._columns.forEach((col: any) => {
        if (col.name !== column.name && col.sort !== false) {
          col.sort = '';
        }
      });
      this.onChangedTable({ sorting: this.configColumns });
    }
  
    public getData(row: any, propertyName: string): string {
      return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
    }
  

    public refreshTable(): void {
      this._config = {
        paging: true,
        sorting: {columns: this.colunas},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered', 'table-condensed']
      };
        this.length = this.data.length;
        this.onChangedTable(this.config, true);
    };


  

  public ngOnInit(): void {
    if(this.data) {
    // this.columns = this.colunas;
    this._config = {
      paging: true,
      sorting: {columns: this.colunas},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered', 'table-condensed']
    };
    this.onChangedTable(this.config);
    this.length = this.data.length;
    }
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {

    let filteredData: Array<any> = data;
    this.colunas.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] === null) {
            item[column.name] = '';
          }
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });
	
    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.colunas.forEach((column: any) => {
        if (item[column.name] !== null && item[column.name].toString().toLowerCase()
        .match(this.config.filtering.filterString.toLowerCase())) {
          flag = true; 
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangedTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
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
      { label: 'Leito Sugerido', value: evento.leito ? evento.leito.numero : '', tipo: 'string' },
    ];
	
    const modalRef = this.modalService.open(DetalhesComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Laudo';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
		}).catch((error) => {
    });
  }
}
