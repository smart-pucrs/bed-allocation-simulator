import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LaudoInternacaoService } from '../../services/laudo-internacao.service';
import { InfraestruturaService } from '../../services/infraestrutura.service';
import { ProntuarioService } from '../../services/prontuario.service';
import { LeitoService } from '../../services/leito.service';

import { LaudoInternacao } from '../../models/laudo-internacao';
import { Prontuario } from '../../models/prontuario';
import { Quarto } from '../../models/quarto';
import { Leito } from '../../models/leito';

@Component({
  selector: 'app-form-pacientes-internados',
  templateUrl: './form-pacientes-internados.component.html',
  styleUrls: ['./form-pacientes-internados.component.scss']
})
export class FormPacientesInternadosComponent implements OnInit {
  @Input() title;
  @Input() id: string;
  laudo: LaudoInternacao;
  leito: Leito;
  prontuario: Prontuario;
  quarto: Quarto;
  mensagem: string;
  quartoOcupado = false;

  constructor(
    private laudoInternacaoService: LaudoInternacaoService,
    private leitoService: LeitoService,
    private prontuarioService: ProntuarioService,
    private infraestruturaService: InfraestruturaService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.laudoInternacaoService.getLaudoById(this.id).subscribe(data => {
      this.laudo = data;
      this.prontuarioService.getProntuarioByNumero(this.laudo.prontuario).subscribe(result => {
        this.prontuario = result[0];
      });
      this.leitoService.getLeitoById(this.laudo.leito.id).subscribe(result => {
        this.leito = result;        
        this.infraestruturaService.getQuartoByNumero(this.leito.quarto).subscribe(retorno => {
          this.quarto = retorno[0];
          this.quarto.leitos.forEach(element => {
            if (element.status === "Ocupado" && element.id !== this.leito.id) {
              this.quartoOcupado = true;
            }
          });          
        })
      })
    })
  }

  closeModal() {
    this.activeModal.close(true);
  }

  openAlert() {
    /*const modalRef = this.modalService.open(AppAlertComponent,{ size: 'sm' });
    modalRef.componentInstance.mensagem = this.mensagem;
    modalRef.result.then((result) => {
      this.save();
    }).catch((error) => {
    });*/
  }

  onConfirm() {
    this.mensagem = 'Deseja realmente dar alta ao paciente?';
    this.openAlert();
  }

  save() {
    console.log("registrar alta");
    this.preparaVariaveis().then(() => {
      this.saveDb()
      this.activeModal.close('alta registrada');
    });
  }

  preparaVariaveis(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.laudo.internado = false;
      this.laudo.ativo = false;
      this.laudo.dataAlta = (new Date()).getTime();
      this.leito.status = 'Livre';
      this.leito.paciente = null;
      let index = this.prontuario.internacoes.findIndex(x => x.id === this.laudo.id);
      this.prontuario.internacoes.splice(index, 1);
      this.prontuario.internacoes.push(this.laudo);
      if (!this.quartoOcupado) {
        this.quarto.genero = "Indefinido";
        this.quarto.age = "Indefinido";
        this.quarto.leitos.forEach(element => {
          if (element.id === this.leito.id) {
            element.status = 'Livre';
            element.paciente = null;
          }
          element.genero = "Indefinido";
          element.age = "Indefinido";
        });
      }    
      return resolve();
    });
  }

  saveDb() {
    this.laudoInternacaoService.update(this.laudo, this.id);
    this.prontuarioService.update(this.prontuario, this.prontuario.id);
    if (!this.quartoOcupado) {
      this.quarto.leitos.forEach(element => {
        this.leitoService.update(element, element.id);
      })
    } else {
      this.leitoService.update(this.leito, this.leito.id);
    }
    this.infraestruturaService.update(this.quarto, this.quarto.id);
  }

}
