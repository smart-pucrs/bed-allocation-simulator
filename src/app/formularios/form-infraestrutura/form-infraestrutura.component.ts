import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UtilitariosService } from '../../formularios/utilitarios.service';
import { LeitoService } from '../../services/leito.service';
import { InfraestruturaService } from '../../services/infraestrutura.service';

import { Leito } from '../../models/leito';
import { Quarto } from '../../models/quarto';
import { TIPOSDEIDADE } from '../../models/tipos-idade';
import { TIPOSDEESTADIA } from '../../models/tipos-estadia';
import { TIPOSDEQUARTOS } from '../../models/tipos-quartos';
import { TIPOSDECUIDADOS } from '../../models/tipos-cuidados';
import { TIPOSDEENCAMINHAMENTO} from '../../models/tipos-encaminhamento';
import { TIPOSDEESPECIALIDADES } from '../../models/tipos-especialidades';
import { element } from 'protractor';

@Component({
  selector: 'app-form-infraestrutura',
  templateUrl: './form-infraestrutura.component.html',
})
export class FormInfraestruturaComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() id: string;
  quartoForm: FormGroup;
  leitos: Leito[] = [];
  quarto: Quarto;
  public naoEditar = false;
  numLeitosAtual: string;
  tiposLeitos: any = TIPOSDEQUARTOS;
  tiposDeEstadia: any = TIPOSDEESTADIA;
  tiposEncaminhamentos: any = TIPOSDEENCAMINHAMENTO;
  tiposCuidados: any = TIPOSDECUIDADOS;
  tiposEspecialidades: any = TIPOSDEESPECIALIDADES;
  tiposDeIdade: any = TIPOSDEIDADE;
  leitosDoQuarto: any = [];
  generos: any = [
    {
      value: 'Masculino',
      label: 'Masculino'
    },
    {
      value: 'Feminino',
      label: 'Feminino'
    },
    {
      value: 'Indefinido',
      label: 'Indefinido'
    },
  ];
  numLeitos: any = [
    {
      value: '1',
      label: '1'
    },
    {
      value: '2',
      label: '2'
    },
    {
      value: '3',
      label: '3'
    },
    {
      value: '4',
      label: '4'
    },
    {
      value: '5',
      label: '5'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private infraestruturaService: InfraestruturaService,
    private leitoService: LeitoService,
    private utilitariosService: UtilitariosService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    // Form
    this.quartoForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(50)]],
      dist: [null, [Validators.required, Validators.maxLength(5)]],
      especialidade: [null, [Validators.required, Validators.maxLength(50)]],
      age: [null, Validators.required],
      tipoDeLeito: [null, Validators.required],
      tipoDeEstadia: [null, Validators.required],
      tipoDeEncaminhamento: [null, Validators.required],
      tipoDeCuidado: [null, Validators.required],
      genero: [null, Validators.required],
      numLeitos: [null, Validators.required],
    });

    // Edit
    if (this.id !== null) {
      this.infraestruturaService.getQuartoById(this.id).subscribe(data => {
        this.numLeitosAtual = data.numLeitos;
        this.leitosDoQuarto = data.leitos;
        this.quartoForm.setValue({
          nome: data.nome,
          dist:data.dist,
          especialidade: data.especialidade,
          age: data.age ? data.age : '',
          tipoDeLeito: data.tipoDeLeito,
          tipoDeEstadia: data.tipoDeEstadia ? data.tipoDeEstadia : '',
          tipoDeEncaminhamento: data.tipoDeEncaminhamento,
          tipoDeCuidado: data.tipoDeCuidado,
          genero: data.genero,
          numLeitos: data.numLeitos,
        });
        let controls = this.quartoForm.controls;
        controls.numLeitos.disable();
        data.leitos.forEach(element => {
          if (element.status !== 'Livre') {
            this.naoEditar = true;
          }
        });
        if (this.naoEditar) {
          controls.nome.disable();
          controls.dist.disable();
          controls.especialidade.disable();
          controls.age.disable();
          controls.tipoDeLeito.disable();
          controls.tipoDeEstadia.disable();
          controls.tipoDeEncaminhamento.disable();
          controls.tipoDeCuidado.disable();
          controls.genero.disable();
          this.toastr.info('Quarto não está livre, não é possível editar!');
        }
      })
    }
  }

  closeModal() {
    this.activeModal.close(true);
  }
  
  save() {
    if (this.quartoForm.valid) {
      if (this.id !== null) {
          let promises = this.leitosDoQuarto.map(element => {
            let leito: Leito = {
              id: element.id,
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: element.numero,
              status: element.status,
              paciente: element.paciente ? element.paciente : null,
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
              genero: this.quartoForm.value['genero'],
            }
            return this.leitoService.update(leito, element.id)
              .then(docRef => {
                this.leitos.push(leito);
              });
          })
          Promise.all(promises).then(() => {
            this.quartoForm.controls.numLeitos.enable();
            this.quarto = {
              nome: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
              genero: this.quartoForm.value['genero'],
              numLeitos: this.quartoForm.value['numLeitos'],
              leitos: this.leitos,
            }
          this.infraestruturaService.update(this.quarto, this.id);
          this.activeModal.close('dados editados');
          this.quartoForm.reset();
        }).catch((err) => {
          console.log("erro: ", err);
        });
      } else {
        switch (this.quartoForm.value['numLeitos']) {
          case '1':
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'a',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            break;
          case '2':
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'a',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'b',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            break;
          case '3':
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'a',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'b',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'c',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            break;
          case '4':
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'a',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'b',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'c',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'd',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            break;
          case '5':
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'a',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'b',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'c',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'd',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            this.leitosDoQuarto.push({
              quarto: this.quartoForm.value['nome'],
              dist: this.quartoForm.value['dist'],
              numero: this.quartoForm.value['nome'] + 'e',
              status: 'Livre',
              especialidade: this.quartoForm.value['especialidade'],
              age: this.quartoForm.value['age'],
              genero: this.quartoForm.value['genero'],
              tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
              tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
              tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
              tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            });
            break;
          default:
            break;
        }
        let promises = this.leitosDoQuarto.map(element => {
          return this.leitoService.add(element)
            .then(docRef => {
              this.leitos.push({
                id: docRef.id,
                quarto: element.quarto,
                dist: element.dist,
                numero: element.numero,
                status: element.status,
                especialidade: element.especialidade,
                age: element.age,
                genero: element.genero,
                tipoDeLeito: element.tipoDeLeito,
                tipoDeEstadia: element.tipoDeEstadia,
                tipoDeEncaminhamento: element.tipoDeEncaminhamento,
                tipoDeCuidado: element.tipoDeCuidado,
              })
            });
        })
        Promise.all(promises).then(() => {
          this.quarto = {
            nome: this.quartoForm.value['nome'],
            dist: this.quartoForm.value['dist'],
            especialidade: this.quartoForm.value['especialidade'],
            age: this.quartoForm.value['age'],
            tipoDeLeito: this.quartoForm.value['tipoDeLeito'],
            tipoDeEstadia: this.quartoForm.value['tipoDeEstadia'],
            tipoDeEncaminhamento: this.quartoForm.value['tipoDeEncaminhamento'],
            tipoDeCuidado: this.quartoForm.value['tipoDeCuidado'],
            genero: this.quartoForm.value['genero'],
            numLeitos: this.quartoForm.value['numLeitos'],
            leitos: this.leitos,
          }

          this.infraestruturaService.add(this.quarto);
          this.leitos.forEach(element => {
            this.leitoService.update(element, element.id);
          });
          this.activeModal.close('dados adicionados');
          this.quartoForm.reset();
        }).catch((err) => {
          console.log("erro: ", err);
        });
      }
    } else {
      this.utilitariosService.verificaValidacoesForm(this.quartoForm);
    }
  }

  verificaValidTouched(campo: string, form: any) {
    return this.utilitariosService.verificaValidTouched(campo, form);
  }

  aplicaCssErro(campo: string, form: any) {
    return this.utilitariosService.aplicaCssErro(campo, form)
  }

  getMsgError(campo: string, form: any) {
    return this.utilitariosService.getMsgError(campo, form)
  }

  ngOnDestroy() {
    // reseta o form
    this.quartoForm.reset();
  }

}
