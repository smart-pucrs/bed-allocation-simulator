import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UtilitariosService } from '../../formularios/utilitarios.service';
import { LeitoService } from '../../services/leito.service';
import { ProntuarioService } from '../../services/prontuario.service';
import { InfraestruturaService } from '../../services/infraestrutura.service';
import { LaudoInternacaoService } from '../../services/laudo-internacao.service';

import { Leito } from '../../models/leito';
import { Quarto } from '../../models/quarto';
import { Prontuario } from '../../models/prontuario';
import { LaudoInternacao } from '../../models/laudo-internacao';

@Component({
  selector: 'app-form-alocacao-leitos',
  templateUrl: './form-alocacao-leitos.component.html',
  styleUrls: ['./form-alocacao-leitos.component.scss']
})
export class FormAlocacaoLeitosComponent implements OnInit, OnDestroy{
  @Input() title;
  @Input() id: string;
  alocacaoForm: FormGroup;
  laudo: LaudoInternacao;
  leitosSelect = [];
  leitos: Leito[] = [];
  leito: Leito;
  prontuario: Prontuario;
  quarto: Quarto;

  constructor(
    private formBuilder: FormBuilder,
    private laudoInternacaoService: LaudoInternacaoService,
    private leitoService: LeitoService,
    private prontuarioService: ProntuarioService,
    private infraestruturaService: InfraestruturaService,
    private toastr: ToastrService,
    private utilitariosService: UtilitariosService,
    public activeModal: NgbActiveModal
	) {
    this.alocacaoForm = this.formBuilder.group({
      leito: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.leitoService.getLeitosDisponiveis().subscribe(result => {
      this.leitos = result
      this.leitos.forEach(element => {
        this.leitosSelect.push({
          value: element.numero,
          label: element.numero + " - " + element.tipoDeLeito + " - " + element.tipoDeCuidado + " - " + element.tipoDeEncaminhamento + " - " + element.especialidade + " - " + element.genero
        })
      });
    });
    this.laudoInternacaoService.getLaudoById(this.id).subscribe(data => {
      this.laudo = data;
      this.prontuarioService.getProntuarioByNumero(this.laudo.prontuario).subscribe(result => {
        this.prontuario = result[0];
      });
    })
  }

  onSelected(evento) {
    this.leito = this.leitos.find(element => element.numero === evento.value);
    this.infraestruturaService.getQuartoByNumero(this.leito.quarto).subscribe(retorno => {
      this.quarto = retorno[0];
    })
  }

  closeModal() {
    this.activeModal.close(true);
  }

  save() {
    if (this.alocacaoForm.valid) {
      if (this.leito.genero !== this.laudo.genero && this.leito.genero !== 'Indefinido') {
        this.toastr.error('Gênero do leito diferente do gênero do paciente. Alocação não permitida.')
      } else {
        this.preparaVariaveis().then(() => {
          this.saveDb()
          this.activeModal.close('dados adicionados');
          this.alocacaoForm.reset();

        })
      }
    } else {
      this.utilitariosService.verificaValidacoesForm(this.alocacaoForm);
    }
  }

  preparaVariaveis(): Promise<any> {
    return new Promise((resolve, reject) => {
      let generoInicialLeito = this.leito.genero;
      this.laudo.internado = true;
      this.laudo.dataInternacao = (new Date()).getTime();
      this.leito.status = 'Ocupado';
      this.leito.genero = this.laudo.genero;
      this.leito.paciente = {
        prontuario: this.prontuario.prontuario,
        nome: this.prontuario.paciente.nome,
        genero: this.prontuario.paciente.genero,
      };
      this.laudo.leito = this.leito;
      this.laudo.id = this.id;
      if (!this.prontuario.internacoes) {
        this.prontuario.internacoes = [];
      }
      this.prontuario.internacoes.push(this.id);
      if (generoInicialLeito === 'Indefinido') {
        this.quarto.genero = this.laudo.genero;
        this.quarto.leitos.forEach(element => {
          if (element.id === this.leito.id) {
            element.status = 'Ocupado';
            element.paciente = {
              prontuario: this.prontuario.prontuario,
              nome: this.prontuario.paciente.nome,
              genero: this.prontuario.paciente.genero,
            };
          }
          element.genero = this.laudo.genero;
        });
      }
      return resolve;
    });
  }

  saveDb() {
    this.laudoInternacaoService.update(this.laudo, this.id);
    this.prontuarioService.update(this.prontuario, this.prontuario.id);
    this.quarto.leitos.forEach(element => {
      this.leitoService.update(element, element.id);
    })
    this.infraestruturaService.update(this.quarto, this.quarto.id);
  }

  verificaValidTouched(campo: string) {
    return this.utilitariosService.verificaValidTouched(campo, this.alocacaoForm);
  }

  aplicaCssErro(campo: string) {
    return this.utilitariosService.aplicaCssErro(campo, this.alocacaoForm)
  }

  getMsgError(campo: string) {
    return this.utilitariosService.getMsgError(campo, this.alocacaoForm)
  }

  ngOnDestroy() {
    // reseta o form
    this.alocacaoForm.reset();
  }
}
