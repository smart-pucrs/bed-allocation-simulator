import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UtilitariosService } from '../../formularios/utilitarios.service';
import { ExcecaoService } from '../../services/excecao.service';

@Component({
  selector: 'app-form-excecao',
  templateUrl: './form-excecao.component.html',
  styleUrls: ['./form-excecao.component.html']
})
export class FormExcecao implements OnInit {
  @Input() title;  
  @Input() public quarto: string;
  excecaoForm: FormGroup; 
  data: any;
  
  constructor(
	public activeModal: NgbActiveModal,
	private excecaoService: ExcecaoService,
    private utilitariosService: UtilitariosService,
    private formBuilder: FormBuilder
  ) {}

  public onSelected(event) {
    this.activeModal.close(event);
  }

  ngOnInit() {
	  this.excecaoForm = this.formBuilder.group({
		  quarto: [this.quarto, Validators.nullValidator],
		  desc : [null, Validators.required]
	  });
	  
	  if(this.quarto !== null){
		  this.excecaoService.getExcecaoByQuarto(this.quarto).subscribe(data =>{
        this.data = data;
			  if(data){
				  this.excecaoForm.setValue({
					  quarto: this.quarto,
					  desc: data.desc
				  });
			  }else{		  
				  this.excecaoForm.setValue({
					  quarto: this.quarto,
					  desc: ""
				  });
			  }
		  })
	  }
  }

  closeModal() {
    this.activeModal.close(true);
  }

  ngOnDestroy() {
    // reseta o form
    this.excecaoForm.reset();
  }

  verificaValidTouched(campo: string) {
    return this.utilitariosService.verificaValidTouched(campo, this.excecaoForm);
  }

  aplicaCssErro(campo: string) {
    return this.utilitariosService.aplicaCssErro(campo, this.excecaoForm)
  }

  getMsgError(campo: string) {
    return this.utilitariosService.getMsgError(campo, this.excecaoForm)
  }
  
  save() {
    if (this.excecaoForm.valid) {
	  this.excecaoService.write(this.excecaoForm.value, this.quarto)
	  this.activeModal.close('dados editados');
	  // reseta o form
	  this.excecaoForm.reset();
    } else {
      this.utilitariosService.verificaValidacoesForm(this.excecaoForm);
    }
  }

  deleteException() {
    if(this.data) {
      console.log(this.data);
      
      this.excecaoService.deleteExcecaoByQuarto(this.quarto);
      this.activeModal.close('Excessão excluída');
      console.log("excluída");
      
      // reseta o form
      this.excecaoForm.reset();
      } else {
        this.activeModal.close('empty');
        // reseta o form
        this.excecaoForm.reset();
      }
  }
}
