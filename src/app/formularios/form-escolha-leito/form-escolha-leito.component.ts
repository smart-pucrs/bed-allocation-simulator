import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-escolha-leito',
  templateUrl: './form-escolha-leito.component.html',
  styleUrls: ['./form-escolha-leito.component.html']
})
export class FormEscolhaLeitoComponent implements OnInit {
  @Input() title;  
  @Input() public leitosSelect: Array<any> = [];
  @Input() id: string;
  
  constructor(public activeModal: NgbActiveModal) {}

  public onSelected(event) {
    this.activeModal.close(event);
  }

  ngOnInit() {}
}
