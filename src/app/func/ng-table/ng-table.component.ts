import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ng-table',
  template: `
    <table class="table dataTable" ngClass="{{config.className || ''}}"
           role="grid" style="width: 100%;">
      <thead>
        <tr role="row">
          <th *ngFor="let column of columns" [ngTableSorting]="config" [column]="column"
              (sortChanged)="onChangeTable($event)" ngClass="{{column.className || ''}}">
            {{column.title}}
            <i *ngIf="config && column.sort" class="pull-right fa"
              [ngClass]="{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}"></i>
          </th>
          <th style="text-align: center;">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngIf="showFilterRow">
          <td *ngFor="let column of columns">
            <input *ngIf="column.filtering" placeholder="{{column.filtering.placeholder}}"
                  [ngTableFiltering]="column.filtering"
                  class="form-control"
                  style="width: auto;"
                  (tableChanged)="onChangeTable(config)"/>
          </td>
        </tr>
        <tr *ngFor="let row of rows">
          <td (click)="cellClick(row, column.name)" *ngFor="let column of columns" [innerHtml]="sanitize(getData(row, column.name))"></td>
          <td class="btn-action" style="text-align: center;">           
            <a *ngIf="detalhes" class="ng2-smart-action ng2-smart-action-view-view" (click)="mostrarDetalhe(row)">
              <i class="fa fa-eye light font-medium-1 mr-2"></i>
            </a>
            <a *ngIf="canDelete" class="ng2-smart-action ng2-smart-action-delete-delete" (click)="deleteRegistro(row)">
              <i class="fa fa-times danger font-medium-1 mr-2"></i>
            </a>
            <a *ngIf="canEdit" class="ng2-smart-action ng2-smart-action-edit-edit" (click)="editRegistro(row)">
              <i class="fa fa-pencil info font-medium-1 mr-2"></i>
            </a>            
          </td>
        </tr>
      </tbody>
    </table>
	{{test}}
  `
})
export class NgTableComponent implements OnInit {
  // Table values
  @Input() public rows: Array<any> = [];
  @Input() public canDelete: boolean;
  @Input() public detalhes: boolean;
  @Input() public canEdit: boolean;
	public test: any;
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

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() mostraDetalhe = new EventEmitter();

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

  public sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private _columns: Array<any> = [];
  private _config: any = {};

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

    return {columns: sortColumns};
  }

  public onChangeTable(column: any): void {
    this._columns.forEach((col: any) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({sorting: this.configColumns});
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  public cellClick(row: any, column: any): void {
    this.cellClicked.emit({row, column});
  }

  public editRegistro(row: any) {    
    this.edit.emit(row);
  }

  public deleteRegistro(row: any) {
    this.delete.emit(row);
  }

  public mostrarDetalhe(row: any) {
    this.mostraDetalhe.emit(row);
  } 

  public constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

}
