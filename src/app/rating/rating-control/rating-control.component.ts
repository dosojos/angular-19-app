import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rating-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-control.component.html',
  styleUrl: './rating-control.component.scss',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: RatingControlComponent,
    },
  ],
})
export class RatingControlComponent implements MatFormFieldControl<number> {
  value = 0;
  stateChanges = new Subject<void>();
  static nextId = 0;
  id = `rating-control-${RatingControlComponent.nextId++}`;
  placeholder = '';
  focused = false;
  touched = false;
  required = false;
  disabled = false;
  errorState = false;
  controlType = 'rating-control';
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  hoverValue = 0;
  private _describedBy = '';

  onChange = (_: number) => {};
  onTouched = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef<HTMLElement>
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input()
  set rating(value: number) {
    this.value = value;
    this.stateChanges.next();
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }

  setValue(value: number): void {
    if (!this.disabled) {
      this.value = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this._describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'div') {
      this._elementRef.nativeElement.querySelector('div')?.focus();
    }
  }

  onTouchedHandler(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  get empty(): boolean {
    return this.value === 0;
  }

  get shouldLabelFloat(): boolean {
    return true;
  }

  get describedBy(): string {
    return this._describedBy;
  }

  onMouseEnter(star: number): void {
    if (!this.disabled) {
      this.hoverValue = star;
      this.focused = true;
    }
  }

  onMouseLeave(): void {
    this.hoverValue = 0;
    this.focused = false;
  }
}
