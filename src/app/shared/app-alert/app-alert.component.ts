import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
})
export class AppAlertComponent implements OnInit {
  
  @Input() mensagem = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  confirm(): void {
    this.activeModal.close(true);
  }

  decline(): void {
    this.activeModal.dismiss(false);
  }
}
