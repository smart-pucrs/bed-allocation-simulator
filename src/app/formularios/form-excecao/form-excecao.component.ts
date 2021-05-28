import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  
  constructor(
	public activeModal: NgbActiveModal,
	private excecaoService: ExcecaoService,
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
				  console.log(data);
			  this.excecaoForm.setValue({
				  quarto: this.quarto,
				  desc: data.desc
			  });
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
  
  save() {}
  /*constructor(
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
    }*/
}
