import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UtilitariosService {

  constructor() { }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  verificaValidTouched(campo: string, formGroup: FormGroup) {
    return (
      !formGroup.get(campo).valid &&
      formGroup.get(campo).dirty
    );
  }

  aplicaCssErro(campo: string, formGroup: FormGroup) {
    return {
      'has-error': this.verificaValidTouched(campo, formGroup),
      'has-feedback': this.verificaValidTouched(campo, formGroup)
    };
    // form-text text-muted danger
  }

  getMsgError(campo: string, formGroup: FormGroup) {
    if (formGroup.get(campo).hasError('required')) {
      return 'Campo obrigatório!'
    } else if (formGroup.get(campo).hasError('email')) {
      return 'Email inválido!'
    } else if (formGroup.get(campo).hasError('minlength')) {
      return 'Número mínimo de caracteres não alcançado!'
    } else if (formGroup.get(campo).hasError('maxlength')){
      return 'Número máximo de caracteres ultrapassado!'
    } else {
      return 'Erro Desconhecido!'
    }
  }

}
