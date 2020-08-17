import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSituacaoLeitosComponent } from './form-situacao-leitos.component';

describe('FormSituacaoLeitosComponent', () => {
  let component: FormSituacaoLeitosComponent;
  let fixture: ComponentFixture<FormSituacaoLeitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSituacaoLeitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSituacaoLeitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
