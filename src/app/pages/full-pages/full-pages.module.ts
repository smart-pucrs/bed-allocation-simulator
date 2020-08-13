import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { SituacaoLeitosComponent } from './situacao-leitos/situacao-leitos.component';



@NgModule({
  imports: [
    CommonModule,
	FullPagesRoutingModule
  ],
  declarations: [
	DashboardComponent,
	SituacaoLeitosComponent
  ]
})
export class FullPagesModule { }
