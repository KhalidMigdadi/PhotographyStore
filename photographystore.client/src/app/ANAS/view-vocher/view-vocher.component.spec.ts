import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVocherComponent } from './view-vocher.component';

describe('ViewVocherComponent', () => {
  let component: ViewVocherComponent;
  let fixture: ComponentFixture<ViewVocherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVocherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVocherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
