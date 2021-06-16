import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormEscolhaLeitoComponent } from '../../formularios/form-escolha-leito/form-escolha-leito.component';
import { FormExcecao } from '../../formularios/form-excecao/form-excecao.component';

import { PacienteService } from '../../services/paciente.service';
import { ExcecaoService } from '../../services/excecao.service';


@Component({
  selector: 'app-plano-table',
  templateUrl: './plano-table.component.html',
})
export class PlanoTableComponent implements OnInit {
  // Table values
  @Input() public rows: Array<any> = [];
  @Input() public detalhes: boolean;
  @Input() public leitosSelect: Array<any> = [];
  leitosSelected: Array<any> = [];

  @Input()
  public set optSet(data: Array<any>) {
  }


  @Input()
  public set config(conf: any) {
    if (!conf.className) {
      conf.className = 'table-striped';
    }
    if (conf.className instanceof Array) {
      conf.className = conf.className.join(' ');
    }
    this._config = conf;
  }

  // Outputs (Events)
  @Output() public tableChanged: EventEmitter<any> = new EventEmitter();
  @Output() public cellClicked: EventEmitter<any> = new EventEmitter();

  @Output() mostraDetalhe = new EventEmitter();
  @Output() validarPlano = new EventEmitter();


  public showFilterRow: Boolean = false;

  @Input()
  public set columns(values: Array<any>) {
    values.forEach((value: any) => {
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

  private _columns: Array<any> = [];
  private _config: any = {};

  public constructor(
    private sanitizer: DomSanitizer,
    private excecaoService: ExcecaoService,
    private pacienteService: PacienteService,
    private modalService: NgbModal
  ) { }

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

    this.columns.forEach((column: any) => {
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
    this.tableChanged.emit({ sorting: this.configColumns });
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  public mostrarDetalhe(row: any) {
    this.mostraDetalhe.emit(row);
  }

  public clearLeito(row) {
    let indexLeito = this.leitosSelected.findIndex(x => x.value === row.leito);
    this.leitosSelect.push(this.leitosSelected[indexLeito]);
    this.leitosSelected.splice(indexLeito, 1);
    let index = this.rows.findIndex(x => x.id === row.id);
    this.rows[index].leito = '';
  }

  public onSelected(event, row) {
    if (event.value.genero === "Indefinido") {
      this.leitosSelect.forEach(element => {
        if (element.value.quarto === event.value.quarto) {
          element.value.genero = row.genero;
          element.label = element.value.numero + " - " + element.value.tipoDeLeito + " - " + element.value.tipoDeCuidado + " - " + element.value.tipoDeEncaminhamento + " - " + element.value.especialidade + " - " + element.value.tipoDeEstadia + " - " + row.genero
        }
      });
    }
    if (event.value.age === "Indefinido") {
      this.leitosSelect.forEach(element => {
        if (element.value.quarto === event.value.quarto) {
          element.value.age = row.age;
        }
      });
    }
    let index = this.rows.findIndex(x => x.id === row.id);
    this.rows[index].leito = event.value;
    this.leitosSelected.push(event);
    let indexLeitoS = this.leitosSelected.findIndex(x => x.value === event.value);
    this.excecaoService.getExcecaoByQuarto(event.value.quarto).subscribe(data => {
      if (data) {
        this.leitosSelected[indexLeitoS].value.except = data.desc
      }
    })
    let indexLeito = this.leitosSelect.findIndex(x => x.value === event.value);
    this.leitosSelect.splice(indexLeito, 1);
  }

  public validar() {
    this.validarPlano.emit(this.rows);
  }

  openModal(row, leito) {
    if (leito) {
      this.leitosSelect = this.leitosSelect.filter(x => x != null)
      const modalRef = this.modalService.open(FormEscolhaLeitoComponent, { size: 'lg' });
      modalRef.componentInstance.leitosSelect = this.leitosSelect;
      modalRef.componentInstance.title = row.nomePaciente;
      modalRef.componentInstance.id = row.id;
      modalRef.result.then((result) => {
        this.onSelected(result, row);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      const modalRef = this.modalService.open(FormExcecao, { size: 'lg' });
      modalRef.componentInstance.quarto = row.leito.quarto;
    }
  }

  ngOnInit(): void {
  }

}
