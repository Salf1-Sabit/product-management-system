import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [NgClass, NgIf],
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  isVisible: boolean = false;

  getToastClasses(): string[] {
    return [this.type, this.isVisible ? 'show' : ''];
  }

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) {
    this.message = message;
    this.type = type;
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
