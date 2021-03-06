import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plano-de-alocacao',
  templateUrl: './plano-de-alocacao.component.html',
  styleUrls: ['./plano-de-alocacao.component.scss']
})
export class PlanoDeAlocacaoComponent implements OnInit {
  // Input properties
  @Input() add;
  @Input() colunas: Array<any> = [];
  @Input() titlePage: string;
  @Input() public detalhes: boolean;
  @Input() set dados(dados: Array<any>){
    this.data = dados;
    if (this.colunas && this.data) {
      this.refreshTable();
    }
  }
  
  @Input() public leitosSelect: Array<any> = [];

  @Output() mostraDetalhe = new EventEmitter();
  @Output() validarPlano = new EventEmitter();
  @Output() alocar = new EventEmitter();

  public rows: Array<any> = [];

  public data: Array<any> = [];
  public columns: Array<any> = [];
  public config: any;

  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  constructor() { }

  public refreshTable(): void {
    this.columns = this.colunas;
    this.config = {
      paging: true,
      sorting: {columns: this.colunas},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered', 'table-condensed']
    };
      this.length = this.data.length;
      this.onChangeTable(this.config, true);
  };

  public ngOnInit(): void {
    if(this.data) {
    this.columns = this.colunas;
    this.config = {
      paging: true,
      sorting: {columns: this.colunas},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered', 'table-condensed']
    };
    this.onChangeTable(this.config);
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

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
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

  public onMostrarDetalhe(row: any) {
	this.onChangeTable(this.config, true)
    this.mostraDetalhe.emit(row);
  }

  public onValidarPlano(evento) {
    this.validarPlano.emit(evento)
  }

  public onAlocar(evento) {
    this.alocar.emit(evento)
  }
}
