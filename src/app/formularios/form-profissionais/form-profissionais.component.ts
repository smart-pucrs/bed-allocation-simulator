import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UtilitariosService } from '../../formularios/utilitarios.service';
import { ProfissionalService } from '../../services/profissional.service';

import { TIPOSDEESPECIALIDADES } from '../../models/tipos-especialidades';

@Component({
  selector: 'app-form-profissionais',
  templateUrl: './form-profissionais.component.html'
})
export class FormProfissionaisComponent implements OnInit {
  @Input() title;
  @Input() id: string;
  profissionalForm: FormGroup;
  tiposEspecialidades: any = TIPOSDEESPECIALIDADES;

  constructor(
    private formBuilder: FormBuilder,
    private profissionalService: ProfissionalService,
    private utilitariosService: UtilitariosService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    // Form
    this.profissionalForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(200)]],
      especialidade: [null, [Validators.required, Validators.maxLength(45)]],
      CRM: [null, [Validators.required, Validators.maxLength(14)]],
      cpf: [null, Validators.maxLength(15)]
    });
    
    // Edit
    if (this.id !== null) {
      this.profissionalService.getProfissionalById(this.id).subscribe(data => {
        this.profissionalForm.setValue({
          nome: data.nome,
          especialidade: data.especialidade,
          CRM: data.CRM,
          cpf: data.cpf
        });
      })
    }
  }

  closeModal() {
    this.activeModal.close(true);
  }

  save() {
    if (this.profissionalForm.valid) {
      if (this.id !== null) {
        this.profissionalService.update(this.profissionalForm.value, this.id)
          this.activeModal.close('dados editados');
        // reseta o form
        this.profissionalForm.reset();
      } else {
        this.profissionalService.add(this.profissionalForm.value)
          this.activeModal.close('dados adicionados');
        this.profissionalForm.reset();
      }
    } else {
      this.utilitariosService.verificaValidacoesForm(this.profissionalForm);
    }
  }

  verificaValidTouched(campo: string) {
    return this.utilitariosService.verificaValidTouched(campo, this.profissionalForm);
  }

  aplicaCssErro(campo: string) {
    return this.utilitariosService.aplicaCssErro(campo, this.profissionalForm)
  }

  getMsgError(campo: string) {
    return this.utilitariosService.getMsgError(campo, this.profissionalForm)
  }

  ngOnDestroy() {
    // reseta o form
    this.profissionalForm.reset();
  }


}
