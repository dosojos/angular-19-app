import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropPageComponent } from './drag-drop-page.component';

describe('DragDropPageComponent', () => {
  let component: DragDropPageComponent;
  let fixture: ComponentFixture<DragDropPageComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
