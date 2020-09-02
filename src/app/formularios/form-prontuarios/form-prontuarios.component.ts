import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap/tabset/tabset';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UtilitariosService } from '../utilitarios.service';
import { PlacesService } from '../../services/places.service';
import { PacienteService } from '../../services/paciente.service';
import { ProntuarioService } from '../../services/prontuario.service';

import { Paciente } from '../../models/paciente';
import { Prontuario } from '../../models/prontuario';

@Component({
  selector: 'app-form-prontuarios',
  templateUrl: './form-prontuarios.component.html',
  styleUrls: ['./form-prontuarios.component.scss']
})
export class FormProntuariosComponent implements OnInit {
  @Input() title;
  @Input() id: string;
  infPessoalForm: FormGroup;
  docsForm: FormGroup;
  enderecoForm: FormGroup;
  prontuarioForm: FormGroup;
  proximoProntuario: number;
  paciente: Paciente;
  pacienteId: string;
  consultasMedicas = [];
  agendamentos = [];
  internacoes = [];
  // conf BsDatepicker
  bsconfig = { 
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    maxDate: new Date
  };
  // conf Tabs
  currentJustify = 'justified';
  tab: any;
  // places
  options={
    types: ['(regions)'],
    componentRestrictions: { country: 'BR' }
  };
  
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    sublocality_level_1: 'long_name',
    administrative_area_level_1: 'short_name',
    administrative_area_level_2: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  
  prontuario: Prontuario;
  falecido: boolean = false;
  
  generos: any = [
    {
      value: 'Masculino',
      label: 'Masculino'
    },
    {
      value: 'Feminino',
      label: 'Feminino'
    }
  ];
  estadosCivis: any = [
    {
      value: 'Solteiro(a)',
      label: 'Solteiro(a)'
    },
    {
      value: 'Casado(a)',
      label: 'Casado(a)'
    },
    {
      value: 'União Estável',
      label: 'União Estável'
    },
    {
      value: 'Viúvo(a)',
      label: 'Viúvo(a)'
    }
  ];
  racas: any = [
    {
      value: 'Branco(a)',
      label: 'Branco(a)'
    },
    {
      value: 'Pardo(a)',
      label: 'Pardo(a)'
    },
    {
      value: 'Amarelo(a)',
      label: 'Amarelo(a)'
    },
    {
      value: 'Negro(a)',
      label: 'Negro(a)'
    }
  ];
  religioes: any = [
    {
      value: 'Católico(a)',
      label: 'Católico(a)'
    },
    {
      value: 'Evangélico(a)',
      label: 'Evangélico(a)'
    },
    {
      value: 'Ateu(a)',
      label: 'Ateu(a)'
    },
    {
      value: 'Budista',
      label: 'Budista'
    }
  ]
  escolaridades: any = [
    {
      value: 'Analfabeto',
      label: 'Analfabeto'
    },
    {
      value: 'Ensino Fundamental',
      label: 'Ensino Fundamental'
    },
    {
      value: 'Ensino Médio',
      label: 'Ensino Médio'
    },
    {
      value: 'Ensino Superior',
      label: 'Ensino Superior'
    },
    {
      value: 'Pós-Graduação',
      label: 'Pós-Graduação'
    },
    {
      value: 'Mestrado',
      label: 'Mestrado'
    },
    {
      value: 'Doutorado',
      label: 'Doutorado'
    },
    {
      value: 'Pós-Doutorado',
      label: 'Pós-Doutorado'
    }
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private utilitariosService: UtilitariosService,
    private prontuarioService: ProntuarioService,
    private pacienteService: PacienteService,
    private placesService: PlacesService,
  ) {}

