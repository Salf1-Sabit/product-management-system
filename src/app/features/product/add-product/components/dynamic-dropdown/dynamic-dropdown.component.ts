import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.css'],
  imports: [NgIf, NgFor, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicDropdownComponent),
      multi: true,
    },
  ],
})
export class DynamicDropdownComponent implements ControlValueAccessor, OnInit {
  @Input() formControl!: FormControl;
  @Input() existingCategories: string[] = [];
  @Output() newCategoryAdded = new EventEmitter<string>();

  newCategoryControl = new FormControl('');
  showAddInput: boolean = false;

  value: string | null = null;
  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    this.loadCategoriesFromLocalStorage();
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.newCategoryControl.disable();
    } else {
      this.newCategoryControl.enable();
    }
  }

  addNewCategory() {
    const newCategory = this.newCategoryControl.value;
    if (newCategory) {
      this.newCategoryAdded.emit(newCategory);
      this.value = newCategory;
      this.onChange(this.value);
      this.loadCategoriesFromLocalStorage();
      this.newCategoryControl.setValue('');
      this.showAddInput = false;
    }
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(this.value);
    this.onTouched();
  }

  loadCategoriesFromLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCategories = localStorage.getItem('categories');
      if (storedCategories) {
        this.existingCategories = JSON.parse(storedCategories);
      }
    }
  }

  updateCategoriesInLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(
        'categories',
        JSON.stringify(this.existingCategories)
      );
    }
  }
}
