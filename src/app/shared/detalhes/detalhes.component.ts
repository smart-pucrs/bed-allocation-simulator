import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  @Input() title: string;
  @Input() detalhes: Array<any> = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {}

}