  ngOnInit() {
    // Form
    this.prontuarioForm = this.formBuilder.group({
      prontuario: [null],
      dataCriacao: [new Date, Validators.required],
      dataAbertura: [new Date, Validators.required],
      prontuarioAnterior: [null]
    })

    this.infPessoalForm = this.formBuilder.group({
      falecido: [false, Validators.required],
      nome: [null, [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      nascimento: [null, Validators.required],
      genero: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      nomeDaMae: [null, [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      nomeDoPai: [null, [Validators.required, Validators.maxLength(200), Validators.minLength(3)]],
      raca: [null, Validators.required],
      religiao: [null],
      naturalidade: [null, Validators.required],
      nacionalidade: [null, [Validators.required, Validators.maxLength(50)]],
      escolaridade: [null, Validators.required],
      telefone: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      email: [null]
    });

    this.docsForm = this.formBuilder.group({
      cartaoSus: [null, Validators.required],
      rg: [null, Validators.required],
      ufRg: [null, Validators.required],
      orgaoEmissorRg: [null, Validators.required],
      emissaoRG: [null, Validators.required],
      cpf: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    });

    this.enderecoForm = this.formBuilder.group({
      cep: [null, [Validators.required]],
      logradouro: [{value:null, disabled: true}, Validators.required],
      numero: [{value:null, disabled: true}, Validators.required],
      complemento: [{value:null, disabled: true}],
      bairro: [{value:null, disabled: true}, Validators.required],
      cidade: [{value:null, disabled: true}, Validators.required],
      uf: [{value:null, disabled: true}, Validators.required],
    });

    // Edit
    if (this.id !== null) {
      this.prontuarioService.getProntuarioById(this.id).subscribe(data => {
        this.pacienteId = data.idPaciente;
        this.consultasMedicas = data.consultasMedicas;
        this.internacoes = data.internacoes;
        this.agendamentos = data.agendamentos;
        this.prontuarioForm.setValue({
          prontuario: data.prontuario,
          dataCriacao: new Date(data.dataCriacao),
          dataAbertura: new Date(data.dataAbertura),
          prontuarioAnterior: data.prontuarioAnterior ? data.prontuarioAnterior : null
        });
        
        this.infPessoalForm.setValue({
          falecido: data.falecido,
          nome: data.nome,
          nascimento: new Date(data.paciente.nascimento),
          genero: data.paciente.genero,
          estadoCivil: data.paciente.estadoCivil,
          nomeDaMae: data.paciente.nomeDaMae,
          nomeDoPai: data.paciente.nomeDoPai,
          raca: data.paciente.raca,
          religiao: data.paciente.religiao ? data.paciente.religiao : null,
          naturalidade: data.paciente.naturalidade,
          nacionalidade: data.paciente.nacionalidade,
          escolaridade: data.paciente.escolaridade,
          telefone: data.paciente.telefone,
          email: data.paciente.email ? data.paciente.email : null,
        });

        this.docsForm.setValue({
          cartaoSus: data.cartaoSus,
          rg: data.paciente.rg,
          ufRg: data.paciente.ufRg,
          orgaoEmissorRg: data.paciente.orgaoEmissorRg,
          emissaoRG: new Date(data.paciente.emissaoRG),
          cpf: data.cpf
        });

        this.enableForm();
        this.enderecoForm.setValue({
          cep: data.paciente.endereco.cep,
          logradouro: data.paciente.endereco.logradouro,
          numero: data.paciente.endereco.numero,
          complemento: data.paciente.endereco.complemento ? data.paciente.endereco.complemento : null,
          bairro: data.paciente.endereco.bairro,
          cidade: data.paciente.endereco.cidade,
          uf: data.paciente.endereco.uf
        });
      })
      this.prontuarioForm.controls.prontuario.disable();
    } else {
      this.prontuarioService.incrementaProntuario().subscribe(incrementa => {
        this.proximoProntuario = incrementa.proximo;
        this.prontuarioForm.controls.prontuario.setValue(this.proximoProntuario.toString());
        this.prontuarioForm.controls.prontuario.disable();
      })
    }
  }
  
  closeModal() {
    this.activeModal.close(true);
  }

  getAddress() {
    if (this.enderecoForm.value['cep'].length == 8) {
      this.placesService.getByPostalCode(this.enderecoForm.value['cep']).subscribe(
        data => {
          if ('erro' in data){
            this.toastr.error('Cep inexistente!');
            this.enderecoForm.reset();
            this.disableForm();
          } else {
            this.enableForm();
            
            this.popularEnderecoForm(data);
          }
        }
      )
    }
  }

  enableForm(){
    let controls = this.enderecoForm.controls;
    controls.logradouro.enable();
    controls.numero.enable();
    controls.complemento.enable();
    controls.bairro.enable();
    controls.cidade.enable();
    controls.uf.enable();
  }

  disableForm(){
    let controls = this.enderecoForm.controls;
    controls.logradouro.disable();
    controls.numero.disable();
    controls.complemento.disable();
    controls.bairro.disable();
    controls.cidade.disable();
    controls.uf.disable();
  }

  public popularEnderecoForm(address: any) {
    this.enderecoForm.setValue({
      cep: address.cep,
      logradouro: address.logradouro,
      numero: "",
      complemento: address.complemento,
      bairro: address.bairro,
      cidade: address.localidade,
      uf: address.uf
    });
  }

  // swich
  onChange() {
    this.falecido = !this.falecido;
    this.prontuarioForm.value.falecido = this.falecido;
  }

  // tabs
  public beforeChange($event: any) {    
    if ($event.nextId === 'docsTab' || $event.nextId === 'enderecoTab') {
      if (this.infPessoalForm.valid) {
        if ($event.nextId === 'enderecoTab' && !this.docsForm.valid) {
          this.utilitariosService.verificaValidacoesForm(this.docsForm);
          this.utilitariosService.verificaValidacoesForm(this.prontuarioForm);
          $event.preventDefault();
        }
      } else {
        this.utilitariosService.verificaValidacoesForm(this.prontuarioForm);
        this.utilitariosService.verificaValidacoesForm(this.infPessoalForm);
        $event.preventDefault();
      }
    }
  };

  save() {
    if (this.enderecoForm.valid) {
      this.prontuarioForm.controls.prontuario.enable();
      if (this.prontuarioForm.valid) {
        let pront = this.prontuarioForm.value;
        let infPessoal = this.infPessoalForm.value;
        let docs = this.docsForm.value;
        let endereco = this.enderecoForm.value;
        this.paciente = {
          // Inf prontuario
          prontuario: pront.prontuario,
          // Inf Pessoais
          falecido: infPessoal.falecido,
          nome: infPessoal.nome,
          nascimento: infPessoal.nascimento.getTime(),
          genero: infPessoal.genero,
          estadoCivil: infPessoal.estadoCivil,
          nomeDaMae: infPessoal.nomeDaMae,
          nomeDoPai: infPessoal.nomeDoPai,
          raca: infPessoal.raca,
          religiao: infPessoal.religiao,
          naturalidade: infPessoal.naturalidade,
          nacionalidade: infPessoal.nacionalidade,
          escolaridade: infPessoal.escolaridade,
          // Contato
          telefone: infPessoal.telefone,
          email: infPessoal.email,
          // Endereço
          endereco: endereco,
          // Documentos
          cartaoSus: docs.cartaoSus,
          rg: docs.rg,
          ufRg: docs.ufRg,
          orgaoEmissorRg: docs.orgaoEmissorRg,
          emissaoRG: docs.emissaoRG.getTime(),
          cpf: docs.cpf
        }
        if (this.id !== null) {
          this.pacienteService.update(this.paciente, this.pacienteId).then(result => {
            this.prontuario = {
              // Inf prontuario
              prontuario: pront.prontuario,
              dataCriacao: pront.dataCriacao.getTime(),
              dataAbertura: pront.dataAbertura.getTime(),
              prontuarioAnterior: pront.prontuarioAnterior,
              // Inf Pessoais
              idPaciente: this.pacienteId,
              paciente: this.paciente,
              falecido: infPessoal.falecido,
              nome: infPessoal.nome,
              cartaoSus: docs.cartaoSus,
              cpf: docs.cpf,
              consultasMedicas: this.consultasMedicas,
              agendamentos: this.agendamentos,
              internacoes: this.internacoes
            }
            this.prontuarioService.update(this.prontuario, this.id);
            this.activeModal.close('dados editados');
            // reseta o form
            this.resetForms();
          })
        } else {
          this.pacienteService.add(this.paciente).then(result => {
            this.prontuario = {
              // Inf prontuario
              prontuario: pront.prontuario,
              dataCriacao: pront.dataCriacao.getTime(),
              dataAbertura: pront.dataAbertura.getTime(),
              prontuarioAnterior: pront.prontuarioAnterior,
              // Inf Pessoais
              idPaciente: result.id,
              paciente: this.paciente,
              falecido: infPessoal.falecido,
              nome: infPessoal.nome,
              // Documentos
              cartaoSus: docs.cartaoSus,
              cpf: docs.cpf,
              consultasMedicas: this.consultasMedicas,
              agendamentos: this.agendamentos,
              internacoes: this.internacoes
            }
            this.prontuarioService.updateIncrementaProntuario(this.proximoProntuario+1);
            this.prontuarioService.add(this.prontuario);
            this.activeModal.close('dados adicionados');
            // reseta o form
            this.resetForms();
          })          
        }
      } else {
        this.utilitariosService.verificaValidacoesForm(this.enderecoForm);
        this.utilitariosService.verificaValidacoesForm(this.prontuarioForm);
      }
    } else {
      this.utilitariosService.verificaValidacoesForm(this.enderecoForm);
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

  resetForms() {
    this.infPessoalForm.reset();
    this.prontuarioForm.reset();
    this.docsForm.reset();
    this.enderecoForm.reset();
  }

  ngOnDestroy() {
    // reseta o form
    this.resetForms();
  }
  
    
}
