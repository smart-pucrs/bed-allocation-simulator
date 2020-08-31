import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UtilitariosService } from '../../formularios/utilitarios.service';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
})
export class FormUsuariosComponent implements OnInit {
  @Input() title;
  @Input() id: string;
  usuarioForm: FormGroup;

  tiposPerfil: any = [
    {
      value: 'Administrador',
      label: 'Administrador'
    },
    {
      value: 'Médico',
      label: 'Médico'
    },
    {
      value: 'Enfermeiro',
      label: 'Enfermeiro'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private utilitariosService: UtilitariosService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    // Form
    this.usuarioForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(200)]],
      email: [null, [Validators.required, Validators.maxLength(50), Validators.email]],
      cargo: [null, [Validators.required, Validators.maxLength(50)]],
      perfil: [null, Validators.required],
      ativo: ['Não']
    });
    
    // Edit
    if (this.id !== null) {
      this.usuarioService.getUsuarioById(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nome: data.nome,
          email: data.email,
          cargo: data.cargo,
          perfil: data.perfil,
          ativo: data.ativo
        });
      })
    }
  }

  closeModal() {
    this.activeModal.close(true);
  }
  
  save() {
    if (this.usuarioForm.valid) {
      if (this.id !== null) {
        this.usuarioService.update(this.usuarioForm.value, this.id)
          this.activeModal.close('dados editados');
        // reseta o form
        this.usuarioForm.reset();
      } else {
        this.usuarioService.add(this.usuarioForm.value)
          this.activeModal.close('dados adicionados');
        this.usuarioForm.reset();
      }
    } else {
      this.utilitariosService.verificaValidacoesForm(this.usuarioForm);
    }
  }

  verificaValidTouched(campo: string) {
    return this.utilitariosService.verificaValidTouched(campo, this.usuarioForm);
  }

  aplicaCssErro(campo: string) {
    return this.utilitariosService.aplicaCssErro(campo, this.usuarioForm)
  }

  getMsgError(campo: string) {
    return this.utilitariosService.getMsgError(campo, this.usuarioForm)
  }

  ngOnDestroy() {
    // reseta o form
    this.usuarioForm.reset();
  }

}
