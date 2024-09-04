import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.css'],
  imports: [NgIf, NgFor],
})
export class DynamicDropdownComponent {
  @Input() formControl!: FormControl;
  @Input() existingCategories: string[] = [];
  @Output() newCategoryAdded = new EventEmitter<string>();

  newCategoryControl = new FormControl('');
  showAddInput: boolean = false;

  addNewCategory() {
    const newCategory = this.newCategoryControl.value;
    if (newCategory && !this.existingCategories.includes(newCategory)) {
      this.existingCategories.push(newCategory);
      this.newCategoryAdded.emit(newCategory);
      this.newCategoryControl.setValue(''); // Clear input
      this.showAddInput = false;
    }
  }
}
